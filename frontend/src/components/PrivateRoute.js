import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/blog/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
