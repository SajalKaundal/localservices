import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Auth.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6-digit OTP
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    if(email) {
      setStep(2);
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if(otp.join('').length === 6) {
      setStep(3);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Simulate API finish
    alert("Password reset successfully! Please log in.");
    navigate('/login');
  };

  const handleOtpChange = (index, value) => {
    if(value.length > 1) return; // Prevent multiple chars
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next
    if(value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if(nextInput) nextInput.focus();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card shadow-medium">
        
        {step === 1 && (
          <>
            <div className="auth-header">
              <h1 className="heading-3">Forgot Password</h1>
              <p className="body-muted">Enter your email to receive a secure OTP to reset your password.</p>
            </div>
            <form className="auth-form" onSubmit={handleSendOTP}>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="shopify-input" 
                  placeholder="you@example.com"
                  required 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" variant="primary" fullWidth className="mt-24">Send OTP</Button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <div className="auth-header">
              <h1 className="heading-3">Enter OTP</h1>
              <p className="body-muted">We sent a 6-digit code to <strong>{email}</strong></p>
            </div>
            <form className="auth-form" onSubmit={handleVerifyOTP}>
              <div className="form-group">
                <div className="otp-boxes">
                  {otp.map((digit, index) => (
                    <input 
                      key={index}
                      id={`otp-${index}`}
                      type="text" 
                      className="otp-input"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => {
                         if(e.key === 'Backspace' && !digit && index > 0) {
                           const prev = document.getElementById(`otp-${index - 1}`);
                           if(prev) prev.focus();
                         }
                      }}
                      required
                    />
                  ))}
                </div>
              </div>
              <Button type="submit" variant="primary" fullWidth className="mt-24">Verify OTP</Button>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <div className="auth-header">
              <h1 className="heading-3">New Password</h1>
              <p className="body-muted">Your identity has been verified. Choose a strong new password.</p>
            </div>
            <form className="auth-form" onSubmit={handleResetPassword}>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" className="shopify-input" required />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" className="shopify-input" required />
              </div>
              <Button type="submit" variant="primary" fullWidth className="mt-24">Update Password</Button>
            </form>
          </>
        )}

        <div className="auth-footer">
          <Link to="/login" className="auth-link">&larr; Back to Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
