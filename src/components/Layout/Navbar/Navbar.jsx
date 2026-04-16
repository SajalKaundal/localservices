import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../Button/Button';
import './Navbar.css';

const Navbar = ({ cartCount, isLoggedIn, isProvider, onLogin, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          LocalServe
        </Link>
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link>
          
          <Link to="/cart" className="nav-link cart-link">
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {isProvider ? (
            <Link to="/provider/dashboard" className={`nav-link ${location.pathname === '/provider/dashboard' ? 'active' : ''}`}>Dashboard</Link>
          ) : (
            <Link to="/provider/register" className={`nav-link ${location.pathname === '/provider/register' ? 'active' : ''}`}>Become a Provider</Link>
          )}

          <div className="navbar-actions">
            {isLoggedIn ? (
              <Button variant="secondary" onClick={onLogout}>Logout</Button>
            ) : (
              <Button variant="primary" onClick={onLogin}>Log in / Sign up</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
