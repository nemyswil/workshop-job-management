import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  FiUser, 
  FiUserPlus, 
  FiEdit, 
  FiToggleLeft, 
  FiToggleRight,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    role: 'worker',
    password: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await axios.post('/api/auth/register', formData);
      toast.success('User created successfully!');
      setShowCreateModal(false);
      setFormData({
        username: '',
        email: '',
        full_name: '',
        role: 'worker',
        password: ''
      });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create user';
      toast.error(errorMessage);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`/api/users/${selectedUser.user_id}`, {
        full_name: formData.full_name,
        email: formData.email,
        is_active: formData.is_active
      });
      toast.success('User updated successfully!');
      setShowEditModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update user';
      toast.error(errorMessage);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await axios.put(`/api/users/${userId}/status`, {
        is_active: !currentStatus
      });
      toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
      fetchUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
      toast.error('Failed to update user status');
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await axios.put(`/api/users/${userId}/role`, {
        role: newRole
      });
      toast.success('User role updated successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error changing user role:', error);
      toast.error('Failed to update user role');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (showCreateModal && !formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      is_active: user.is_active,
      password: ''
    });
    setShowEditModal(true);
  };

  const getRoleColor = (role) => {
    return role === 'manager' ? '#dc3545' : '#007bff';
  };

  const getStatusColor = (isActive) => {
    return isActive ? '#28a745' : '#6c757d';
  };

  if (user.role !== 'manager') {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3>Access Denied</h3>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>User Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <FiUserPlus size={16} />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Active Jobs</th>
                    <th>Completed Jobs</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.user_id}>
                      <td>
                        <div>
                          <div style={{ fontWeight: '500' }}>{user.full_name}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            {user.username} • {user.email}
                          </div>
                        </div>
                      </td>
                      <td>
                        <select
                          value={user.role}
                          onChange={(e) => handleChangeRole(user.user_id, e.target.value)}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            color: getRoleColor(user.role),
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                          disabled={user.user_id === user.user_id} // Can't change own role
                        >
                          <option value="worker">Worker</option>
                          <option value="manager">Manager</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => handleToggleStatus(user.user_id, user.is_active)}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            color: getStatusColor(user.is_active),
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          disabled={user.user_id === user.user_id} // Can't deactivate self
                        >
                          {user.is_active ? <FiToggleRight size={20} /> : <FiToggleLeft size={20} />}
                          {user.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <FiClock size={14} style={{ color: '#f57c00' }} />
                          {user.active_jobs}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <FiCheckCircle size={14} style={{ color: '#28a745' }} />
                          {user.completed_jobs}
                        </div>
                      </td>
                      <td>
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => openEditModal(user)}
                          title="Edit User"
                        >
                          <FiEdit size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New User</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateUser}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Username *</label>
                  <input
                    type="text"
                    name="username"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                  {errors.full_name && (
                    <div className="invalid-feedback">{errors.full_name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Role *</label>
                  <select
                    name="role"
                    className="form-control"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="worker">Worker</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit User</h3>
              <button 
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleEditUser}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                  {errors.full_name && (
                    <div className="invalid-feedback">{errors.full_name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        is_active: e.target.checked
                      }))}
                    />
                    Active user
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
