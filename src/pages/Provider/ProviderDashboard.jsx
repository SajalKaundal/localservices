import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import './ProviderFlow.css';

const ProviderDashboard = ({ providers, onAddService, requireLogin, isProvider }) => {
  const navigate = useNavigate();
  // Assume the logged in user is the LAST provider in the array for prototype purpose
  const myProfile = providers.length > 0 ? providers[providers.length - 1] : null;

  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({ title: '', category: '', price: '', description: '' });

  useEffect(() => {
    requireLogin();
    if (isProvider === false) {
      navigate('/');
    }
  }, [requireLogin, isProvider, navigate]);

  if (!myProfile) return <div className="provider-flow-page">Loading...</div>;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddService({
      title: newService.title,
      category: newService.category || 'General', // Default
      price: parseFloat(newService.price),
      description: newService.description
    });
    setNewService({ title: '', category: '', price: '', description: '' });
    setShowAddForm(false);
  };

  return (
    <div className="provider-dashboard-page section-container pt-100">
      <div className="dashboard-header mb-40">
        <h1 className="heading-1">Provider Dashboard</h1>
        <p className="body-large body-muted">Manage your business profile and services dynamically.</p>
      </div>

      <div className="dashboard-grid">
        {/* Profile Card */}
        <div className="provider-profile-card shadow-medium">
          <Badge className="mb-16">{myProfile.level}</Badge>
          <h2 className="heading-3">{myProfile.name}</h2>
          <div className="stats-row mt-16">
            <div className="stat">
              <span className="display-xl">{myProfile.rating}</span>
              <span className="body-small uppercase-tracking">Rating</span>
            </div>
            <div className="stat">
              <span className="display-xl">{myProfile.reviews}</span>
              <span className="body-small uppercase-tracking">Reviews</span>
            </div>
          </div>
          {myProfile.reviews === 0 && (
             <p className="body-small body-muted mt-24">
               You are new! Try listing services at a lower price point to attract early customers and build your rating.
             </p>
          )}
        </div>

        {/* Services Manager */}
        <div className="provider-services-manager shadow-medium">
           <div className="manager-header mb-24">
             <h3 className="heading-3">Your Services</h3>
             <Button variant="primary" onClick={() => setShowAddForm(!showAddForm)}>
               {showAddForm ? 'Cancel' : '+ Add Service'}
             </Button>
           </div>

           {showAddForm && (
             <form className="add-service-form shadow-subtle mb-32" onSubmit={handleAddSubmit}>
               <h4 className="heading-4 mb-16">New Service Listing</h4>
               <div className="form-group mb-16">
                 <label>Service Title</label>
                 <input type="text" className="shopify-input" required value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} />
               </div>
               <div className="form-row mb-16">
                 <div className="form-group">
                   <label>Category</label>
                   <input type="text" className="shopify-input" placeholder="e.g. Car Wash" required value={newService.category} onChange={e => setNewService({...newService, category: e.target.value})} />
                 </div>
                 <div className="form-group">
                   <label>Price ($)</label>
                   <input type="number" step="0.01" className="shopify-input" required value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} />
                 </div>
               </div>
               <div className="form-group mb-24">
                 <label>Description</label>
                 <textarea className="shopify-input" rows="3" required value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})}></textarea>
               </div>
               <Button type="submit" variant="secondary">List Service to Marketplace</Button>
             </form>
           )}

           <div className="service-list">
             {myProfile.services.length === 0 ? (
               <p className="body-muted">You haven't listed any services yet.</p>
             ) : (
               myProfile.services.map(svc => (
                 <div key={svc.id} className="listed-service-item shadow-subtle">
                   <div>
                     <h5 className="heading-5 mb-8">{svc.title}</h5>
                     <Badge>{svc.category}</Badge>
                   </div>
                   <div className="service-price-tag neon-text">${svc.price.toFixed(2)}</div>
                 </div>
               ))
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
