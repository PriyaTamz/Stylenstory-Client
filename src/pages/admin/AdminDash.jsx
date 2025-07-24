import React from 'react';
import DashboardCard from '../../components/admin/DashboardCard';
import { FiDollarSign, FiShoppingCart, FiUsers, FiPackage } from 'react-icons/fi';

const AdminDash = () => {
  // Mock data for dashboard cards
  const stats = [
    { title: 'Total Revenue', value: '$12,345', icon: <FiDollarSign size={24} />, color: 'from-blue-500 to-blue-600' },
    { title: 'Total Orders', value: '245', icon: <FiShoppingCart size={24} />, color: 'from-green-500 to-green-600' },
    { title: 'Total Customers', value: '1,234', icon: <FiUsers size={24} />, color: 'from-purple-500 to-purple-600' },
    { title: 'Total Products', value: '56', icon: <FiPackage size={24} />, color: 'from-orange-500 to-orange-600' },
  ];
  
  const recentOrders = [
    { id: '#12345', customer: 'John Doe', date: '2023-05-15', amount: '$59.99', status: 'Completed' },
    { id: '#12346', customer: 'Jane Smith', date: '2023-05-14', amount: '$79.98', status: 'Shipped' },
    { id: '#12347', customer: 'Robert Johnson', date: '2023-05-14', amount: '$39.99', status: 'Processing' },
    { id: '#12348', customer: 'Emily Davis', date: '2023-05-13', amount: '$99.97', status: 'Completed' },
    { id: '#12349', customer: 'Michael Brown', date: '2023-05-12', amount: '$29.99', status: 'Cancelled' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Admin! Here's what's happening.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
      
      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;