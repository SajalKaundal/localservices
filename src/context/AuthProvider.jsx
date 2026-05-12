import React, { useState, useEffect } from "react";
import {
  loginConsumer as svcLoginConsumer,
  loginProvider as svcLoginProvider,
  signupConsumer as svcSignupConsumer,
  signupProvider as svcSignupProvider,
  loginWithGoogle as svcLoginWithGoogle,
  logoutUser as svcLogoutUser,
} from "../services/authService";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL;
export const AuthProvider = ({ children }) => {
  // console.log(children)
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync auth state with Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const idToken = await user.getIdToken();
        setToken(idToken);
        localStorage.setItem("token", idToken);
        // await getUser(idToken);
      } else {
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        if (!localStorage.getItem("userRole")) {
          setUserRole(null);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync logout across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "userRole" && !e.newValue) {
        // userRole was removed from localStorage in another tab
        setUserRole(null);
        setToken(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const setRoleLocally = (role) => {
    localStorage.setItem("userRole", role);
    setUserRole(role);
  };

  const loginConsumer = async (email, password) => {
    const res = await svcLoginConsumer(email, password);
    setRoleLocally(res.role);
    setToken(res.token);
    return res;
  };

  const loginProvider = async (email, password) => {
    const res = await svcLoginProvider(email, password);
    setRoleLocally(res.role);
    setToken(res.token);
    return res;
  };

  const signupConsumer = async (email, password, name) => {
    const res = await svcSignupConsumer(email, password, name);
    setRoleLocally(res.role);
    setToken(res.token);
    return res;
  };

  const signupProvider = async (email, password, name) => {
    const res = await svcSignupProvider(email, password, name);
    setRoleLocally(res.role);
    setToken(res.token);
    return res;
  };

  const loginWithGoogle = async (role) => {
    const res = await svcLoginWithGoogle(role);
    setRoleLocally(res.role);
    setToken(res.token);
    return res;
  };

  const logout = async () => {
    try {
      await svcLogoutUser();
    } catch (err) {
      console.error("Error logging out", err);
    } finally {
      localStorage.removeItem("userRole");
      localStorage.removeItem("token");
      setUserRole(null);
      setToken(null);
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    userRole,
    token,
    isAuthenticated: !!currentUser || !!token,
    isLoading,
    loginConsumer,
    loginProvider,
    signupConsumer,
    signupProvider,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
