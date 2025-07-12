import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/user';

// Create axios instance with default credentials
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This ensures cookies are sent with all requests
});

// Helper function to set auth token
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData, {
      withCredentials: true // Explicitly set for registration
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// Verify OTP for registration
export const verifyRegisterOtp = async (otpData) => {
  try {
    const response = await api.post('/verify-otp', otpData, {
      withCredentials: true // Needed for session cookies
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'OTP verification failed' };
  }
};

// Request OTP for login
export const requestLoginOtp = async (phone) => {
  try {
    const response = await api.post('/request-otp', { phone }, {
      withCredentials: true // For session tracking
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to send OTP' };
  }
};

// Verify OTP for login
export const verifyLoginOtp = async (otpData) => {
  try {
    const response = await api.post('/verify-otp', otpData, {
      withCredentials: true // For session cookies
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'OTP verification failed' };
  }
};

// Check authentication status
export const checkAuthStatus = async () => {
  try {
    const response = await api.get('/check-auth', {
      withCredentials: true // Required for auth check
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Authentication check failed' };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await api.post('/logout', {}, {
      withCredentials: true // Needed to clear session cookies
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Logout failed' };
  }
};

export { setAuthToken };