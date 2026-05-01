import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import './ServiceListing.css';
import { fetchProviders } from '../../services/publicServices';

const providersList = [
  { id: 1, name: "CoolBreeze AC", exp: "5 years", price: "₹45/hr", rating: 4.9, available: true },
  { id: 2, name: "Polar Express Air", exp: "8 years", price: "₹60/hr", rating: 4.7, available: true },
  { id: 3, name: "QuickFix AC", exp: "2 years", price: "₹35/hr", rating: 4.2, available: false },
];

const ServiceListing = () => {
  const navigate = useNavigate();
  const [providers,setProviders] = useState([])
  // const { categoryId } = useParams();

  useEffect(()=>{
    const getProviders = async ()=>{
      const providers= await fetchProviders()
      setProviders(providers)
    }
    getProviders()
  },[])

  return (
    <div className="service-listing-page">
      <div className="container listing-layout">
        
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <Card elevation="subtle" className="filters-card">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Filters</h3>
            
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

            <div className="filter-group">
              <h4 className="heading-6 body-muted">Sort By</h4>
              <select className="filter-select focus-ring">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Rating: High to Low</option>
              </select>
            </div>
          </Card>
        </aside>

        {/* Listings */}
        <main className="listings-main">
          <h1 className="heading-2" style={{marginBottom: '24px'}}>AC Repair Providers</h1>
          
          <div className="providers-list">
            {providers.map(provider => (
              <Card key={provider._id} className="listing-card" onClick={() => navigate(`/provider/${provider._id}`)}>
                <div className="listing-card-left">
                  <div className="listing-avatar">{provider.name.charAt(0)}</div>
                  <div className="listing-info">
                    <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                      <h3 className="heading-4">{provider.name}</h3>
                      {provider.isAvailable ? (
                        <Badge style={{backgroundColor: 'rgba(54, 244, 164, 0.2)', color: 'var(--color-neon-green)'}}>Available Now</Badge>
                      ) : (
                        <Badge style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>Busy</Badge>
                      )}
                    </div>
                    <p className="body-muted" style={{marginTop: '4px'}}>
                      {`${provider.experience} years`} experience • {`₹${provider.pricePerHour}/hr`}
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

export default ServiceListing;
