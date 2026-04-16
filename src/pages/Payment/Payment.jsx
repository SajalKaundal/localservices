import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Payment.css';

const Payment = ({ cart, clearCart, isLoggedIn }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const platformFee = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) * 0.05;
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) + platformFee;

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      clearCart();
    }, 2000);
  };

  if (cart.length === 0 && !paymentSuccess) {
    return (
      <div className="payment-page flex-center">
        <div className="section-container text-center">
          <h2 className="heading-2">No Active Order</h2>
          <Button variant="primary" onClick={() => navigate('/services')} className="mt-24">
            Browse Services
          </Button>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="payment-page flex-center">
        <div className="success-card shadow-medium">
          <div className="success-icon">✓</div>
          <h2 className="heading-2">Payment Successful</h2>
          <p className="body-large body-muted">Check your email for provider contact details.</p>
          <Button variant="primary" onClick={() => navigate('/')} className="mt-40">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="section-container">
        <div className="checkout-header">
           <h1 className="heading-1">Secure Checkout</h1>
           <div className="checkout-steps">
             <span className={`step-badge ${step >= 1 ? 'active' : ''}`}>1. Address</span>
             <span className="step-divider"></span>
             <span className={`step-badge ${step >= 2 ? 'active' : ''}`}>2. Payment</span>
           </div>
        </div>
        
        <div className="payment-grid">
          {/* Main Form Container */}
          <div className="payment-form-container shadow-medium">
            
            {step === 1 ? (
              <form onSubmit={handleAddressSubmit} className="payment-form address-form">
                <h3 className="heading-3 mb-32">Service Address</h3>
                <div className="form-group">
                  <label>Street Address</label>
                  <input 
                    type="text" 
                    placeholder="123 Main St" 
                    required 
                    className="shopify-input" 
                    value={address.street}
                    onChange={e => setAddress({...address, street: e.target.value})}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" placeholder="Los Angeles" required className="shopify-input" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input type="text" placeholder="CA" required className="shopify-input" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input type="text" placeholder="90001" required className="shopify-input" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} />
                </div>
                <Button type="submit" variant="primary" fullWidth className="mt-32">
                  Continue to Payment
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSimulatePayment} className="payment-form">
                <div className="form-header-row mb-32">
                  <h3 className="heading-3">Payment Details</h3>
                  <button type="button" className="edit-btn" onClick={() => setStep(1)}>Edit Address</button>
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="John Doe" required className="shopify-input" />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" required className="shopify-input" />
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Expiry (MM/YY)</label><input type="text" placeholder="12/26" required className="shopify-input" /></div>
                  <div className="form-group"><label>CVC</label><input type="text" placeholder="123" required className="shopify-input" /></div>
                </div>
                <Button type="submit" variant="primary" fullWidth className="mt-32">{isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}</Button>
              </form>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="payment-summary shadow-medium">
            <h3 className="heading-3 mb-32">Booking Details</h3>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item.uniqueId} className="summary-item summary-item-provider">
                  <div className="summary-item-left">
                    <span>{item.quantity}x {item.title}</span>
                    <span className="body-small text-highlight-provider">via {item.providerName}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total-container">
              <div className="summary-row">
                 <span className="body-muted">Platform Fee</span>
                 <span>${platformFee.toFixed(2)}</span>
              </div>
              <div className="summary-row total-row">
                <span className="heading-5">Total to Pay</span>
                <span className="heading-4 neon-text">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
