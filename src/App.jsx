import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar/Navbar';
import Footer from './components/Layout/Footer/Footer';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import CategoryProviders from './pages/CategoryProviders/CategoryProviders';
import ProviderDetails from './pages/ProviderDetails/ProviderDetails';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ProviderRegister from './pages/Provider/ProviderRegister';
import ProviderDashboard from './pages/Provider/ProviderDashboard';

// Seed Providers Data
const seedProviders = [
  {
    id: 1,
    name: "Alex's Auto Care",
    rating: 4.8,
    reviews: 124,
    level: "Expert",
    services: [
      { id: 101, title: 'Premium Car Wash', category: 'Car Wash', price: 49.99, description: 'Complete interior and exterior detailing.' },
      { id: 102, title: 'Express Car Wash', category: 'Car Wash', price: 29.99, description: 'Quick exterior wash and tire shine.' }
    ]
  },
  {
    id: 2,
    name: "CoolBreeze AC repair",
    rating: 4.5,
    reviews: 89,
    level: "Pro",
    services: [
      { id: 201, title: 'AC Deep Cleaning', category: 'AC Service', price: 79.99, description: 'Full service including coil and filter cleaning.' },
      { id: 202, title: 'AC Repair & Gas Refill', category: 'AC Service', price: 149.99, description: 'Diagnostic and freon recharge.' }
    ]
  },
  {
    id: 3,
    name: "Fresh Home Cleaning",
    rating: 4.2,
    reviews: 45,
    level: "Pro",
    services: [
      { id: 301, title: 'Basic Home Cleaning', category: 'Home Cleaning', price: 99.99, description: 'Standard cleaning of all rooms.' }
    ]
  },
  {
    id: 4,
    name: "Mike (New Provider)",
    rating: 0,
    reviews: 0,
    level: "Beginner",
    services: [
      { id: 401, title: 'Basic Car Wash', category: 'Car Wash', price: 15.99, description: 'Starter external wash. Low price to build reputation!' },
      { id: 402, title: 'Basic Home Cleaning', category: 'Home Cleaning', price: 45.00, description: 'Affordable house keeping' }
    ]
  }
];

function App() {
  const [providers, setProviders] = useState(seedProviders);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProvider, setIsProvider] = useState(false); // To toggle provider capabilities
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
      const isProv = localStorage.getItem('isProvider');
      if(isProv === 'true') setIsProvider(true);
    }
    const cachedProviders = localStorage.getItem('providersData');
    if(cachedProviders) {
      try { setProviders(JSON.parse(cachedProviders)); } catch(e) {}
    } else {
      localStorage.setItem('providersData', JSON.stringify(seedProviders));
    }
  }, []);

  // Update localStorage when state changes
  useEffect(() => localStorage.setItem('cartData', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('isLoggedIn', isLoggedIn), [isLoggedIn]);
  useEffect(() => localStorage.setItem('isProvider', isProvider), [isProvider]);
  useEffect(() => localStorage.setItem('providersData', JSON.stringify(providers)), [providers]);

  const addToCart = (serviceItem, provider) => {
    setCart((prev) => {
      // Cart items are identified by a composite ID (provider.id + service.id)
      const uniqueId = `${provider.id}-${serviceItem.id}`;
      const existing = prev.find(item => item.uniqueId === uniqueId);
      if (existing) {
        return prev.map(item => item.uniqueId === uniqueId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...serviceItem, uniqueId, providerId: provider.id, providerName: provider.name, quantity: 1 }];
    });
  };

  const removeFromCart = (uniqueId) => {
    setCart(prev => prev.filter(item => item.uniqueId !== uniqueId));
  };

  const clearCart = () => setCart([]);

  const requireLogin = (successCallback) => {
    if (isLoggedIn) {
      if (successCallback) successCallback();
    } else {
      navigate('/login');
    }
  };

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProvider(false);
    navigate('/');
  };

  const handleProviderRegister = (newProviderData) => {
    // Generate a pseudo-auth registration
    setIsLoggedIn(true);
    setIsProvider(true);
    const newProvider = {
      id: Date.now(),
      name: newProviderData.name,
      rating: 0,
      reviews: 0,
      level: "Beginner", // All start at beginner
      services: []
    };
    setProviders(prev => [...prev, newProvider]);
    navigate('/provider/dashboard');
  };

  const addServiceAsProvider = (serviceDetails) => {
    // Assumes the currently logged in provider is the LAST one registered (simplification for prototype)
    setProviders(prev => {
      const updated = [...prev];
      const myProfile = updated[updated.length - 1]; // Mocking "My Profile"
      myProfile.services.push({
        id: Date.now(),
        ...serviceDetails
      });
      return updated;
    });
  };

  return (
    <div className="app-container">
      <Navbar 
        cartCount={cart.length} 
        isLoggedIn={isLoggedIn} 
        isProvider={isProvider}
        onLogin={() => navigate('/login')} 
        onLogout={handleLogout} 
      />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home providers={providers} />} />
          
          <Route path="/services" element={<Services providers={providers} />} />
          <Route path="/category/:categoryName" element={<CategoryProviders providers={providers} />} />
          <Route path="/provider/:id" element={<ProviderDetails providers={providers} addToCart={addToCart} requireLogin={requireLogin} />} />
          
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} requireLogin={requireLogin} />} />
          <Route path="/payment" element={<Payment cart={cart} clearCart={clearCart} isLoggedIn={isLoggedIn} />} />
          
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/provider/register" element={<ProviderRegister onRegister={handleProviderRegister} />} />
          <Route path="/provider/dashboard" element={<ProviderDashboard providers={providers} onAddService={addServiceAsProvider} requireLogin={requireLogin} isProvider={isProvider}/>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
