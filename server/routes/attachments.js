const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const { authenticateToken, requireManager } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Allow common file types
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|txt|zip|rar/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed types: images, PDFs, documents, archives'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB default
  },
  fileFilter: fileFilter
});

// @route   POST /api/attachments/:jobId
// @desc    Upload file attachment to job
// @access  Private
router.post('/:jobId', [
  authenticateToken,
  upload.single('file'),
  body('description').optional()
], async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const { description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Verify job exists and user has access
    const [jobs] = await pool.execute(`
      SELECT j.*, u.full_name as assigned_to_name 
      FROM job_cards j 
      LEFT JOIN users u ON j.assigned_to = u.user_id 
      WHERE j.job_id = ?
    `, [jobId]);

    if (jobs.length === 0) {
      // Clean up uploaded file
      await fs.unlink(req.file.path);
      return res.status(404).json({ message: 'Job not found' });
    }

    const job = jobs[0];

    // Check permissions
    if (req.user.role === 'worker' && job.assigned_to !== req.user.user_id) {
      // Clean up uploaded file
      await fs.unlink(req.file.path);
      return res.status(403).json({ message: 'Access denied - job not assigned to you' });
    }

    // Save attachment record
    const [result] = await pool.execute(`
      INSERT INTO attachments 
      (job_id, filename, original_name, file_path, file_type, file_size, uploaded_by, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      jobId,
      req.file.filename,
      req.file.originalname,
      req.file.path,
      req.file.mimetype,
      req.file.size,
      req.user.user_id,
      description || null
    ]);

    // Log activity
    await pool.execute(`
      INSERT INTO job_history (job_id, user_id, action, description)
      VALUES (?, ?, 'attachment_uploaded', ?)
    `, [jobId, req.user.user_id, `File uploaded: ${req.file.originalname}`]);

    // Emit real-time update
    const io = req.app.get('io');
    io.to(`job_${jobId}`).emit('attachment_uploaded', {
      jobId,
      attachment: {
        attachment_id: result.insertId,
        filename: req.file.filename,
        original_name: req.file.originalname,
        file_type: req.file.mimetype,
        file_size: req.file.size,
        uploaded_by: req.user.full_name,
        uploaded_at: new Date()
      }
    });

    res.status(201).json({
      message: 'File uploaded successfully',
      attachment: {
        attachment_id: result.insertId,
        filename: req.file.filename,
        original_name: req.file.originalname,
        file_type: req.file.mimetype,
        file_size: req.file.size,
        uploaded_by: req.user.full_name
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up uploaded file if it exists
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error cleaning up file:', unlinkError);
      }
    }

    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large' });
      }
    }

    res.status(500).json({ message: 'Server error during file upload' });
  }
});

// @route   GET /api/attachments/:jobId
// @desc    Get all attachments for a job
// @access  Private
router.get('/:jobId', authenticateToken, async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Verify job exists and user has access
    const [jobs] = await pool.execute('SELECT assigned_to FROM job_cards WHERE job_id = ?', [jobId]);
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (req.user.role === 'worker' && jobs[0].assigned_to !== req.user.user_id) {
      return res.status(403).json({ message: 'Access denied - job not assigned to you' });
    }

    const [attachments] = await pool.execute(`
      SELECT 
        a.*,
        u.full_name as uploaded_by_name
      FROM attachments a
      LEFT JOIN users u ON a.uploaded_by = u.user_id
      WHERE a.job_id = ?
      ORDER BY a.uploaded_at DESC
    `, [jobId]);

    res.json({ attachments });
  } catch (error) {
    console.error('Get attachments error:', error);
    res.status(500).json({ message: 'Server error while fetching attachments' });
  }
});

// @route   GET /api/attachments/download/:attachmentId
// @desc    Download attachment file
// @access  Private
router.get('/download/:attachmentId', authenticateToken, async (req, res) => {
  try {
    const attachmentId = req.params.attachmentId;

    const [attachments] = await pool.execute(`
      SELECT 
        a.*,
        j.assigned_to
      FROM attachments a
      JOIN job_cards j ON a.job_id = j.job_id
      WHERE a.attachment_id = ?
    `, [attachmentId]);

    if (attachments.length === 0) {
      return res.status(404).json({ message: 'Attachment not found' });
    }

    const attachment = attachments[0];

    // Check permissions
    if (req.user.role === 'worker' && attachment.assigned_to !== req.user.user_id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if file exists
    try {
      await fs.access(attachment.file_path);
    } catch (error) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${attachment.original_name}"`);
    res.setHeader('Content-Type', attachment.file_type);

    // Stream the file
    const fileStream = require('fs').createReadStream(attachment.file_path);
    fileStream.pipe(res);

    // Log download activity
    await pool.execute(`
      INSERT INTO job_history (job_id, user_id, action, description)
      VALUES (?, ?, 'attachment_downloaded', ?)
    `, [attachment.job_id, req.user.user_id, `Downloaded: ${attachment.original_name}`]);

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Server error during file download' });
  }
});

