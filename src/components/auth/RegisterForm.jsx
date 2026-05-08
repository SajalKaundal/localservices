import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm = ({ name, setName, email, setEmail, password, setPassword, onSubmit }) => {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <Input 
        label="Full Name" 
        placeholder="John Doe" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        required 
      />
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
      <Button type="submit" variant="primary" className="auth-submit-btn" style={{ width: '100%' }}>
        Sign up
      </Button>
    </form>
  );
};

export default RegisterForm;
