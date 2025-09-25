import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  FiSearch, 
  FiFilter, 
  FiEye, 
  FiEdit, 
  FiPlus,
  FiCalendar,
  FiUser,
  FiAlertCircle,
  FiBriefcase,
  FiArrowLeft
} from 'react-icons/fi';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    assigned_to: ''
  });
  const [workers, setWorkers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Load filters from URL params
    const urlFilters = {
      search: searchParams.get('search') || '',
      status: searchParams.get('status') || '',
      priority: searchParams.get('priority') || '',
      assigned_to: searchParams.get('assigned_to') || ''
    };
    setFilters(urlFilters);
    
    fetchJobs(urlFilters);
    if (user.role === 'manager') {
      fetchWorkers();
    }
  }, [searchParams, user.role]);

  const fetchJobs = async (currentFilters = filters, page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', '20');
      // Only include non-empty filters to avoid backend validation errors
      Object.entries(currentFilters || {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null && String(value).trim() !== '') {
          params.set(key, String(value));
        }
      });

      const response = await axios.get(`/api/jobs?${params}`);
      setJobs(response.data.jobs);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('/api/users/workers');
      setWorkers(response.data.workers);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newSearchParams.set(k, v);
    });
    setSearchParams(newSearchParams);
    
    fetchJobs(newFilters);
  };

  const handlePageChange = (page) => {
    fetchJobs(filters, page);
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

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      priority: '',
      assigned_to: ''
    });
    setSearchParams({});
    fetchJobs({
      search: '',
      status: '',
      priority: '',
      assigned_to: ''
    });
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/dashboard')}
            title="Back to Dashboard"
          >
            <FiArrowLeft size={16} />
            Dashboard
          </button>
          <h2 style={{ margin: 0 }}>Job Management</h2>
        </div>
        {user.role === 'manager' && (
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/jobs/create')}
          >
            <FiPlus size={16} />
            New Job
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Filters</h3>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter size={16} />
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
        </div>
        {showFilters && (
          <div className="card-body">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div className="form-group">
                <label className="form-label">Search</label>
                <div style={{ position: 'relative' }}>
                  <FiSearch style={{ 
                    position: 'absolute', 
                    left: '8px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#666'
                  }} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search jobs..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    style={{ paddingLeft: '32px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  className="form-control"
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                >
                  <option value="">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              {user.role === 'manager' && (
                <div className="form-group">
                  <label className="form-label">Assigned To</label>
                  <select
                    className="form-control"
                    value={filters.assigned_to}
                    onChange={(e) => handleFilterChange('assigned_to', e.target.value)}
                  >
                    <option value="">All Workers</option>
                    {workers.map(worker => (
                      <option key={worker.user_id} value={worker.user_id}>
                        {worker.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Jobs Table */}
      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <div className="spinner"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              <FiBriefcase size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <h3>No jobs found</h3>
              <p>Try adjusting your filters or create a new job.</p>
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.job_id}>
                      <td>
                        <strong>{job.job_number}</strong>
                      </td>
                      <td>
                        <div>
                          <div style={{ fontWeight: '500' }}>{job.title}</div>
                          {job.description && (
                            <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                              {job.description.substring(0, 50)}...
                            </div>
                          )}
                        </div>
                      </td>
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {job.due_date ? (
                            <>
                              <FiCalendar size={14} />
                              {new Date(job.due_date).toLocaleDateString()}
                              {isOverdue(job.due_date) && (
                                <FiAlertCircle size={14} style={{ color: '#dc3545' }} />
                              )}
                            </>
                          ) : '-'}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <FiUser size={14} />
                          {job.assigned_to_name || 'Unassigned'}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => navigate(`/jobs/${job.job_id}`)}
                            title="View Details"
                          >
                            <FiEye size={14} />
                          </button>
                          {user.role === 'manager' && (
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => navigate(`/jobs/${job.job_id}/edit`)}
                              title="Edit Job"
                            >
                              <FiEdit size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="card-footer" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                Previous
              </button>
              
              <span style={{ padding: '0 16px' }}>
                Page {pagination.page} of {pagination.pages} 
                ({pagination.total} total jobs)
              </span>
              
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
