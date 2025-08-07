import axios from 'axios';

const API_BASE_URL = 'https://menstshirtstore-backend.onrender.com/api/user';

// Create an axios instance. 
// 'withCredentials: true' is important if your server uses cookies for session management.
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

// Helper function to set the Authorization header with the JWT token.
// This is used if the token is stored in localStorage and sent as a Bearer token.
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// 1. Register new user
export const registerUser = async (userData) => {
  try {
    // The new API expects firstName, lastName, phone, email, password
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    // Throw a more informative error message from the server response
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// 2. Login user
export const loginUser = async (credentials) => {
  try {
    // The new API expects email and password
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// 3. Forgot Password
export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/forgot-password', { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Forgot password request failed' };
    }
};

// 4. Reset Password
export const resetPassword = async (token, newPassword) => {
    try {
        const response = await api.post(`/reset-password/${token}`, { newPassword });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Password reset failed' };
    }
};

// 5. Check authentication status
export const checkAuthStatus = async () => {
  try {
    // This endpoint should verify the token (sent either as a cookie or Bearer token)
    const response = await api.get('/check-auth');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Authentication check failed' };
  }
};

// 6. Logout user
export const logoutUser = async () => {
  try {
    const response = await api.post('/logout', {});
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Logout failed' };
  }
};

export { setAuthToken };