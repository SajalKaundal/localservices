import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-text">Local</span>
          <span className="brand-accent">Serve</span>
        </Link>
        
        <div className="navbar-links">
          {userRole === 'consumer' && (
            <>
              <Link to="/consumer/dashboard" className="nav-link" style={{color: 'var(--color-neon-green)'}}>My Dashboard</Link>
              <Link to="/consumer/bookings" className="nav-link">My Bookings</Link>
              <Link to="/consumer/profile" className="nav-link">Account Settings</Link>
            </>
          )}
          {userRole === 'provider' && (
            <>
              <Link to="/provider/dashboard" className="nav-link" style={{color: 'var(--color-neon-green)'}}>Provider Dashboard</Link>
              <Link to="/provider/jobs" className="nav-link">Active Jobs</Link>
              <Link to="/provider/profile" className="nav-link">Account Settings</Link>
            </>
          )}
        </div>

        <div className="navbar-actions">
          <Button variant="ghost" onClick={() => navigate('/admin/dashboard')} style={{color: 'var(--color-shade-50)', marginRight: '8px'}}>Admin</Button>
          {userRole ? (
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
              <div className="avatar" style={{width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-dark-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '500', border: '1px solid var(--color-neon-green)'}}>
                {userRole === 'provider' ? 'P' : 'C'}
              </div>
              <Button variant="ghost" onClick={() => {
                localStorage.removeItem('userRole');
                navigate('/');
                window.location.reload();
              }}>Log out</Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/auth')}>Log in</Button>
              <Button variant="primary" onClick={() => navigate('/auth')}>Start for free</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
