import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import './Home.css';

const Home = ({ services }) => {
  const featuredServices = services.slice(0, 3); // Showing top 3

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="display-xl">Premium Services,<br />Delivered.</h1>
          <p className="body-large body-muted hero-subtitle">
            Experience the luxury of on-demand home and automotive care, seamlessly integrated into your lifestyle.
          </p>
          <div className="hero-actions">
            <Link to="/services">
              <Button variant="primary">Explore Services</Button>
            </Link>
            <Link to="/services?category=Car Wash">
              <Button variant="secondary">Book Car Wash</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="featured-section">
        <div className="section-container">
          <h2 className="heading-3 section-title">Featured Picks</h2>
          <div className="services-grid">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="value-prop-section">
        <div className="section-container">
          <h2 className="display-xl value-number">150K+</h2>
          <p className="body-large body-muted">Services delivered with unmatched precision.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
