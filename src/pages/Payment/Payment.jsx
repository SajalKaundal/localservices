import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Payment.css';

const Payment = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) * 1.1; // Total with 10% tax

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
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
          <p className="body-large body-muted">Your service has been booked successfully.</p>
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
        <h1 className="heading-1">Secure Checkout</h1>
        
        <div className="payment-grid">
          {/* Checkout Form */}
          <div className="payment-form-container shadow-medium">
            <h3 className="heading-3 mb-32">Payment Details</h3>
            <form onSubmit={handleSimulatePayment} className="payment-form">
              <div className="form-group">
                <label>Cardholder Name</label>
                <input type="text" placeholder="John Doe" required className="shopify-input" />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" required className="shopify-input" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry (MM/YY)</label>
                  <input type="text" placeholder="12/26" required className="shopify-input" />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input type="text" placeholder="123" required className="shopify-input" />
                </div>
              </div>
              
              <Button type="submit" variant="primary" fullWidth className="mt-32">
                {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="payment-summary shadow-medium">
            <h3 className="heading-3 mb-32">Order Finalization</h3>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <span>{item.quantity}x {item.title}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total-container">
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
