import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  FiUser, 
  FiMail, 
  FiSave, 
  FiKey, 
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await axios.get(`/api/users/${user.user_id}`);
      setUserStats(response.data.statistics);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
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

  const validateProfile = () => {
    const newErrors = {};

    if (!profileData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};

    if (!passwordData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateProfile()) return;

    try {
      setLoading(true);
      await axios.put(`/api/users/${user.user_id}`, profileData);
      
      updateUser(profileData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) return;

    try {
      setPasswordLoading(true);
      await axios.post('/api/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      toast.success('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      const errorMessage = error.response?.data?.message || 'Failed to change password';
      toast.error(errorMessage);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: '20px' }}>Profile Settings</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Profile Information */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiUser size={20} />
              Profile Information
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleProfileSubmit}>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.username}
                  disabled
                  style={{ backgroundColor: '#f8f9fa' }}
                />
                <small className="text-muted">Username cannot be changed</small>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                  value={profileData.full_name}
                  onChange={handleProfileChange}
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
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.role === 'manager' ? 'Manager' : 'Worker'}
                  disabled
                  style={{ backgroundColor: '#f8f9fa' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" style={{ width: '16px', height: '16px' }}></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <FiSave size={16} />
                    Update Profile
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Change Password */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiKey size={20} />
              Change Password
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label className="form-label">Current Password *</label>
                <input
                  type="password"
                  name="currentPassword"
                  className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
                {errors.currentPassword && (
                  <div className="invalid-feedback">{errors.currentPassword}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">New Password *</label>
                <input
                  type="password"
                  name="newPassword"
                  className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
                {errors.newPassword && (
                  <div className="invalid-feedback">{errors.newPassword}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-warning"
                disabled={passwordLoading}
              >
                {passwordLoading ? (
                  <>
                    <span className="spinner" style={{ width: '16px', height: '16px' }}></span>
                    Changing...
                  </>
                ) : (
                  <>
                    <FiKey size={16} />
                    Change Password
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* User Statistics */}
      {userStats && (
        <div className="card" style={{ marginTop: '20px' }}>
          <div className="card-header">
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiBriefcase size={20} />
              Your Job Statistics
            </h3>
          </div>
          <div className="card-body">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px' 
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <FiClock size={24} style={{ color: '#f57c00' }} />
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    {userStats.open_jobs}
                  </span>
                </div>
                <p style={{ margin: 0, color: '#666' }}>Open Jobs</p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <FiAlertCircle size={24} style={{ color: '#1976d2' }} />
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    {userStats.in_progress_jobs}
                  </span>
                </div>
                <p style={{ margin: 0, color: '#666' }}>In Progress</p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <FiCheckCircle size={24} style={{ color: '#28a745' }} />
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    {userStats.completed_jobs}
                  </span>
                </div>
                <p style={{ margin: 0, color: '#666' }}>Completed</p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <FiBriefcase size={24} style={{ color: '#7b1fa2' }} />
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    {userStats.closed_jobs}
                  </span>
                </div>
                <p style={{ margin: 0, color: '#666' }}>Closed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
