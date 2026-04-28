import React from 'react';
import './Badge.css';

const Badge = ({ children, className = '', ...props }) => {
  return (
    <span className={`badge ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
