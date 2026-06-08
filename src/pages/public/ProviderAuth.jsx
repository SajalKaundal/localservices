import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { resetPassword } from '../../services/authService';
import './Auth.css';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
  </svg>
);

const getHumanReadableError = (code) => {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

const ProviderAuth = () => {
  const navigate = useNavigate();
  const { loginProvider, signupProvider, loginWithGoogle, mockLogin } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setError('');
    setMessage('');
  };

  const goTo = (next) => {
    reset();
    setMode(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    reset();
    setLoading(true);
    try {
      if (mode === 'forgot') {
        await resetPassword(email);
        setMessage('A password reset link has been sent to your email.');
      } else if (mode === 'login') {
        await loginProvider(email, password);
        navigate('/provider/dashboard');
      } else {
        await signupProvider(email, password, name);
        navigate('/provider/dashboard');
      }
    } catch (err) {
      console.error(err);
      if (err.message && (err.message.includes('API_KEY') || err.message.includes('Firebase not configured'))) {
        mockLogin('provider');
        navigate('/provider/dashboard');
      } else {
        setError(getHumanReadableError(err.code));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    reset();
    setLoading(true);
    try {
      await loginWithGoogle('provider');
      navigate('/provider/dashboard');
    } catch (err) {
      console.error(err);
      if (err.message && (err.message.includes('API_KEY') || err.message.includes('Firebase not configured'))) {
        mockLogin('provider');
        navigate('/provider/dashboard');
      } else {
        setError(getHumanReadableError(err.code));
      }
    } finally {
      setLoading(false);
    }
  };

  const titles = {
    login: 'Provider sign in',
    register: 'Join as a provider',
    forgot: 'Reset password',
  };

  const subtitles = {
    login: 'Access your provider dashboard and manage your services.',
    register: 'Start earning by offering your services on LocalServe.',
    forgot: 'Enter your email address and we will send you a reset link.',
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">

          {/* Overline */}
          <p className="auth-overline">Provider portal</p>

          {/* Header */}
          <div className="auth-header">
            <h1>{titles[mode]}</h1>
            <p>{subtitles[mode]}</p>
          </div>

          {/* Feedback */}
          {error && <div className="auth-feedback error">{error}</div>}
          {message && <div className="auth-feedback success">{message}</div>}

          {/* Form */}
          {mode === 'forgot' ? (
            <form className="auth-form" onSubmit={handleSubmit}>
              <Input
                label="Email address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="primary" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Sending…' : 'Send reset link'}
              </Button>
            </form>
          ) : mode === 'login' ? (
            <form className="auth-form" onSubmit={handleSubmit}>
              <Input
                label="Email address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="auth-forgot-link" onClick={() => goTo('forgot')}>
                  Forgot password?
                </button>
              </div>
              <Button type="submit" variant="primary" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <Input
                label="Full name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email address"
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
              <Button type="submit" variant="primary" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Creating account…' : 'Create provider account'}
              </Button>
            </form>
          )}

          {/* Google sign-in */}
          {mode !== 'forgot' && (
            <>
              <div className="auth-divider">
                <span className="auth-divider-line" />
                <span className="auth-divider-text">or</span>
                <span className="auth-divider-line" />
              </div>
              <button type="button" className="auth-google-btn" onClick={handleGoogle} disabled={loading}>
                <GoogleIcon />
                Continue with Google
              </button>
            </>
          )}

          {/* Footer */}
          <div className="auth-footer">
            {mode === 'forgot' ? (
              <p>
                Remember your password?{' '}
                <button type="button" className="auth-toggle-btn" onClick={() => goTo('login')}>
                  Sign in
                </button>
              </p>
            ) : mode === 'login' ? (
              <p>
                Don't have a provider account?{' '}
                <button type="button" className="auth-toggle-btn" onClick={() => goTo('register')}>
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button type="button" className="auth-toggle-btn" onClick={() => goTo('login')}>
                  Sign in
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProviderAuth;
