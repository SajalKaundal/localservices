import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import './ProviderDetails.css';

const ProviderDetails = ({ providers, addToCart, requireLogin }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const provider = providers.find(p => p.id === parseInt(id));

  if (!provider) {
    return (
      <div className="provider-details-page not-found">
        <h2 className="heading-2">Provider Not Found</h2>
        <Button variant="secondary" onClick={() => navigate('/services')}>Go Back</Button>
      </div>
    );
  }

  const handleAddToCart = (service) => {
    addToCart(service, provider);
    navigate('/cart');
  };

  const handleBookNow = (service) => {
    requireLogin(() => {
      addToCart(service, provider);
      navigate('/payment');
    });
  };

  return (
    <div className="provider-details-page section-container">
      
      {/* Provider Hero Header */}
      <div className="provider-hero shadow-medium">
        <div className="provider-hero-content">
          <Badge className="mb-16">{provider.level}</Badge>
          <h1 className="display-xl">{provider.name}</h1>
          <div className="rating-block mt-24">
            <span className="star-icon">★</span>
            <span className="rating-score heading-4">{provider.rating > 0 ? provider.rating : 'New'}</span>
            <span className="review-count body-large body-muted">({provider.reviews} completed jobs)</span>
          </div>
        </div>
      </div>

      {/* Services Offered */}
      <div className="provider-services-section mt-64">
        <h2 className="heading-2 mb-40">Services Offered</h2>
        
        {provider.services.length === 0 ? (
          <p className="body-large body-muted">This provider has not listed any services yet.</p>
        ) : (
          <div className="provider-services-grid">
            {provider.services.map(svc => (
              <div key={svc.id} className="detail-card shadow-subtle">
                <div className="detail-header">
                  <Badge className="detail-badge">{svc.category}</Badge>
                  <h3 className="heading-3">{svc.title}</h3>
                </div>
                
                <div className="detail-body">
                  <p className="body-large">{svc.description}</p>
                </div>
                
                <div className="detail-price-box mb-32">
                  <span className="price-label">Price</span>
                  <span className="display-xl price-value">${svc.price.toFixed(2)}</span>
                </div>
                
                <div className="detail-actions">
                  <Button variant="primary" onClick={() => handleBookNow(svc)}>Book Now</Button>
                  <Button variant="secondary" onClick={() => handleAddToCart(svc)}>Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default ProviderDetails;
