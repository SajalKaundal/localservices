import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import './ServiceListing.css'; // Reusing listing styles

const allProvidersList = [
  { id: 1, name: "CoolBreeze AC", category: "AC Repair", exp: "5 years", price: "₹45/hr", rating: 4.9, available: true },
  { id: 2, name: "Polar Express Air", category: "AC Repair", exp: "8 years", price: "₹60/hr", rating: 4.7, available: true },
  { id: 4, name: "Alex Auto Care", category: "Car Wash", exp: "3 years", price: "₹25/wash", rating: 4.8, available: true },
  { id: 5, name: "Joe Plumber", category: "Plumbing", exp: "10 years", price: "₹80/hr", rating: 4.5, available: false },
  { id: 6, name: "Elite Cleaning", category: "Home Cleaning", exp: "4 years", price: "₹30/hr", rating: 4.6, available: true },
];

const ProvidersPage = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="service-listing-page">
      <div className="container listing-layout">
        
        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <Card elevation="subtle" className="filters-card">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Filters & Sorting</h3>
            
            <div className="filter-group">
              <h4 className="heading-6 body-muted">Sort By</h4>
              <select className="filter-select focus-ring" style={{marginBottom: '8px'}}>
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
              </select>
            </div>

            <div className="filter-group">
              <h4 className="heading-6 body-muted">Category</h4>
              <select className="filter-select focus-ring" style={{marginBottom: '8px'}}>
                <option>All Categories</option>
                <option>AC Repair</option>
                <option>Car Wash</option>
                <option>Plumbing</option>
                <option>Home Cleaning</option>
              </select>
            </div>

            <div className="filter-group">
              <h4 className="heading-6 body-muted">Experience</h4>
              <label><input type="checkbox" /> 1-3 Years</label>
              <label><input type="checkbox" /> 3-5 Years</label>
              <label><input type="checkbox" /> 5+ Years</label>
            </div>

            <div className="filter-group">
              <h4 className="heading-6 body-muted">Rating</h4>
              <label><input type="checkbox" /> 4.5 & Above</label>
              <label><input type="checkbox" /> 4.0 & Above</label>
            </div>
            
            <Button variant="secondary" style={{width: '100%', marginTop: '24px'}} onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
          </Card>
        </aside>

        {/* Listings */}
        <main className="listings-main">
          <div className="sort-filter-container">
            <div>
              <h1 className="heading-2" style={{marginBottom: '8px'}}>Top Providers</h1>
              <p className="body-muted" style={{marginBottom: '0'}}>Discover the best local professionals across all categories.</p>
            </div>
            <Button 
              variant="outline" 
              className="mobile-filter-toggle" 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {isFilterOpen ? 'Hide Filters & Sorting' : 'Show Filters & Sorting'}
            </Button>
          </div>
          
          <div className="providers-list" style={{marginTop: '24px'}}>
            {allProvidersList.map(provider => (
              <Card key={provider.id} className="listing-card" onClick={() => navigate(`/provider/${provider.id}`)}>
                <div className="listing-card-left">
                  <div className="listing-avatar">{provider.name.charAt(0)}</div>
                  <div className="listing-info">
                    <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                      <h3 className="heading-4">{provider.name}</h3>
                      {provider.available ? (
                        <Badge style={{backgroundColor: 'rgba(54, 244, 164, 0.2)', color: 'var(--color-neon-green)'}}>Available Now</Badge>
                      ) : (
                        <Badge style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>Busy</Badge>
                      )}
                    </div>
                    <p className="body-muted" style={{marginTop: '4px'}}>
                      <span style={{color: 'var(--color-white)'}}>{provider.category}</span> • {provider.exp} experience • {provider.price}
                    </p>
                    <div className="listing-rating" style={{marginTop: '8px'}}>
                      <span style={{color: 'var(--color-neon-green)'}}>★ {provider.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="listing-card-right">
                  <Button variant="ghost">View Profile</Button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProvidersPage;
