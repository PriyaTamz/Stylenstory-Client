import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// REMOVED: checkAdminAuthStatus is no longer imported
import { loginAdmin, logoutAdmin } from '../services/adminApi';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  // CHANGED: Initialize state directly from localStorage. This is now the only source of truth on load.
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() =>
    localStorage.getItem('isAdminLoggedIn') === 'true'
  );
  // CHANGED: Loading is false by default as there's no initial async check.
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // REMOVED: The entire useEffect for checking auth status is gone.
  // Our axios interceptor in adminApi.js now handles expired sessions.

  const login = async (credentials) => {
    try {
      // We set admin data here, but it's optional if you don't need the admin's name/email in the UI
      const { admin, message } = await loginAdmin(credentials);
      setAdmin(admin); 
      setIsAdminAuthenticated(true);
      // Set the flag in localStorage which persists the login across reloads
      localStorage.setItem('isAdminLoggedIn', 'true');
      toast.success(message || 'Login successful!');
      navigate('/admindash');
    } catch (error) {
      localStorage.removeItem('isAdminLoggedIn');
      toast.error(error.message || 'Admin login failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutAdmin();
      toast.info('You have been logged out.');
    } catch (error) {
      // Log the error but proceed with client-side logout anyway
      console.error('Server logout failed, but logging out on client:', error);
    } finally {
      setAdmin(null);
      setIsAdminAuthenticated(false);
      // Always remove the flag from localStorage on logout
      localStorage.removeItem('isAdminLoggedIn');
      navigate('/admin');
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAdminAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);