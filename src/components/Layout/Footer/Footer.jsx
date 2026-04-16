import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="heading-4">LocalServe</h2>
          <p className="body-muted body-small">Expert local services at your doorstep. Built with precision.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h5 className="heading-5">Services</h5>
            <ul>
              <li><a href="#">Car Wash</a></li>
              <li><a href="#">AC Service</a></li>
              <li><a href="#">Home Cleaning</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5 className="heading-5">Company</h5>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="body-muted body-small">© 2026 LocalServe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
