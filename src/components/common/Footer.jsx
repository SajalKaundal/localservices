import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { useAuth } from "../../context/AuthContext";

const Footer = () => {
  const { isAuthenticated } = useAuth();
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="navbar-brand">
            <span className="brand-text">Local</span>
            <span className="brand-accent">Serve</span>
          </Link>
          <p className="footer-desc">
            The premium platform for local service providers.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4 className="footer-heading">For Consumers</h4>
            <Link to="/services" className="footer-link">
              Search Services
            </Link>
            <Link to="/providers" className="footer-link">
              Top Providers
            </Link>
            {!isAuthenticated && (
              <Link to="/auth" className="footer-link">
                Sign Up
              </Link>
            )}
          </div>
          {!isAuthenticated && (
            <div className="footer-col">
              <h4 className="footer-heading">For Providers</h4>
              <Link to="/auth?role=provider" className="footer-link">
                Become a Provider
              </Link>
              <Link to="/auth?role=provider" className="footer-link">
                Provider Login
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} LocalServe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
