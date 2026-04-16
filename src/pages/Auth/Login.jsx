import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Auth.css'; // Central auth stylesheet

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password) {
      onLogin();
      navigate(-1); // Takes them back to where they came from (e.g., cart)
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card shadow-medium">
        <div className="auth-header">
          <h1 className="heading-2">Sign In</h1>
          <p className="body-muted">Log in to manage your services and bookings.</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="shopify-input" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <div className="password-header">
              <label>Password</label>
              <Link to="/forgot-password" className="forgot-link body-small">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              className="shopify-input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <Button type="submit" variant="primary" fullWidth className="mt-24">Log In</Button>
        </form>

        <div className="auth-footer">
          <p className="body-muted">
            Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
