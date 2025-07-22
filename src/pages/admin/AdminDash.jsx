import { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import DashboardCard from '../../components/admin/DashboardCard';
import { FiDollarSign, FiShoppingCart, FiUsers, FiPackage } from 'react-icons/fi';

const AdminDash = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock data for dashboard cards
  const stats = [
    { title: 'Total Revenue', value: '$12,345', icon: <FiDollarSign size={24} />, color: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' },
    { title: 'Total Orders', value: '245', icon: <FiShoppingCart size={24} />, color: 'bg-gradient-to-r from-green-500 to-green-600 text-white' },
    { title: 'Total Customers', value: '1,234', icon: <FiUsers size={24} />, color: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' },
    { title: 'Total Products', value: '56', icon: <FiPackage size={24} />, color: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:ml-64">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back, Admin!</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
          
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
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
                  {[
                    { id: '#12345', customer: 'John Doe', date: '2023-05-15', amount: '$59.99', status: 'Completed' },
                    { id: '#12346', customer: 'Jane Smith', date: '2023-05-14', amount: '$79.98', status: 'Shipped' },
                    { id: '#12347', customer: 'Robert Johnson', date: '2023-05-14', amount: '$39.99', status: 'Processing' },
                    { id: '#12348', customer: 'Emily Davis', date: '2023-05-13', amount: '$99.97', status: 'Completed' },
                    { id: '#12349', customer: 'Michael Brown', date: '2023-05-12', amount: '$29.99', status: 'Cancelled' },
                  ].map((order, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
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
      </div>
    </div>
  );
};

export default AdminDash;