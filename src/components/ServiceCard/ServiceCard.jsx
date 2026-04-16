import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../Badge/Badge';
import './ServiceCard.css';

const ServiceCard = ({ service }) => {
  return (
    <Link to={`/services/${service.id}`} className="service-card shadow-medium">
      <div className="service-card-header">
        <h4 className="heading-4">{service.title}</h4>
        <Badge>{service.category}</Badge>
      </div>
      
      <div className="service-card-body">
        <p className="body-muted body-small">{service.description}</p>
      </div>
      
      <div className="service-card-footer">
        <span className="service-price">${service.price.toFixed(2)}</span>
        <span className="service-link">View Details &rarr;</span>
      </div>
    </Link>
  );
};

export default ServiceCard;
