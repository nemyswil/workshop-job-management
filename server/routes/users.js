const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult, query } = require('express-validator');
const { pool } = require('../config/database');
const { authenticateToken, requireManager } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (managers only)
// @access  Private (Manager)
router.get('/', [authenticateToken, requireManager], async (req, res) => {
  try {
    const { role, active } = req.query;
    
    let whereConditions = [];
    let queryParams = [];

    if (role) {
      whereConditions.push('role = ?');
      queryParams.push(role);
    }

    if (active !== undefined) {
      whereConditions.push('is_active = ?');
      queryParams.push(active === 'true');
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const [users] = await pool.execute(`
      SELECT 
        user_id,
        username,
        email,
        full_name,
        role,
        is_active,
        created_at,
        updated_at,
        (SELECT COUNT(*) FROM job_cards WHERE assigned_to = users.user_id AND status IN ('open', 'in_progress')) as active_jobs,
        (SELECT COUNT(*) FROM job_cards WHERE assigned_to = users.user_id AND status = 'completed') as completed_jobs
      FROM users
      ${whereClause}
      ORDER BY created_at DESC
    `, queryParams);

    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});

// @route   GET /api/users/workers
// @desc    Get all workers (for job assignment)
// @access  Private
router.get('/workers', authenticateToken, async (req, res) => {
  try {
    const [workers] = await pool.execute(`
      SELECT 
        user_id,
        username,
        full_name,
        (SELECT COUNT(*) FROM job_cards WHERE assigned_to = users.user_id AND status IN ('open', 'in_progress')) as active_jobs
      FROM users
      WHERE role = 'worker' AND is_active = TRUE
      ORDER BY full_name
    `);

    res.json({ workers });
  } catch (error) {
    console.error('Get workers error:', error);
    res.status(500).json({ message: 'Server error while fetching workers' });
  }
});

// @route   GET /api/users/:id
// @desc    Get single user
// @access  Private
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user can access this profile
    if (req.user.role === 'worker' && req.user.user_id !== parseInt(userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const [users] = await pool.execute(`
      SELECT 
        user_id,
        username,
        email,
        full_name,
        role,
        is_active,
        created_at,
        updated_at
      FROM users
      WHERE user_id = ?
    `, [userId]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user statistics
    const [stats] = await pool.execute(`
      SELECT 
        (SELECT COUNT(*) FROM job_cards WHERE assigned_to = ? AND status = 'open') as open_jobs,
        (SELECT COUNT(*) FROM job_cards WHERE assigned_to = ? AND status = 'in_progress') as in_progress_jobs,
        (SELECT COUNT(*) FROM job_cards WHERE assigned_to = ? AND status = 'completed') as completed_jobs,
        (SELECT COUNT(*) FROM job_cards WHERE assigned_to = ? AND status = 'closed') as closed_jobs
    `, [userId, userId, userId, userId]);

    res.json({
      user: users[0],
      statistics: stats[0]
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private
router.put('/:id', [
  authenticateToken,
  body('full_name').optional().notEmpty().withMessage('Full name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('is_active').optional().isBoolean().withMessage('is_active must be boolean')
], async (req, res) => {
  try {
    const userId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check permissions
    if (req.user.role === 'worker' && req.user.user_id !== parseInt(userId)) {
      return res.status(403).json({ message: 'Access denied - can only update own profile' });
    }

    // Only managers can change role and active status
    const allowedFields = ['full_name', 'email'];
    if (req.user.role === 'manager') {
      allowedFields.push('is_active');
    }

    const updateFields = [];
    const updateValues = [];

    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key) && req.body[key] !== undefined) {
        updateFields.push(`${key} = ?`);
        updateValues.push(req.body[key]);
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(userId);

    await pool.execute(
      `UPDATE users SET ${updateFields.join(', ')} WHERE user_id = ?`,
      updateValues
    );

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error while updating user' });
  }
});

// @route   PUT /api/users/:id/role
// @desc    Change user role (managers only)
// @access  Private (Manager)
router.put('/:id/role', [
  authenticateToken,
  requireManager,
  body('role').isIn(['manager', 'worker']).withMessage('Role must be manager or worker')
], async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    // Prevent changing own role
    if (req.user.user_id === parseInt(userId)) {
      return res.status(400).json({ message: 'Cannot change your own role' });
    }

    await pool.execute(
      'UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?',
      [role, userId]
    );

    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ message: 'Server error while updating role' });
  }
});

// @route   PUT /api/users/:id/status
// @desc    Activate/deactivate user (managers only)
// @access  Private (Manager)
router.put('/:id/status', [
  authenticateToken,
  requireManager,
  body('is_active').isBoolean().withMessage('is_active must be boolean')
], async (req, res) => {
  try {
    const userId = req.params.id;
    const { is_active } = req.body;

    // Prevent deactivating own account
    if (req.user.user_id === parseInt(userId) && !is_active) {
      return res.status(400).json({ message: 'Cannot deactivate your own account' });
    }

    await pool.execute(
      'UPDATE users SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?',
      [is_active, userId]
    );

    res.json({ 
      message: `User ${is_active ? 'activated' : 'deactivated'} successfully` 
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error while updating status' });
  }
});

// @route   GET /api/users/:id/jobs
// @desc    Get jobs assigned to user
// @access  Private
router.get('/:id/jobs', [
  authenticateToken,
  query('status').optional().isIn(['open', 'in_progress', 'completed', 'closed']).withMessage('Invalid status'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
], async (req, res) => {
  try {
    const userId = req.params.id;
    const { status, page = 1, limit = 20 } = req.query;

    // Check permissions
    if (req.user.role === 'worker' && req.user.user_id !== parseInt(userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const offset = (page - 1) * limit;
    let whereConditions = ['j.assigned_to = ?'];
    let queryParams = [userId];

    if (status) {
      whereConditions.push('j.status = ?');
      queryParams.push(status);
    }

    const whereClause = `WHERE ${whereConditions.join(' AND ')}`;

    const [jobs] = await pool.execute(`
      SELECT 
        j.job_id,
        j.job_number,
        j.title,
        j.description,
        j.customer_name,
        j.priority,
        j.status,
        j.due_date,
        j.created_at,
        j.updated_at,
        j.completed_at,
        j.closed_at,
        u_created.full_name as created_by_name
      FROM job_cards j
      LEFT JOIN users u_created ON j.created_by = u_created.user_id
      ${whereClause}
      ORDER BY j.created_at DESC
      LIMIT ? OFFSET ?
    `, [...queryParams, parseInt(limit), offset]);

    // Get total count
    const [countResult] = await pool.execute(`
      SELECT COUNT(*) as total
      FROM job_cards j
      ${whereClause}
    `, queryParams);
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
    console.error('Get user jobs error:', error);
    res.status(500).json({ message: 'Server error while fetching user jobs' });
  }
});

// @route   GET /api/users/stats/overview
// @desc    Get system overview statistics (managers only)
// @access  Private (Manager)
router.get('/stats/overview', [authenticateToken, requireManager], async (req, res) => {
  try {
    const [stats] = await pool.execute(`
      SELECT 
        (SELECT COUNT(*) FROM users WHERE role = 'worker' AND is_active = TRUE) as total_workers,
        (SELECT COUNT(*) FROM job_cards WHERE status = 'open') as open_jobs,
        (SELECT COUNT(*) FROM job_cards WHERE status = 'in_progress') as in_progress_jobs,
        (SELECT COUNT(*) FROM job_cards WHERE status = 'completed') as completed_jobs,
        (SELECT COUNT(*) FROM job_cards WHERE status = 'closed') as closed_jobs,
        (SELECT COUNT(*) FROM job_cards WHERE due_date < CURDATE() AND status IN ('open', 'in_progress')) as overdue_jobs,
        (SELECT COUNT(*) FROM job_cards WHERE DATE(created_at) = CURDATE()) as jobs_created_today,
        (SELECT COUNT(*) FROM job_cards WHERE DATE(completed_at) = CURDATE()) as jobs_completed_today
    `);

    // Get worker performance
    const [workerStats] = await pool.execute(`
      SELECT 
        u.user_id,
        u.full_name,
        COUNT(j.job_id) as total_jobs,
        SUM(CASE WHEN j.status = 'completed' THEN 1 ELSE 0 END) as completed_jobs,
        SUM(CASE WHEN j.status IN ('open', 'in_progress') THEN 1 ELSE 0 END) as active_jobs,
        AVG(CASE WHEN j.completed_at IS NOT NULL THEN DATEDIFF(j.completed_at, j.created_at) END) as avg_completion_days
      FROM users u
      LEFT JOIN job_cards j ON u.user_id = j.assigned_to
      WHERE u.role = 'worker' AND u.is_active = TRUE
      GROUP BY u.user_id, u.full_name
      ORDER BY completed_jobs DESC
    `);

    res.json({
      overview: stats[0],
      worker_performance: workerStats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error while fetching statistics' });
  }
});

module.exports = router;
