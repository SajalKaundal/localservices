import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../components/Badge/Badge';
import './Services.css';

const Services = ({ providers }) => {
  // Aggregate all unique categories from all providers
  const allCategories = new Set();
  providers.forEach(prov => prov.services.forEach(svc => allCategories.add(svc.category)));
  const categories = Array.from(allCategories);

  // In a real app we might fetch image URLs or descriptions for categories. Here we'll map a basic design.

  return (
    <div className="services-page">
      <div className="services-header">
        <div className="section-container">
          <h1 className="heading-1">Service Directory</h1>
          <p className="body-large body-muted">Select a category to browse top-rated local providers.</p>
        </div>
      </div>

      <div className="section-container">
        <div className="categories-grid">
          {categories.map((cat, idx) => {
             // Find how many providers offer this
             const providerCount = providers.filter(p => p.services.some(s => s.category === cat)).length;
             return (
               <Link to={`/category/${encodeURIComponent(cat)}`} key={idx} className="category-card shadow-medium text-center">
                 <h2 className="heading-3 mb-16">{cat}</h2>
                 <Badge>{providerCount} Available Providers</Badge>
               </Link>
             );
          })}

          {categories.length === 0 && (
            <p className="body-large body-muted no-results">No categories available. Become the first provider!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
