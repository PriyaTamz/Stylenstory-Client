import axios from 'axios';

const ADMIN_API_BASE_URL = 'https://menstshirtstore-backend.onrender.com/api/admin';

const adminApi = axios.create({
  baseURL: ADMIN_API_BASE_URL,
  withCredentials: true,
});

// ADDED: Axios interceptor to handle auth errors globally
// This is our "safety net" now that we aren't checking auth on page load.
adminApi.interceptors.response.use(
  // If the response is successful, just return it
  (response) => response,
  // If there's an error...
  (error) => {
    // Check if the error is a 401 Unauthorized
    if (error.response && error.response.status === 401) {
      console.log('Session expired or invalid. Forcing logout.');
      // Remove the local storage flag
      localStorage.removeItem('isAdminLoggedIn');
      // Force a redirect to the admin login page.
      // Using window.location.href ensures a full page reload, clearing all state.
      window.location.href = '/admin';
    }
    // For all other errors, just pass them along
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

// REMOVED: The checkAdminAuthStatus function is no longer needed.
/*
export const checkAdminAuthStatus = async () => {
  // ...
};
*/

// Admin logout
export const logoutAdmin = async () => {
  try {
    const response = await adminApi.post('/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Admin logout failed' };
  }
};