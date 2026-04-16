import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import './Home.css';

const Home = ({ providers }) => {
  // Get top 3 providers by rating
  const topProviders = [...providers].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="display-xl">Top Local Pros, <br />Ready to Work.</h1>
          <p className="body-large body-muted hero-subtitle">
            Experience the luxury of on-demand home and automotive care. Compare ratings, prices, and pick the perfect provider.
          </p>
          <div className="hero-actions">
            <Link to="/services">
              <Button variant="primary">Browse Categories</Button>
            </Link>
            <Link to="/provider/register">
              <Button variant="secondary">Become a Provider</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="featured-section">
        <div className="section-container">
          <h2 className="heading-3 section-title">Top Rated Professionals</h2>
          <div className="providers-home-grid">
            {topProviders.map(provider => (
              <Link to={`/provider/${provider.id}`} key={provider.id} className="provider-card shadow-medium">
                <div className="provider-header">
                  <Badge>{provider.level}</Badge>
                  <h3 className="heading-4 mt-16 text-white">{provider.name}</h3>
                </div>
                <div className="provider-footer">
                  <div className="rating-block">
                    <span className="star-icon">★</span>
                    <span className="rating-score">{provider.rating > 0 ? provider.rating : 'New'}</span>
                    <span className="body-small body-muted">({provider.reviews})</span>
                  </div>
                  <span className="action-txt neon-text">View Profile</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
