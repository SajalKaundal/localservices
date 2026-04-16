import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './ProviderFlow.css';

const ProviderRegister = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <div className="provider-flow-page">
      <div className="auth-card shadow-medium text-center">
        <h1 className="heading-2">Become a Provider</h1>
        <p className="body-muted mb-32">Grow your business and reach hundreds of clients by offering your services.</p>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group text-left">
            <label>Business / Provider Name</label>
            <input 
              type="text" 
              className="shopify-input" 
              required 
              placeholder="e.g. John's Auto Care"
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group text-left">
            <label>Email Address</label>
            <input 
              type="email" 
              className="shopify-input" 
              required 
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group text-left">
            <label>Password</label>
            <input 
              type="password" 
              className="shopify-input" 
              required 
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="info-box my-24">
             <p className="body-small body-muted">
               All new providers start at the <strong>Beginner</strong> rank. As you list competitive prices and complete jobs, your rating and level will grow!
             </p>
          </div>
          
          <Button type="submit" variant="primary" fullWidth className="mt-24">Register as Provider</Button>
        </form>
      </div>
    </div>
  );
};

export default ProviderRegister;
