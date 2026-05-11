import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRole }) => {
  const { userRole, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--color-void)' }}>
        <p style={{ color: 'var(--color-shade-50)' }}>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    // If authenticated but wrong role, redirect to their respective dashboard
    return <Navigate to={userRole === 'provider' ? '/provider/dashboard' : '/consumer/dashboard'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
