import React, { useState } from 'react';
import { FiUser, FiLock, FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [errorShown, setErrorShown] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Clear any existing toasts and reset error flag
    toast.dismiss();
    setErrorShown(false);

    if (!username.trim()) {
      toast.error('Username is required', {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (!password) {
      toast.error('Password is required', {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await login({ username, password });
      
     
      
      setTimeout(() => navigate('/admindash'), 2000);
      
    } catch (error) {
      console.error('Login error:', error);
      
      if (!errorShown) {
        // Use consistent error message format
        let errorMessage = 'Login failed. Invalid credentials or not an admin.';
        
        if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        
        
        setErrorShown(true);
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Portal</h2>
          <p className="text-gray-600">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FiUser className="text-gray-400 mr-2" />
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorShown(false); // Reset error flag when user types
                }}
                placeholder="Enter admin username"
                className="w-full outline-none bg-transparent"
                autoFocus
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorShown(false); // Reset error flag when user types
                }}
                placeholder="Enter your password"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium transition-colors`}
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Authenticating...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;