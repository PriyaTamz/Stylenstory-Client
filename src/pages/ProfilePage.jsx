import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Account Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {user?.name || 'Not provided'}</p>
            <p><span className="font-medium">Email:</span> {user?.email || 'Not provided'}</p>
            <p><span className="font-medium">Phone:</span> {user?.phone || 'Not provided'}</p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;