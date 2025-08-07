import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatus, setAuthToken, logoutUser } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('userData');
      
      if (token) {
        setAuthToken(token);
        try {
          const data = await checkAuthStatus();
          setIsLoggedIn(true);
          
          // Use the user data from localStorage if API doesn't return it
          const userData = data.user ? {
            ...data.user,
            name: `${data.user.firstName} ${data.user.lastName}`
          } : JSON.parse(savedUser);
          
          setUser(userData);
        } catch (error) {
          console.error('Auth verification failed:', error);
          handleFailedAuth();
        }
      } else {
        handleFailedAuth();
      }
      setIsLoading(false);
    };

    const handleFailedAuth = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setAuthToken(null);
      setIsLoggedIn(false);
      setUser(null);
    };

    verifyAuth();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    
    const userWithFullName = {
      ...userData,
      name: `${userData.firstName} ${userData.lastName}`
    };
    
    localStorage.setItem('userData', JSON.stringify(userWithFullName));
    setAuthToken(token);
    setIsLoggedIn(true);
    setUser(userWithFullName);
    toast.success('Logged in successfully!');
  };

  const logout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Logout API error:', error);
      toast.error('Logout failed, but you have been logged out locally.');
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setAuthToken(null);
      setIsLoggedIn(false);
      setUser(null);
      navigate('/auth');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user, 
      isLoading,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}