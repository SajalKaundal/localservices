import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import './LandingPage.css';
import { useUser } from '../../context/UserContext';

const categories = [
  { id: 1, name: 'Home Cleaning', image: './images/HouseCleaning.jpg', desc: 'Professional deep cleaning & tidying for your entire home.' },
  { id: 2, name: 'Electrician', image: './images/Electrician.jpg', desc: 'Expert wiring, installations, and quick electrical repairs.' },
  { id: 3, name: 'Plumbing', image: './images/Plumber.jpg', desc: 'Fix leaks, install fixtures, and resolve pipe issues fast.' },
  { id: 4, name: 'AC Repair', image: './images/AcRepair.jpg', desc: 'Reliable servicing, gas refills, and cooling solutions.' },
];

const providers = [
  { id: 1, name: "Alex's Auto Care", category: 'Car Wash', rating: 4.8, reviews: 124 },
  { id: 2, name: "CoolBreeze AC", category: 'AC Service', rating: 4.9, reviews: 89 },
  { id: 3, name: "Fresh Home", category: 'Cleaning', rating: 4.7, reviews: 205 },
];

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'provider') {
      navigate('/provider/dashboard');
    }
  }, [navigate]);
const {user} = useUser()
  console.log(user)
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-gradient-wash"></div>
        <div className="container hero-content">
          <Badge className="hero-badge">New: Smart Pricing Engine</Badge>
          <h1 className="display-xl hero-title">
            The premium platform for<br />
            <span className="hero-highlight">local services.</span>
          </h1>
          <p className="body-large body-muted hero-subtitle">
            Discover and book the best professionals in your area.
          </p>
          
          <div className="hero-search-box">
            <Input 
              placeholder="What do you need help with?" 
              className="hero-search-input"
            />
            <Button variant="primary" onClick={() => navigate('/services')}>Search</Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="heading-2 section-title">Popular Services</h2>
          <div className="categories-grid">
            {categories.map(cat => (
              <Card key={cat.id} className="category-card" onClick={() => navigate(`/services/${cat.id}`)}>
                <div className="category-image-wrapper">
                  <img src={cat.image} alt={cat.name} className="category-cover-img" />
                </div>
                <div className="category-content">
                  <h3 className="heading-4">{cat.name}</h3>
                  <p className="body-medium body-muted" style={{marginTop: '8px'}}>{cat.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="providers-section">
        <div className="container">
          <h2 className="heading-2 section-title">Top Rated Providers</h2>
          <div className="providers-grid">
            {providers.map(provider => (
              <Card key={provider.id} elevation="medium" className="provider-card">
                <div className="provider-header">
                  <div className="provider-avatar">{provider.name.charAt(0)}</div>
                  <Badge>{provider.category}</Badge>
                </div>
                <h3 className="heading-4 provider-name">{provider.name}</h3>
                <div className="provider-stats">
                  <span className="provider-rating">★ {provider.rating}</span>
                  <span className="body-muted">({provider.reviews} reviews)</span>
                </div>
                <Button variant="ghost" className="provider-cta" onClick={() => navigate(`/provider/${provider.id}`)}>View Profile</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <h2 className="heading-2 section-title">What Our Customers Say</h2>
          <div className="reviews-grid">
            {[
              { id: 1, name: 'Sarah Jenkins', text: 'Found an amazing plumber in just 10 minutes. The service was top notch and the pricing was very transparent.', rating: 5 },
              { id: 2, name: 'Michael Chen', text: 'LocalServe made it so easy to get my AC fixed during the heatwave. Highly recommend the professionals here!', rating: 5 },
              { id: 3, name: 'Emily Rodriguez', text: 'I use this app for all my home cleaning needs. The providers are always punctual and thorough.', rating: 4.5 },
            ].map(review => (
              <Card key={review.id} className="review-card" elevation="subtle">
                <div className="review-stars">
                  {'★'.repeat(Math.floor(review.rating))}
                  {review.rating % 1 !== 0 ? '½' : ''}
                </div>
                <p className="body-large review-text">"{review.text}"</p>
                <div className="review-author">- {review.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
