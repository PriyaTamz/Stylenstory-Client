import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiPhone, FiLogOut, FiEdit, FiShoppingBag, FiHeart, FiHome, FiCreditCard } from 'react-icons/fi';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center text-indigo-600 text-2xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{user?.name || 'User'}</h2>
                  <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-1">
                <li>
                  <button className="w-full flex items-center space-x-3 py-3 px-4 text-indigo-600 bg-indigo-50 rounded-lg font-medium">
                    <FiUser className="text-lg opacity-80" />
                    <span>Profile</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center space-x-3 py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition">
                    <FiShoppingBag className="text-lg opacity-80" />
                    <span>Orders</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center space-x-3 py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition">
                    <FiHeart className="text-lg opacity-80" />
                    <span>Wishlist</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center space-x-3 py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition">
                    <FiHome className="text-lg opacity-80" />
                    <span>Addresses</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center space-x-3 py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition">
                    <FiCreditCard className="text-lg opacity-80" />
                    <span>Payment Methods</span>
                  </button>
                </li>
              </ul>
              
              <button
                onClick={logout}
                className="w-full mt-4 flex items-center space-x-3 py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition border border-red-100"
              >
                <FiLogOut className="text-lg opacity-80" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-5">
              <h1 className="text-xl font-semibold text-gray-900">Profile Information</h1>
              <p className="text-sm text-gray-500 mt-1">View and update your personal details</p>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
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
                  
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <FiEdit className="mr-2" />
                    Edit Profile
                  </button>
                </div>
                
                {/* Account Security */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">ACCOUNT SECURITY</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="text-sm font-medium text-blue-800 mb-1">Password</h4>
                      <p className="text-sm text-blue-600 mb-3">Last changed 3 months ago</p>
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        Change Password
                      </button>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                      <h4 className="text-sm font-medium text-yellow-800 mb-1">Two-Factor Authentication</h4>
                      <p className="text-sm text-yellow-600 mb-3">Add an extra layer of security</p>
                      <button className="text-sm font-medium text-yellow-600 hover:text-yellow-800">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity Section */}
          <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-sm font-medium text-gray-900">No recent activity</h3>
                <p className="mt-1 text-sm text-gray-500">Your account activity will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;