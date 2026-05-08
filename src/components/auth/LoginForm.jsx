import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm = ({ email, setEmail, password, setPassword, onSubmit, toggleForgotPassword }) => {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <Input 
        label="Email Address" 
        type="email" 
        placeholder="name@example.com" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
      />
      <Input 
        label="Password" 
        type="password" 
        placeholder="••••••••" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required 
      />
      <div style={{textAlign: 'right', marginTop: '-8px', marginBottom: '16px'}}>
        <button type="button" onClick={toggleForgotPassword} style={{background: 'none', border: 'none', color: 'var(--color-shade-50)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline'}}>
          Forgot Password?
        </button>
      </div>
      <Button type="submit" variant="primary" className="auth-submit-btn" style={{ width: '100%' }}>
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
