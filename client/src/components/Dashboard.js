import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { 
  FiBriefcase, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle,
  FiUser,
  FiTrendingUp,
  FiCalendar,
  FiRefreshCw
} from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch user-specific stats based on role
      let statsResponse;
      if (user.role === 'manager') {
        statsResponse = await axios.get('/api/users/stats/overview');
        setStats(statsResponse.data.overview);
      } else {
        // For workers, get their personal stats
        statsResponse = await axios.get(`/api/users/${user.user_id}`);
        setStats(statsResponse.data.statistics);
      }
      
      // Fetch recent jobs
      const jobsResponse = await axios.get('/api/jobs?limit=5');
      setRecentJobs(jobsResponse.data.jobs);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#1976d2';
      case 'in_progress': return '#f57c00';
      case 'completed': return '#2e7d32';
      case 'closed': return '#7b1fa2';
      default: return '#666';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return '#28a745';
      case 'medium': return '#ffc107';
      case 'high': return '#fd7e14';
      case 'urgent': return '#dc3545';
      default: return '#666';
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Welcome Section */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: '0 0 8px 0', color: '#333' }}>
              Welcome back, {user.full_name}!
            </h2>
            <p style={{ margin: 0, color: '#666' }}>
              {user.role === 'manager' 
                ? 'Here\'s an overview of your workshop operations.'
                : 'Here are your assigned jobs and recent activity.'
              }
            </p>
          </div>
          <button 
            className="btn btn-secondary"
            onClick={fetchDashboardData}
            title="Refresh Data"
          >
            <FiRefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px', 
          marginBottom: '20px' 
        }}>
          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <FiBriefcase size={32} style={{ color: '#1976d2', marginBottom: '8px' }} />
              <h3 style={{ margin: '0 0 4px 0', fontSize: '24px' }}>{stats.open_jobs}</h3>
              <p style={{ margin: 0, color: '#666' }}>Open Jobs</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <FiClock size={32} style={{ color: '#f57c00', marginBottom: '8px' }} />
              <h3 style={{ margin: '0 0 4px 0', fontSize: '24px' }}>{stats.in_progress_jobs}</h3>
              <p style={{ margin: 0, color: '#666' }}>In Progress</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <FiCheckCircle size={32} style={{ color: '#2e7d32', marginBottom: '8px' }} />
              <h3 style={{ margin: '0 0 4px 0', fontSize: '24px' }}>{stats.completed_jobs}</h3>
              <p style={{ margin: 0, color: '#666' }}>Completed</p>
            </div>
          </div>

          {stats.overdue_jobs > 0 && (
            <div className="card">
              <div className="card-body" style={{ textAlign: 'center' }}>
                <FiAlertCircle size={32} style={{ color: '#dc3545', marginBottom: '8px' }} />
                <h3 style={{ margin: '0 0 4px 0', fontSize: '24px', color: '#dc3545' }}>{stats.overdue_jobs}</h3>
                <p style={{ margin: 0, color: '#666' }}>Overdue</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent Jobs */}
      <div className="card">
        <div className="card-header">
          <h3 style={{ margin: 0 }}>Recent Jobs</h3>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {recentJobs.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              No jobs found
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Job #</th>
                    <th>Title</th>
                    <th>Customer</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Assigned To</th>
                  </tr>
                </thead>
                <tbody>
                  {recentJobs.map((job) => (
                    <tr 
                      key={job.job_id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/jobs/${job.job_id}`)}
                    >
                      <td>
                        <strong>{job.job_number}</strong>
                      </td>
                      <td>{job.title}</td>
                      <td>{job.customer_name || '-'}</td>
                      <td>
                        <span 
                          className="badge"
                          style={{ 
                            backgroundColor: getPriorityColor(job.priority) + '20',
                            color: getPriorityColor(job.priority)
                          }}
                        >
                          {job.priority}
                        </span>
                      </td>
                      <td>
                        <span 
                          className="badge"
                          style={{ 
                            backgroundColor: getStatusColor(job.status) + '20',
                            color: getStatusColor(job.status)
                          }}
                        >
                          {job.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        {job.due_date ? new Date(job.due_date).toLocaleDateString() : '-'}
                      </td>
                      <td>{job.assigned_to_name || 'Unassigned'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer" style={{ textAlign: 'center' }}>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/jobs')}
          >
            View All Jobs
          </button>
        </div>
      </div>

      {/* Quick Actions for Managers */}
      {user.role === 'manager' && (
        <div className="card" style={{ marginTop: '20px' }}>
          <div className="card-header">
            <h3 style={{ margin: 0 }}>Quick Actions</h3>
          </div>
          <div className="card-body">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px' 
            }}>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/jobs/create')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <FiBriefcase size={16} />
                Create New Job
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/users')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <FiUser size={16} />
                Manage Users
              </button>
              <button 
                className="btn btn-success"
                onClick={() => navigate('/jobs')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <FiTrendingUp size={16} />
                View Reports
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
