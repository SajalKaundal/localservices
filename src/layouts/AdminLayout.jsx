import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiBarChart2, FiUsers, FiClipboard, FiCalendar, FiSettings } from 'react-icons/fi';
import Button from '../components/ui/Button';

// Reusing DashboardLayout CSS for the sidebar structure
import './DashboardLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiBarChart2 /> },
    { name: 'Users', path: '/admin/users', icon: <FiUsers /> },
    { name: 'Services', path: '/admin/services', icon: <FiClipboard /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <FiCalendar /> },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings /> },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Link to="/" className="navbar-brand">
            <span className="brand-text">Local</span>
            <span className="brand-accent">Serve</span>
            <span style={{marginLeft: '8px', fontSize: '14px', color: 'var(--color-shade-50)'}}>ADMIN</span>
          </Link>
        </div>
        
        <nav className="sidebar-nav">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <Button variant="ghost" className="logout-btn" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2 className="heading-4">
            {navLinks.find(l => l.path === location.pathname)?.name || 'Admin Panel'}
          </h2>
          <div className="user-profile">
            <div className="avatar" style={{backgroundColor: '#EF4444', borderColor: 'var(--color-void)'}}>A</div>
          </div>
        </header>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
