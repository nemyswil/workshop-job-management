const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { pool } = require('../config/database');
const { authenticateToken, requireManager, requireWorker } = require('../middleware/auth');

const router = express.Router();

// Helper function to generate job number
const generateJobNumber = async () => {
  const [result] = await pool.execute(
    'SELECT COUNT(*) as count FROM job_cards WHERE DATE(created_at) = CURDATE()'
  );
  const count = result[0].count + 1;
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `JOB-${today}-${count.toString().padStart(3, '0')}`;
};

// @route   GET /api/jobs
// @desc    Get all jobs with filtering and pagination
// @access  Private
router.get('/', [
  authenticateToken,
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['open', 'in_progress', 'completed', 'closed']).withMessage('Invalid status'),
  query('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority'),
  query('assigned_to').optional().isInt().withMessage('Assigned to must be a valid user ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 20,
      status,
      priority,
      assigned_to,
      search
    } = req.query;

    const offset = (page - 1) * limit;
    let whereConditions = [];
    let queryParams = [];

    // Build WHERE conditions based on user role
    if (req.user.role === 'worker') {
      whereConditions.push('j.assigned_to = ?');
      queryParams.push(req.user.user_id);
    }

    if (status) {
      whereConditions.push('j.status = ?');
      queryParams.push(status);
    }

    if (priority) {
      whereConditions.push('j.priority = ?');
      queryParams.push(priority);
    }

    if (assigned_to) {
      whereConditions.push('j.assigned_to = ?');
      queryParams.push(assigned_to);
    }

    if (search) {
      whereConditions.push('(j.title LIKE ? OR j.description LIKE ? OR j.customer_name LIKE ?)');
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Test basic query first
    try {
      const [testResult] = await pool.execute('SELECT COUNT(*) as count FROM job_cards');
    } catch (testError) {
      console.log('Table test error:', testError.message);
      return res.status(500).json({ message: 'Database table not found. Please run the database setup.' });
    }

    // Get jobs with user details - use string interpolation for LIMIT/OFFSET
    const jobsQuery = `
      SELECT 
        j.job_id,
        j.job_number,
        j.title,
        j.description,
        j.customer_name,
        j.customer_contact,
        j.assigned_to,
        j.priority,
        j.status,
        j.due_date,
        j.created_at,
        j.updated_at,
        j.completed_at,
        j.closed_at,
        u_assigned.full_name as assigned_to_name,
        u_created.full_name as created_by_name
      FROM job_cards j
      LEFT JOIN users u_assigned ON j.assigned_to = u_assigned.user_id
      LEFT JOIN users u_created ON j.created_by = u_created.user_id
      ${whereClause}
      ORDER BY j.created_at DESC
      LIMIT ${parseInt(limit)} OFFSET ${offset}
    `;

    // Execute jobs query with WHERE clause parameters only (LIMIT/OFFSET are interpolated)
    const [jobs] = await pool.execute(jobsQuery, queryParams);

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM job_cards j
      ${whereClause}
    `;
    // For count query, we use the same WHERE parameters as the main query
    const [countResult] = await pool.execute(countQuery, queryParams);
    const total = countResult[0].total;

    res.json({
      jobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Server error while fetching jobs' });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get single job with details
// @access  Private
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const jobId = req.params.id;

    // Get job details
    const [jobs] = await pool.execute(`
      SELECT 
        j.*,
        u_assigned.full_name as assigned_to_name,
        u_created.full_name as created_by_name
      FROM job_cards j
      LEFT JOIN users u_assigned ON j.assigned_to = u_assigned.user_id
      LEFT JOIN users u_created ON j.created_by = u_created.user_id
      WHERE j.job_id = ?
    `, [jobId]);

    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const job = jobs[0];

    // Check if worker can access this job
    if (req.user.role === 'worker' && job.assigned_to !== req.user.user_id) {
      return res.status(403).json({ message: 'Access denied - job not assigned to you' });
    }

    // Get attachments
    const [attachments] = await pool.execute(`
      SELECT 
        a.*,
        u.full_name as uploaded_by_name
      FROM attachments a
      LEFT JOIN users u ON a.uploaded_by = u.user_id
      WHERE a.job_id = ?
      ORDER BY a.uploaded_at DESC
    `, [jobId]);

    // Get job history
    const [history] = await pool.execute(`
      SELECT 
        h.*,
        u.full_name as user_name
      FROM job_history h
      LEFT JOIN users u ON h.user_id = u.user_id
      WHERE h.job_id = ?
      ORDER BY h.created_at DESC
    `, [jobId]);

    // Get job notes
    const [notes] = await pool.execute(`
      SELECT 
        n.*,
        u.full_name as user_name
      FROM job_notes n
      LEFT JOIN users u ON n.user_id = u.user_id
      WHERE n.job_id = ?
      ORDER BY n.created_at DESC
    `, [jobId]);

    res.json({
      job,
      attachments,
      history,
      notes
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Server error while fetching job' });
  }
});

// @route   POST /api/jobs
// @desc    Create new job
// @access  Private (Manager)
router.post('/', [
  authenticateToken,
  requireManager,
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional(),
  body('customer_name').optional(),
  body('customer_contact').optional(),
  body('assigned_to').optional().isInt().withMessage('Assigned to must be a valid user ID'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority'),
  body('due_date').optional().isISO8601().withMessage('Invalid due date format')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      customer_name,
      customer_contact,
      assigned_to,
      priority = 'medium',
      due_date
    } = req.body;

    // Generate job number
    const job_number = await generateJobNumber();

    // Create job
    const [result] = await pool.execute(`
      INSERT INTO job_cards 
      (job_number, title, description, customer_name, customer_contact, assigned_to, priority, due_date, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [job_number, title, description, customer_name, customer_contact, assigned_to, priority, due_date, req.user.user_id]);

    const jobId = result.insertId;

    // Log job creation
    await pool.execute(`
      INSERT INTO job_history (job_id, user_id, action, description)
      VALUES (?, ?, 'created', 'Job card created')
    `, [jobId, req.user.user_id]);

    // Emit real-time update
    const io = req.app.get('io');
    io.emit('job_created', { jobId, job_number, title, assigned_to });

    res.status(201).json({
      message: 'Job created successfully',
      job: {
        job_id: jobId,
        job_number,
        title,
        status: 'open'
      }
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Server error while creating job' });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update job
// @access  Private
router.put('/:id', [
  authenticateToken,
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional(),
  body('customer_name').optional(),
  body('customer_contact').optional(),
  body('assigned_to').optional().isInt().withMessage('Assigned to must be a valid user ID'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority'),
  body('status').optional().isIn(['open', 'in_progress', 'completed', 'closed']).withMessage('Invalid status'),
  body('due_date').optional().isISO8601().withMessage('Invalid due date format')
], async (req, res) => {
  try {
    const jobId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get current job
    const [jobs] = await pool.execute('SELECT * FROM job_cards WHERE job_id = ?', [jobId]);
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const currentJob = jobs[0];

    // Check permissions
    if (req.user.role === 'worker' && currentJob.assigned_to !== req.user.user_id) {
      return res.status(403).json({ message: 'Access denied - job not assigned to you' });
    }

    // Only managers can change assignment and certain fields
    const allowedFields = ['title', 'description', 'customer_name', 'customer_contact', 'priority', 'due_date'];
    if (req.user.role === 'worker') {
      const workerFields = ['status'];
      const invalidFields = Object.keys(req.body).filter(field => 
        !workerFields.includes(field) && !allowedFields.includes(field)
      );
      if (invalidFields.length > 0) {
        return res.status(403).json({ 
          message: `Workers can only update: ${workerFields.join(', ')}` 
        });
      }
    }

    // Build update query
    const updateFields = [];
    const updateValues = [];
    const changes = [];

    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined && req.body[key] !== currentJob[key]) {
        updateFields.push(`${key} = ?`);
        updateValues.push(req.body[key]);
        changes.push(`${key}: ${currentJob[key]} → ${req.body[key]}`);
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No changes provided' });
    }

    // Add status-specific timestamps
    if (req.body.status === 'completed' && currentJob.status !== 'completed') {
      updateFields.push('completed_at = CURRENT_TIMESTAMP');
    }
    if (req.body.status === 'closed' && currentJob.status !== 'closed') {
      updateFields.push('closed_at = CURRENT_TIMESTAMP');
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(jobId);

    // Update job
    await pool.execute(
      `UPDATE job_cards SET ${updateFields.join(', ')} WHERE job_id = ?`,
      updateValues
    );

    // Log changes
    await pool.execute(`
      INSERT INTO job_history (job_id, user_id, action, description, old_value, new_value)
      VALUES (?, ?, 'updated', ?, ?, ?)
    `, [jobId, req.user.user_id, changes.join(', '), JSON.stringify(currentJob), JSON.stringify(req.body)]);

    // Emit real-time update
    const io = req.app.get('io');
    io.to(`job_${jobId}`).emit('job_updated', { jobId, changes: req.body });

    res.json({ message: 'Job updated successfully' });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Server error while updating job' });
  }
});

// @route   POST /api/jobs/:id/notes
// @desc    Add note to job
// @access  Private
router.post('/:id/notes', [
  authenticateToken,
  body('note').notEmpty().withMessage('Note is required'),
  body('is_internal').optional().isBoolean().withMessage('is_internal must be boolean')
], async (req, res) => {
  try {
    const jobId = req.params.id;
    const { note, is_internal = false } = req.body;

    // Verify job exists and user has access
    const [jobs] = await pool.execute('SELECT assigned_to FROM job_cards WHERE job_id = ?', [jobId]);
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (req.user.role === 'worker' && jobs[0].assigned_to !== req.user.user_id) {
      return res.status(403).json({ message: 'Access denied - job not assigned to you' });
    }

    // Add note
    const [result] = await pool.execute(`
      INSERT INTO job_notes (job_id, user_id, note, is_internal)
      VALUES (?, ?, ?, ?)
    `, [jobId, req.user.user_id, note, is_internal]);

    // Log activity
    await pool.execute(`
      INSERT INTO job_history (job_id, user_id, action, description)
      VALUES (?, ?, 'note_added', 'Note added: ${note.substring(0, 50)}...')
    `, [jobId, req.user.user_id]);

    res.status(201).json({ message: 'Note added successfully' });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({ message: 'Server error while adding note' });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete job (soft delete by setting status to closed)
// @access  Private (Manager)
router.delete('/:id', [authenticateToken, requireManager], async (req, res) => {
  try {
    const jobId = req.params.id;

    // Check if job exists
    const [jobs] = await pool.execute('SELECT * FROM job_cards WHERE job_id = ?', [jobId]);
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Soft delete by closing the job
    await pool.execute(`
      UPDATE job_cards 
      SET status = 'closed', closed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
      WHERE job_id = ?
    `, [jobId]);

    // Log deletion
    await pool.execute(`
      INSERT INTO job_history (job_id, user_id, action, description)
      VALUES (?, ?, 'deleted', 'Job closed/deleted')
    `, [jobId, req.user.user_id]);

    res.json({ message: 'Job closed successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Server error while deleting job' });
  }
});

module.exports = router;
