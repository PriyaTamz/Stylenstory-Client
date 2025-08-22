import axios from 'axios';

// 🔹 Toggle between local and deployed URLs
const LOCAL_API_BASE_URL = "http://localhost:5000/api/admin"; 

const adminApi = axios.create({
  baseURL: LOCAL_API_BASE_URL,
  withCredentials: true,
});

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Session expired or invalid. Forcing logout.');
      localStorage.removeItem('isAdminLoggedIn');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);


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

// Admin logout
export const logoutAdmin = async () => {
  try {
    const response = await adminApi.post('/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Admin logout failed' };
  }
};