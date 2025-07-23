import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, logoutAdmin, checkAdminAuthStatus } from '../services/adminApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authData = await checkAdminAuthStatus();
        if (authData.isAuthenticated) {
          setAdmin(authData.admin);
          setIsAdminAuthenticated(true);
        }
      } catch (error) {
        console.error('Admin auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const { admin, message } = await loginAdmin(credentials);
      setAdmin(admin);
      setIsAdminAuthenticated(true);
      toast.success(message);
      navigate('/admindash');
    } catch (error) {
      toast.error(error.message || 'Admin login failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutAdmin();
      setAdmin(null);
      setIsAdminAuthenticated(false);
      navigate('/admin');
    } catch (error) {
      toast.error(error.message || 'Admin logout failed');
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