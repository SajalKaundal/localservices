import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import './Services.css';

const Services = ({ services }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const location = useLocation();

  // Extract all categories
  const categories = ['All', ...new Set(services.map(s => s.category))];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat && categories.includes(cat)) {
      setActiveCategory(cat);
    }
  }, [location]);

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="services-page">
      <div className="services-header">
        <div className="section-container">
          <h1 className="heading-1">Our Services</h1>
          <p className="body-large body-muted">Select a category to find EXACTLY what you need.</p>
        </div>
      </div>

      <div className="section-container">
        {/* Category Filters */}
        <div className="category-filters">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
          {filteredServices.length === 0 && (
            <p className="body-large body-muted no-results">No services found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
