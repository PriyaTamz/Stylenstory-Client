import React, { useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Replace with your actual login API call
    toast.success('Admin logged in successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <FiUser className="text-gray-400 mr-2" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <FiLock className="text-gray-400 mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <FiLock className="text-gray-400 mr-2" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
