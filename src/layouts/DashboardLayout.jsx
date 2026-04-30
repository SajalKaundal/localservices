import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiGrid, FiTool, FiClipboard, FiDollarSign, FiSearch, FiHome, FiCalendar, FiMessageSquare, FiUser, FiCreditCard } from 'react-icons/fi';
import Button from '../components/ui/Button';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isProvider = location.pathname.includes('/provider');
  
  const navLinks = isProvider ? [
    { name: 'Dashboard', path: '/provider/dashboard', icon: <FiGrid /> },
    { name: 'My Jobs', path: '/provider/jobs', icon: <FiTool /> },
    { name: 'Services', path: '/provider/services', icon: <FiClipboard /> },
    { name: 'Earnings', path: '/provider/earnings', icon: <FiDollarSign /> },
  ] : [
    { name: 'Home / Search', path: '/', icon: <FiSearch /> },
    { name: 'Dashboard', path: '/consumer/dashboard', icon: <FiHome /> },
    { name: 'My Bookings', path: '/consumer/bookings', icon: <FiCalendar /> },
    { name: 'Messages', path: '/consumer/messages', icon: <FiMessageSquare /> },
    { name: 'Payments', path: '/consumer/payments', icon: <FiCreditCard /> },
    { name: 'Profile', path: '/consumer/profile', icon: <FiUser /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Link to={isProvider ? '/provider/dashboard' : '/'} className="navbar-brand">
            <span className="brand-text">Local</span>
            <span className="brand-accent">Serve</span>
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
            {navLinks.find(l => l.path === location.pathname)?.name || 'Dashboard'}
          </h2>
          <div className="user-profile">
            <div className="avatar">U</div>
          </div>
        </header>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
