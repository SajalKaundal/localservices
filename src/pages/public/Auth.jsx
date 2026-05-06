import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { resetPassword } from '../../services/authService';
import './Auth.css';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [role, setRole] = useState(searchParams.get('role') === 'provider' ? 'provider' : 'user');
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false);
    setMessage('');
    setError('');
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setMessage('');
    setError('');
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { loginConsumer, loginProvider, signupConsumer, signupProvider, loginWithGoogle, mockLogin } = useAuth();

  const handleRoleChange = (selectedRole) => setRole(selectedRole);

  const performLoginRedirect = () => {
    if (role === 'provider') {
      navigate('/provider/dashboard');
    } else {
      navigate('/');
    }
  };

  const getHumanReadableError = (code) => {
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Incorrect email or password. Please try again.';
      case 'auth/email-already-in-use':
        return 'An account already exists with this email.';
      case 'auth/weak-password':
        return 'Your password is too weak. Please use at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (isForgotPassword) {
        await resetPassword(email);
        setMessage('Password reset email sent! Check your inbox.');
      } else if (isLogin) {
        if (role === 'provider') {
          await loginProvider(email, password);
        } else {
          await loginConsumer(email, password);
        }
        performLoginRedirect();
      } else {
        if (role === 'provider') {
          await signupProvider(email, password, name);
        } else {
          await signupConsumer(email, password, name);
        }
        alert('Account created! A verification link has been sent to your email.');
        performLoginRedirect();
      }
    } catch (err) {
      console.error(err);
      if (err.message && (err.message.includes('API_KEY') || err.message.includes('Firebase not configured'))) {
         alert("Invalid Firebase config. Proceeding with mock login.");
         mockLogin(role);
         performLoginRedirect();
      } else {
         setError(getHumanReadableError(err.code));
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');

    try {
      await loginWithGoogle(role);
      performLoginRedirect();
    } catch (err) {
      console.error(err);
      if (err.message && (err.message.includes('API_KEY') || err.message.includes('Firebase not configured'))) {
         alert("Invalid Firebase config. Proceeding with mock Google login.");
         mockLogin(role);
         performLoginRedirect();
      } else {
         setError(getHumanReadableError(err.code));
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <Card className="auth-card" elevation="medium">
          <div className="auth-header">
            <h1 className="heading-3">
              {isForgotPassword ? 'Reset Password' : isLogin ? `Welcome back${role === 'provider' ? ' Provider' : ''}` : `Create a ${role === 'provider' ? 'Provider' : ''} account`}
            </h1>
            <p className="body-muted">
              {isForgotPassword 
                ? 'Enter your email and we will send you a reset link.'
                : isLogin 
                  ? 'Enter your details to access your account.' 
                  : 'Join LocalServe to get started today.'}
            </p>
          </div>

          {error && <div className="auth-error" style={{color: '#ef4444', marginBottom: '16px', fontSize: '14px'}}>{error}</div>}
          {message && <div className="auth-message" style={{color: 'var(--color-neon-green)', marginBottom: '16px', fontSize: '14px'}}>{message}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && !isForgotPassword && (
              <Input 
                label="Full Name" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            )}
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            {!isForgotPassword && (
              <>
                <Input 
                  label="Password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                {isLogin && (
                  <div style={{textAlign: 'right', marginTop: '-8px', marginBottom: '16px'}}>
                    <button type="button" onClick={toggleForgotPassword} style={{background: 'none', border: 'none', color: 'var(--color-shade-50)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline'}}>
                      Forgot Password?
                    </button>
                  </div>
                )}
              </>
            )}
            
            <Button type="submit" variant="primary" className="auth-submit-btn">
              {isForgotPassword ? 'Send Reset Link' : isLogin ? 'Log in' : 'Sign up'}
            </Button>
            
            {!isForgotPassword && (
              <>
                <div style={{display: 'flex', alignItems: 'center', margin: '16px 0', color: 'var(--color-shade-50)'}}>
                   <div style={{flex: 1, height: '1px', backgroundColor: 'var(--color-dark-card-border)'}}></div>
                   <span style={{padding: '0 12px', fontSize: '12px'}}>OR</span>
                   <div style={{flex: 1, height: '1px', backgroundColor: 'var(--color-dark-card-border)'}}></div>
                </div>
                
                <Button type="button" variant="secondary" onClick={handleGoogleSignIn} style={{width: '100%', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center'}}>
                   <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
                   Continue with Google
                </Button>
              </>
            )}
          </form>

          <div className="auth-footer">
            {isForgotPassword ? (
              <p className="body-small">
                Remember your password?{' '}
                <button type="button" className="auth-toggle-btn" onClick={toggleForgotPassword}>
                  Log in
                </button>
              </p>
            ) : (
              <p className="body-small">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button type="button" className="auth-toggle-btn" onClick={toggleAuthMode}>
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
