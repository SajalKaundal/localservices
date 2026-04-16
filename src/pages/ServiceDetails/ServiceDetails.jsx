import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import './ServiceDetails.css';

const ServiceDetails = ({ services, addToCart, requireLogin }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const service = services.find(s => s.id === parseInt(id));

  if (!service) {
    return (
      <div className="service-details-page not-found">
        <h2 className="heading-2">Service Not Found</h2>
        <Button variant="secondary" onClick={() => navigate('/services')}>Go Back</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(service);
    navigate('/cart');
  };

  const handleBookNow = () => {
    requireLogin(() => {
      // Adding it directly to cart and going to payment
      addToCart(service);
      navigate('/payment');
    }, "Sign in to book directly!");
  };

  return (
    <div className="service-details-page">
      <div className="section-container">
        
        <div className="detail-card shadow-medium">
          <div className="detail-header">
            <Badge className="detail-badge">{service.category}</Badge>
            <h1 className="heading-2">{service.title}</h1>
          </div>
          
          <div className="detail-body">
            <p className="body-large">{service.description}</p>
            <div className="detail-price-box">
              <span className="price-label">Starting at</span>
              <span className="display-xl price-value">${service.price.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="detail-actions">
            <Button variant="primary" onClick={handleBookNow}>Book Now</Button>
            <Button variant="secondary" onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ServiceDetails;
