import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Badge from '../../components/Badge/Badge';
import './CategoryProviders.css';

const CategoryProviders = ({ providers }) => {
  const { categoryName } = useParams();
  const category = decodeURIComponent(categoryName);

  // Filter providers that offer this category
  const activeProviders = providers.filter(prov => 
    prov.services.some(svc => svc.category === category)
  );

  return (
    <div className="category-providers-page">
      <div className="page-header section-container">
        <h1 className="heading-1">{category} Providers</h1>
        <p className="body-large body-muted">Compare local professionals and pick the best fit for your budget.</p>
      </div>

      <div className="section-container">
        <div className="provider-list">
          {activeProviders.length === 0 ? (
            <p className="body-large body-muted text-center pt-100">No providers found for this category.</p>
          ) : (
            activeProviders.map(provider => {
              // Find cheapest service in this category for this provider to display as "Starting at"
              const categoryServices = provider.services.filter(s => s.category === category);
              const minPrice = Math.min(...categoryServices.map(s => s.price));

              return (
                <Link to={`/provider/${provider.id}`} key={provider.id} className="provider-row-card shadow-subtle">
                  <div className="provider-info">
                    <Badge className="mb-16">{provider.level}</Badge>
                    <h2 className="heading-3">{provider.name}</h2>
                    <div className="rating-block mt-8">
                       <span className="star-icon">★</span>
                       <span className="rating-score">{provider.rating > 0 ? provider.rating : 'New'}</span>
                       <span className="review-count body-muted">({provider.reviews} jobs)</span>
                    </div>
                  </div>
                  <div className="provider-price-action">
                    <div className="price-tag">
                      <span className="body-small uppercase-tracking body-muted">Starting at</span>
                      <span className="price-val neon-text">${minPrice.toFixed(2)}</span>
                    </div>
                    <span className="action-link">View Profile &rarr;</span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProviders;
