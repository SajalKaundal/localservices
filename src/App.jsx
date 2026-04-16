import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar/Navbar';
import Footer from './components/Layout/Footer/Footer';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import ServiceDetails from './pages/ServiceDetails/ServiceDetails';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment';
import LoginPromptModal from './components/LoginPromptModal/LoginPromptModal';

// Dummy Services Data
export const servicesData = [
  { id: 1, title: 'Premium Car Wash', category: 'Car Wash', price: 49.99, description: 'Complete interior and exterior detailing.' },
  { id: 2, title: 'AC Deep Cleaning', category: 'AC Service', price: 79.99, description: 'Full service including coil and filter cleaning.' },
  { id: 3, title: 'Basic Home Cleaning', category: 'Basic Services', price: 99.99, description: 'Standard cleaning of all rooms.' },
  { id: 4, title: 'Express Car Wash', category: 'Car Wash', price: 29.99, description: 'Quick exterior wash and tire shine.' },
  { id: 5, title: 'AC Repair & Gas Refill', category: 'AC Service', price: 149.99, description: 'Diagnostic and freon recharge.' }
];

function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [onLoginModalSuccess, setOnLoginModalSuccess] = useState(null);
  
  const navigate = useNavigate();

  // Load from cache on mount
  useEffect(() => {
    const cachedCart = localStorage.getItem('cartData');
    if (cachedCart) {
      try { setCart(JSON.parse(cachedCart)); } catch (e) { console.error('Cart parse err'); }
    }
    const loggedInUser = localStorage.getItem('isLoggedIn');
    if (loggedInUser === 'true') {
      setIsLoggedIn(true);
    }

    // 2 min timer for prompt
    const timer = setTimeout(() => {
      if (!localStorage.getItem('isLoggedIn') && !sessionStorage.getItem('promptShown')) {
        handleRequireLogin(null, "Log in for a better experience!");
        sessionStorage.setItem('promptShown', 'true');
      }
    }, 120000); // 2 mins

    return () => clearTimeout(timer);
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cart));
  }, [cart]);

  // Update localStorage when login state changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const addToCart = (service) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item => item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (serviceId) => {
    setCart(prev => prev.filter(item => item.id !== serviceId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // The central guard function for actions that require/encourage login
  const handleRequireLogin = (successCallback, customMessage) => {
    if (isLoggedIn) {
      if (successCallback) successCallback();
    } else {
      setOnLoginModalSuccess(() => successCallback);
      setShowLoginModal(true);
    }
  };

  const executeLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    if (onLoginModalSuccess) onLoginModalSuccess();
  };

  const skipLogin = () => {
    setShowLoginModal(false);
    if (onLoginModalSuccess) onLoginModalSuccess();
  };

  return (
    <div className="app-container">
      <Navbar cartCount={cart.length} isLoggedIn={isLoggedIn} onLogin={() => setShowLoginModal(true)} onLogout={() => setIsLoggedIn(false)} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home services={servicesData} />} />
          <Route path="/services" element={<Services services={servicesData} />} />
          <Route path="/services/:id" element={<ServiceDetails services={servicesData} addToCart={addToCart} requireLogin={handleRequireLogin} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} requireLogin={handleRequireLogin} />} />
          <Route path="/payment" element={<Payment cart={cart} clearCart={clearCart} />} />
        </Routes>
      </main>

      <Footer />

      {showLoginModal && (
        <LoginPromptModal 
          onLogin={executeLogin} 
          onSkip={skipLogin} 
        />
      )}
    </div>
  );
}

export default App;
