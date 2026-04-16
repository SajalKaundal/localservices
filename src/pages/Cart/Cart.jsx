import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Cart.css';

const Cart = ({ cart, removeFromCart, requireLogin }) => {
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    requireLogin(() => {
      navigate('/payment');
    }, "Log in to save your cart details and speed up checkout!");
  };

  return (
    <div className="cart-page">
      <div className="section-container">
        <h1 className="heading-1">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="empty-cart flex-col-center">
            <p className="body-large body-muted">Your cart is currently empty.</p>
            <Button variant="primary" onClick={() => navigate('/services')} className="mt-24">
              Browse Services
            </Button>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items shadow-medium">
              <div className="cart-header">
                <span className="body-muted">Service</span>
                <span className="body-muted">Price</span>
              </div>
              
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h4 className="heading-4">{item.title}</h4>
                    <p className="body-small body-muted">Qty: {item.quantity}</p>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary shadow-medium">
              <h3 className="heading-3">Order Summary</h3>
              <div className="summary-row">
                <span className="body-muted">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="body-muted">Taxes (Est.)</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="summary-row total-row">
                <span className="heading-5">Total</span>
                <span className="heading-4 neon-text">${(total * 1.1).toFixed(2)}</span>
              </div>
              <Button variant="primary" fullWidth onClick={handleCheckout}>
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
