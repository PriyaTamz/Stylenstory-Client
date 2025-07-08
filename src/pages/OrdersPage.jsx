import React from 'react';
import { useAuth } from '../context/AuthContext';

const OrdersPage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">
          {user?.name ? `${user.name}'s order history will appear here` : 'Your order history will appear here'}
        </p>
      </div>
    </div>
  );
};

export default OrdersPage;