// @route   DELETE /api/attachments/:attachmentId
// @desc    Delete attachment
// @access  Private
router.delete('/:attachmentId', authenticateToken, async (req, res) => {
  try {
    const attachmentId = req.params.attachmentId;

    const [attachments] = await pool.execute(`
      SELECT 
        a.*,
        j.assigned_to
      FROM attachments a
      JOIN job_cards j ON a.job_id = j.job_id
      WHERE a.attachment_id = ?
    `, [attachmentId]);

    if (attachments.length === 0) {
      return res.status(404).json({ message: 'Attachment not found' });
    }

    const attachment = attachments[0];

    // Check permissions
    if (req.user.role === 'worker' && attachment.assigned_to !== req.user.user_id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Delete file from filesystem
    try {
      await fs.unlink(attachment.file_path);
    } catch (error) {
      console.error('Error deleting file:', error);
      // Continue with database deletion even if file deletion fails
    }

    // Delete from database
    await pool.execute('DELETE FROM attachments WHERE attachment_id = ?', [attachmentId]);

    // Log activity
    await pool.execute(`
      INSERT INTO job_history (job_id, user_id, action, description)
      VALUES (?, ?, 'attachment_deleted', ?)
    `, [attachment.job_id, req.user.user_id, `Deleted: ${attachment.original_name}`]);

    // Emit real-time update
    const io = req.app.get('io');
    io.to(`job_${attachment.job_id}`).emit('attachment_deleted', {
      jobId: attachment.job_id,
      attachmentId: parseInt(attachmentId)
    });

    res.json({ message: 'Attachment deleted successfully' });
  } catch (error) {
    console.error('Delete attachment error:', error);
    res.status(500).json({ message: 'Server error while deleting attachment' });
  }
});

// @route   GET /api/attachments/stats/overview
// @desc    Get attachment statistics (managers only)
// @access  Private (Manager)
router.get('/stats/overview', [authenticateToken, requireManager], async (req, res) => {
  try {
    const [stats] = await pool.execute(`
      SELECT 
        COUNT(*) as total_attachments,
        SUM(file_size) as total_size,
        AVG(file_size) as avg_size,
        COUNT(DISTINCT job_id) as jobs_with_attachments,
        COUNT(CASE WHEN file_type LIKE 'image/%' THEN 1 END) as image_count,
        COUNT(CASE WHEN file_type LIKE 'application/pdf' THEN 1 END) as pdf_count,
        COUNT(CASE WHEN file_type LIKE 'application/msword%' OR file_type LIKE 'application/vnd.openxmlformats%' THEN 1 END) as document_count
      FROM attachments
    `);

    // Get recent uploads
    const [recentUploads] = await pool.execute(`
      SELECT 
        a.original_name,
        a.file_type,
        a.file_size,
        a.uploaded_at,
        u.full_name as uploaded_by_name,
        j.job_number,
        j.title as job_title
      FROM attachments a
      LEFT JOIN users u ON a.uploaded_by = u.user_id
      LEFT JOIN job_cards j ON a.job_id = j.job_id
      ORDER BY a.uploaded_at DESC
      LIMIT 10
    `);

    res.json({
      overview: stats[0],
      recent_uploads: recentUploads
    });
  } catch (error) {
    console.error('Get attachment stats error:', error);
    res.status(500).json({ message: 'Server error while fetching attachment statistics' });
  }
});

module.exports = router;
