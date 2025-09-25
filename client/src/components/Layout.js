import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FiHome, 
  FiBriefcase, 
  FiUsers, 
  FiUser, 
  FiLogOut, 
  FiMenu, 
  FiX,
  FiPlus,
  FiChevronRight
} from 'react-icons/fi';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/jobs', icon: FiBriefcase, label: 'Jobs' },
    ...(user.role === 'manager' ? [{ path: '/users', icon: FiUsers, label: 'Users' }] : []),
    { path: '/profile', icon: FiUser, label: 'Profile' }
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard' }];
    
    if (path.startsWith('/jobs')) {
      breadcrumbs.push({ label: 'Jobs', path: '/jobs' });
      if (path.includes('/create')) {
        breadcrumbs.push({ label: 'Create Job', path: path });
      } else if (path.match(/\/jobs\/\d+/)) {
        breadcrumbs.push({ label: 'Job Details', path: path });
      }
    } else if (path.startsWith('/users')) {
      breadcrumbs.push({ label: 'Users', path: '/users' });
    } else if (path.startsWith('/profile')) {
      breadcrumbs.push({ label: 'Profile', path: '/profile' });
    }
    
    return breadcrumbs;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile menu button - removed from here as it's now in header */}

      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          backgroundColor: '#2c3e50',
          color: 'white',
          position: 'fixed',
          height: '100vh',
          left: sidebarOpen ? '0' : '-250px',
          transition: 'left 0.3s ease',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          '@media (min-width: 768px)': {
            left: '0',
            position: 'relative'
          }
        }}
      >
        <div style={{ padding: '20px', borderBottom: '1px solid #34495e' }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>Workshop Jobs</h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.8 }}>
            {user.role === 'manager' ? 'Manager' : 'Worker'}
          </p>
        </div>

        <nav style={{ flex: 1, padding: '20px 0' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  border: 'none',
                  background: isActive(item.path) ? '#3498db' : 'transparent',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.target.style.backgroundColor = '#34495e';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid #34495e' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px 20px',
              border: 'none',
              background: 'transparent',
              color: 'white',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e74c3c';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          marginLeft: '0',
          display: 'flex',
          flexDirection: 'column',
          '@media (min-width: 768px)': {
            marginLeft: '250px'
          }
        }}
      >
        {/* Header */}
        <header
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderBottom: '1px solid #dee2e6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Mobile menu button */}
            <button
              className="btn btn-secondary"
              style={{
                display: 'block',
                '@media (min-width: 768px)': { display: 'none' }
              }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>
            
            <div>
              <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>
                {location.pathname === '/dashboard' && 'Dashboard'}
                {location.pathname === '/jobs' && 'Job Management'}
                {location.pathname.startsWith('/jobs/') && 'Job Details'}
                {location.pathname === '/users' && 'User Management'}
                {location.pathname === '/profile' && 'Profile'}
              </h1>
              <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '14px' }}>
                Welcome back, {user.full_name}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Home button */}
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
              title="Go to Dashboard"
            >
              <FiHome size={16} />
            </button>
            
            {/* Logout button */}
            <button
              className="btn btn-danger"
              onClick={handleLogout}
              title="Logout"
            >
              <FiLogOut size={16} />
              Logout
            </button>
            
            {/* New Job button for managers on jobs page */}
            {location.pathname === '/jobs' && user.role === 'manager' && (
              <button
                className="btn btn-primary"
                onClick={() => navigate('/jobs/create')}
              >
                <FiPlus size={16} />
                New Job
              </button>
            )}
          </div>
        </header>

        {/* Breadcrumb Navigation */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '12px 20px', 
          borderBottom: '1px solid #dee2e6',
          fontSize: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {getBreadcrumbs().map((breadcrumb, index) => (
              <React.Fragment key={breadcrumb.path}>
                {index > 0 && <FiChevronRight size={14} style={{ color: '#666' }} />}
                <button
                  onClick={() => navigate(breadcrumb.path)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: index === getBreadcrumbs().length - 1 ? '#333' : '#007bff',
                    cursor: index === getBreadcrumbs().length - 1 ? 'default' : 'pointer',
                    textDecoration: index === getBreadcrumbs().length - 1 ? 'none' : 'underline',
                    padding: '0',
                    fontSize: '14px'
                  }}
                  disabled={index === getBreadcrumbs().length - 1}
                >
                  {breadcrumb.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Page content */}
        <main style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
