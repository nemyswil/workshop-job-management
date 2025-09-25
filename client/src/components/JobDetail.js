import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  FiArrowLeft, 
  FiEdit, 
  FiDownload, 
  FiTrash2, 
  FiPlus,
  FiMessageSquare,
  FiCalendar,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiFile
} from 'react-icons/fi';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [history, setHistory] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState('');

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/jobs/${id}`);
      setJob(response.data.job);
      setAttachments(response.data.attachments);
      setHistory(response.data.history);
      setNotes(response.data.notes);
    } catch (error) {
      console.error('Error fetching job details:', error);
      toast.error('Failed to fetch job details');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await axios.put(`/api/jobs/${id}`, { status: newStatus });
      setJob({ ...job, status: newStatus });
      toast.success('Status updated successfully');
      fetchJobDetails(); // Refresh to get updated timestamps
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      await axios.post(`/api/jobs/${id}/notes`, {
        note: newNote,
        is_internal: isInternal
      });
      
      setNewNote('');
      setIsInternal(false);
      setShowNoteModal(false);
      toast.success('Note added successfully');
      fetchJobDetails();
    } catch (error) {
      console.error('Error adding note:', error);
      toast.error('Failed to add note');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`/api/attachments/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('File uploaded successfully');
      fetchJobDetails();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    }
  };

  const handleDownloadAttachment = async (attachmentId) => {
    try {
      const response = await axios.get(`/api/attachments/download/${attachmentId}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', response.headers['content-disposition']?.split('filename=')[1] || 'file');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    }
  };

  const handleDeleteAttachment = async (attachmentId) => {
    if (!window.confirm('Are you sure you want to delete this attachment?')) return;

    try {
      await axios.delete(`/api/attachments/${attachmentId}`);
      toast.success('Attachment deleted successfully');
      fetchJobDetails();
    } catch (error) {
      console.error('Error deleting attachment:', error);
      toast.error('Failed to delete attachment');
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

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3>Job not found</h3>
        <button className="btn btn-primary" onClick={() => navigate('/jobs')}>
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/jobs')}
        >
          <FiArrowLeft size={16} />
          Back
        </button>
        <div>
          <h2 style={{ margin: 0 }}>{job.job_number}</h2>
          <p style={{ margin: '4px 0 0 0', color: '#666' }}>{job.title}</p>
        </div>
        {user.role === 'manager' && (
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/jobs/${id}/edit`)}
          >
            <FiEdit size={16} />
            Edit
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Main Content */}
        <div>
          {/* Job Details */}
          <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-header">
              <h3 style={{ margin: 0 }}>Job Details</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ fontWeight: '500', color: '#666' }}>Status</label>
                  <div style={{ marginTop: '4px' }}>
                    <span 
                      className="badge"
                      style={{ 
                        backgroundColor: getStatusColor(job.status) + '20',
                        color: getStatusColor(job.status)
                      }}
                    >
                      {job.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ fontWeight: '500', color: '#666' }}>Priority</label>
                  <div style={{ marginTop: '4px' }}>
                    <span 
                      className="badge"
                      style={{ 
                        backgroundColor: getPriorityColor(job.priority) + '20',
                        color: getPriorityColor(job.priority)
                      }}
                    >
                      {job.priority}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{ fontWeight: '500', color: '#666' }}>Due Date</label>
                  <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FiCalendar size={14} />
                    {job.due_date ? (
                      <>
                        {new Date(job.due_date).toLocaleDateString()}
                        {isOverdue(job.due_date) && (
                          <FiAlertCircle size={14} style={{ color: '#dc3545' }} />
                        )}
                      </>
                    ) : '-'}
                  </div>
                </div>
                <div>
                  <label style={{ fontWeight: '500', color: '#666' }}>Assigned To</label>
                  <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FiUser size={14} />
                    {job.assigned_to_name || 'Unassigned'}
                  </div>
                </div>
              </div>

              {job.description && (
                <div style={{ marginTop: '20px' }}>
                  <label style={{ fontWeight: '500', color: '#666' }}>Description</label>
                  <div style={{ 
                    marginTop: '4px', 
                    padding: '12px', 
                    backgroundColor: '#f8f9fa', 
                    borderRadius: '4px',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {job.description}
                  </div>
                </div>
              )}

              {job.customer_name && (
                <div style={{ marginTop: '20px' }}>
                  <label style={{ fontWeight: '500', color: '#666' }}>Customer Information</label>
                  <div style={{ 
                    marginTop: '4px', 
                    padding: '12px', 
                    backgroundColor: '#f8f9fa', 
                    borderRadius: '4px'
                  }}>
                    <div><strong>Name:</strong> {job.customer_name}</div>
                    {job.customer_contact && (
                      <div><strong>Contact:</strong> {job.customer_contact}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Attachments */}
          <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Attachments ({attachments.length})</h3>
              <div>
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload" className="btn btn-primary btn-sm">
                  <FiPlus size={14} />
                  Upload
                </label>
              </div>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              {attachments.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  No attachments
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>File Name</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Uploaded By</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attachments.map((attachment) => (
                        <tr key={attachment.attachment_id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <FiFile size={16} />
                              {attachment.original_name}
                            </div>
                          </td>
                          <td>{attachment.file_type}</td>
                          <td>{(attachment.file_size / 1024).toFixed(1)} KB</td>
                          <td>{attachment.uploaded_by_name}</td>
                          <td>{formatDate(attachment.uploaded_at)}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleDownloadAttachment(attachment.attachment_id)}
                                title="Download"
                              >
                                <FiDownload size={14} />
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteAttachment(attachment.attachment_id)}
                                title="Delete"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="card">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Notes ({notes.length})</h3>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setShowNoteModal(true)}
              >
                <FiMessageSquare size={14} />
                Add Note
              </button>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              {notes.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  No notes
                </div>
              ) : (
                <div style={{ padding: '20px' }}>
                  {notes.map((note) => (
                    <div key={note.note_id} style={{ 
                      marginBottom: '16px', 
                      padding: '12px', 
                      backgroundColor: note.is_internal ? '#fff3cd' : '#f8f9fa',
                      borderRadius: '4px',
                      borderLeft: `4px solid ${note.is_internal ? '#ffc107' : '#007bff'}`
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div style={{ fontWeight: '500' }}>{note.user_name}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {formatDate(note.created_at)}
                          {note.is_internal && (
                            <span style={{ marginLeft: '8px', color: '#856404' }}>(Internal)</span>
                          )}
                        </div>
                      </div>
                      <div style={{ whiteSpace: 'pre-wrap' }}>{note.note}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Status Actions */}
          <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-header">
              <h3 style={{ margin: 0 }}>Quick Actions</h3>
            </div>
            <div className="card-body">
              {job.status === 'open' && (
                <button 
                  className="btn btn-warning"
                  onClick={() => handleStatusUpdate('in_progress')}
                  style={{ width: '100%', marginBottom: '8px' }}
                >
                  <FiClock size={16} />
                  Start Work
                </button>
              )}
              
              {job.status === 'in_progress' && (
                <button 
                  className="btn btn-success"
                  onClick={() => handleStatusUpdate('completed')}
                  style={{ width: '100%', marginBottom: '8px' }}
                >
                  <FiCheckCircle size={16} />
                  Mark Complete
                </button>
              )}
              
              {job.status === 'completed' && (
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleStatusUpdate('closed')}
                  style={{ width: '100%', marginBottom: '8px' }}
                >
                  Close Job
                </button>
              )}
            </div>
          </div>

          {/* Job History */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ margin: 0 }}>Activity History</h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              {history.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  No activity
                </div>
              ) : (
                <div style={{ padding: '20px' }}>
                  {history.map((item) => (
                    <div key={item.history_id} style={{ 
                      marginBottom: '12px', 
                      paddingBottom: '12px',
                      borderBottom: '1px solid #eee'
                    }}>
                      <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                        {item.action.replace('_', ' ')}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                        by {item.user_name} • {formatDate(item.created_at)}
                      </div>
                      {item.description && (
                        <div style={{ fontSize: '14px', color: '#555' }}>
                          {item.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="modal-overlay" onClick={() => setShowNoteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Note</h3>
              <button 
                className="modal-close"
                onClick={() => setShowNoteModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddNote}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Note</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter your note..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={isInternal}
                      onChange={(e) => setIsInternal(e.target.checked)}
                    />
                    Internal note (only visible to managers)
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowNoteModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
