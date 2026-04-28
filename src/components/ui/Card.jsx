import React from 'react';
import './Card.css';

const Card = ({ children, elevation = 'subtle', className = '', ...props }) => {
  return (
    <div 
      className={`card shadow-${elevation} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
