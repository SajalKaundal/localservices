import React from 'react';
import './Badge.css';

const Badge = ({ children, className = '' }) => {
  return (
    <span className={`shopify-badge ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
