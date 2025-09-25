import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiSave, FiUser } from 'react-icons/fi';

const CreateJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    customer_name: '',
    customer_contact: '',
    assigned_to: '',
    priority: 'medium',
    due_date: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('/api/users/workers');
      setWorkers(response.data.workers);
    } catch (error) {
      console.error('Error fetching workers:', error);
      toast.error('Failed to fetch workers');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.due_date && new Date(formData.due_date) < new Date()) {
      newErrors.due_date = 'Due date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      const jobData = {
        ...formData,
        assigned_to: formData.assigned_to || null,
        due_date: formData.due_date || null
      };

      const response = await axios.post('/api/jobs', jobData);
      
      toast.success('Job created successfully!');
      navigate(`/jobs/${response.data.job.job_id}`);
    } catch (error) {
      console.error('Error creating job:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create job';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/jobs');
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <button 
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          <FiArrowLeft size={16} />
          Back
        </button>
        <h2 style={{ margin: 0 }}>Create New Job</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Main Form */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ margin: 0 }}>Job Information</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Job Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter job title"
                  required
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter job description and instructions"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label htmlFor="customer_name" className="form-label">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    className="form-control"
                    value={formData.customer_name}
                    onChange={handleChange}
                    placeholder="Customer name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customer_contact" className="form-label">
                    Customer Contact
                  </label>
                  <input
                    type="text"
                    id="customer_contact"
                    name="customer_contact"
                    className="form-control"
                    value={formData.customer_contact}
                    onChange={handleChange}
                    placeholder="Phone or email"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label htmlFor="assigned_to" className="form-label">
                    Assign To
                  </label>
                  <select
                    id="assigned_to"
                    name="assigned_to"
                    className="form-control"
                    value={formData.assigned_to}
                    onChange={handleChange}
                  >
                    <option value="">Select worker (optional)</option>
                    {workers.map(worker => (
                      <option key={worker.user_id} value={worker.user_id}>
                        {worker.full_name} {worker.active_jobs > 0 && `(${worker.active_jobs} active jobs)`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priority" className="form-label">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    className="form-control"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="due_date" className="form-label">
                  Due Date
                </label>
                <input
                  type="date"
                  id="due_date"
                  name="due_date"
                  className={`form-control ${errors.due_date ? 'is-invalid' : ''}`}
                  value={formData.due_date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.due_date && (
                  <div className="invalid-feedback">{errors.due_date}</div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner" style={{ width: '16px', height: '16px' }}></span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FiSave size={16} />
                      Create Job
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Tips */}
          <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-header">
              <h3 style={{ margin: 0 }}>Tips</h3>
            </div>
            <div className="card-body">
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>
                  Use clear, descriptive titles that workers can easily understand
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Include detailed instructions in the description
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Set realistic due dates to help with planning
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Assign jobs to specific workers for better accountability
                </li>
                <li>
                  Use priority levels to help workers focus on urgent tasks
                </li>
              </ul>
            </div>
          </div>

          {/* Worker Status */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ margin: 0 }}>Worker Status</h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              {workers.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  No workers available
                </div>
              ) : (
                <div style={{ padding: '20px' }}>
                  {workers.map(worker => (
                    <div key={worker.user_id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiUser size={16} />
                        <span>{worker.full_name}</span>
                      </div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: worker.active_jobs > 0 ? '#f57c00' : '#28a745',
                        fontWeight: '500'
                      }}>
                        {worker.active_jobs} active
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
