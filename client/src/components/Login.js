import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData);
      if (result.success) {
        toast.success('Login successful!');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', margin: '20px' }}>
        <div className="card-header" style={{ textAlign: 'center', borderBottom: 'none' }}>
          <h2 style={{ margin: 0, color: '#333' }}>Workshop Job Management</h2>
          <p style={{ margin: '8px 0 0 0', color: '#666' }}>Sign in to your account</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: '16px', height: '16px' }}></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
        <div className="card-footer" style={{ textAlign: 'center', borderTop: 'none' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>
            <p style={{ margin: '0 0 8px 0' }}>Demo Credentials:</p>
            <div style={{ fontSize: '12px' }}>
              <p style={{ margin: '2px 0' }}><strong>Manager:</strong> admin / admin123</p>
              <p style={{ margin: '2px 0' }}><strong>Worker:</strong> worker1 / worker123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
