import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const UserTable = ({ users, onDelete }) => {
   const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        onDelete(userId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
       <div className="p-4 sm:p-6 border-b">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">All Users</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Address</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt={user.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className={`text-sm font-semibold ${user.role === 'Admin' ? 'text-indigo-600' : 'text-gray-500'}`}>{user.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-900">{user.email}</div>
                  <div className="text-sm text-gray-500">{user.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                  {user.address.street}, {user.address.city}, {user.address.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 p-2"><FiEdit className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900 p-2 ml-2">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;