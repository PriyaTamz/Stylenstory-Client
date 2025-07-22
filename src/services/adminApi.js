import axios from 'axios';

const ADMIN_API_BASE_URL = 'http://localhost:5000/api/admin';

const adminApi = axios.create({
  baseURL: ADMIN_API_BASE_URL,
  withCredentials: true,
});

// Helper function to set admin auth token
const setAdminAuthToken = (token) => {
  if (token) {
    adminApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete adminApi.defaults.headers.common['Authorization'];
  }
};

// Register admin
export const registerAdmin = async (adminData) => {
  try {
    const response = await adminApi.post('/register', adminData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Admin registration failed' };
  }
};

// Admin login
export const loginAdmin = async (credentials) => {
  try {
    const response = await adminApi.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Admin login failed' };
  }
};

// Check admin auth status
export const checkAdminAuthStatus = async () => {
  try {
    const response = await adminApi.get('/check-auth');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Admin authentication check failed' };
  }
};

// Admin logout
export const logoutAdmin = async () => {
  try {
    const response = await adminApi.post('/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Admin logout failed' };
  }
};

export { setAdminAuthToken };