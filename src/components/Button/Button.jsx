import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  type = 'button',
  fullWidth = false
}) => {
  return (
    <button 
      type={type}
      className={`shopify-button ${variant} ${fullWidth ? 'full-width' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
