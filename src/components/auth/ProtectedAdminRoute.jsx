import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const ProtectedAdminRoute = ({ children }) => {
  // REMOVED: We no longer need the 'loading' state from the context here.
  const { isAdminAuthenticated } = useAdminAuth();
  const location = useLocation();

  // REMOVED: The loading spinner block is no longer needed because auth state
  // is determined synchronously from localStorage on page load.
  /*
  if (loading) {
    return <div className="flex justify-center items-center h-screen">...</div>;
  }
  */

  if (!isAdminAuthenticated) {
    // If not authenticated, redirect to the admin login page.
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  // If authenticated, render the child components (the admin dashboard).
  return children;
};

export default ProtectedAdminRoute;