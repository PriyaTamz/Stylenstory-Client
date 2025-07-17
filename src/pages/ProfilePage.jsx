import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiPhone, FiEdit } from 'react-icons/fi';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-5">
          <h1 className="text-xl font-semibold text-gray-900">Profile Information</h1>
          <p className="text-sm text-gray-500 mt-1">View and update your personal details</p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">PERSONAL INFORMATION</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                    <FiUser className="text-gray-400 mr-3" />
                    <span className="text-gray-900">{user?.name || 'Not provided'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                    <FiMail className="text-gray-400 mr-3" />
                    <span className="text-gray-900">{user?.email || 'Not provided'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                    <FiPhone className="text-gray-400 mr-3" />
                    <span className="text-gray-900">{user?.phone || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
