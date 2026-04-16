import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Auth.css';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password === formData.confirmPassword) {
      onSignup();
      navigate('/');
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card shadow-medium">
        <div className="auth-header">
          <h1 className="heading-2">Create Account</h1>
          <p className="body-muted">Join LocalServe to book and manage services.</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              className="shopify-input" 
              placeholder="John Doe"
              required 
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="shopify-input" 
              placeholder="you@example.com"
              required 
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="shopify-input" 
              placeholder="••••••••"
              required 
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              className="shopify-input" 
              placeholder="••••••••"
              required 
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>
          
          <Button type="submit" variant="primary" fullWidth className="mt-24">Create Account</Button>
        </form>

        <div className="auth-footer">
          <p className="body-muted">
            Already have an account? <Link to="/login" className="auth-link">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
