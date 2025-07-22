import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, logoutAdmin, checkAdminAuthStatus, setAdminAuthToken } from '../services/adminApi';
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
        const token = localStorage.getItem('adminAuthToken');
        if (token) {
          setAdminAuthToken(token);
          const { admin } = await checkAdminAuthStatus();
          setAdmin(admin);
          setIsAdminAuthenticated(true);
        }
      } catch (error) {
        console.error('Admin auth check failed:', error);
        localStorage.removeItem('adminAuthToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const { token, admin, message } = await loginAdmin(credentials);
      localStorage.setItem('adminAuthToken', token);
      setAdminAuthToken(token);
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
      localStorage.removeItem('adminAuthToken');
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