import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  loginConsumer as svcLoginConsumer,
  loginProvider as svcLoginProvider,
  signupConsumer as svcSignupConsumer,
  signupProvider as svcSignupProvider,
  loginWithGoogle as svcLoginWithGoogle,
  logoutUser as svcLogoutUser
} from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Sync logout across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'userRole' && !e.newValue) {
        // userRole was removed from localStorage in another tab
        setUserRole(null);
        setToken(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setRoleLocally = (role, authToken = null) => {
    localStorage.setItem('userRole', role);
    setUserRole(role);
    if (authToken) {
      localStorage.setItem('token', authToken);
      setToken(authToken);
    }
  };

  const loginConsumer = async (email, password) => {
    const res = await svcLoginConsumer(email, password);
    setRoleLocally(res.role, res.token);
    return res;
  };

  const loginProvider = async (email, password) => {
    const res = await svcLoginProvider(email, password);
    setRoleLocally(res.role, res.token);
    return res;
  };

  const signupConsumer = async (email, password, name) => {
    const res = await svcSignupConsumer(email, password, name);
    setRoleLocally(res.role, res.token);
    return res;
  };

  const signupProvider = async (email, password, name) => {
    const res = await svcSignupProvider(email, password, name);
    setRoleLocally(res.role, res.token);
    return res;
  };

  const loginWithGoogle = async (role) => {
    const res = await svcLoginWithGoogle(role);
    setRoleLocally(res.role, res.token);
    return res;
  };

  const mockLogin = (role) => {
    setRoleLocally(role);
  };

  const logout = async () => {
    try {
      await svcLogoutUser();
    } catch (err) {
      console.error("Error logging out", err);
    } finally {
      localStorage.removeItem('userRole');
      localStorage.removeItem('token');
      setUserRole(null);
      setToken(null);
    }
  };

  const value = {
    userRole,
    token,
    loginConsumer,
    loginProvider,
    signupConsumer,
    signupProvider,
    loginWithGoogle,
    mockLogin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
