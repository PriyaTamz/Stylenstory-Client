import { useState } from 'react';
import UserTable from '../../components/admin/UserTable';

const Users = () => {
  // Mock user data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(123) 456-7890', role: 'Customer', address: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001' }, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(234) 567-8901', role: 'Customer', address: { street: '456 Oak Ave', city: 'Los Angeles', state: 'CA', zip: '90001' }, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '(345) 678-9012', role: 'Admin', address: { street: '789 Pine Rd', city: 'Chicago', state: 'IL', zip: '60601' }, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '(456) 789-0123', role: 'Customer', address: { street: '101 Elm St', city: 'Houston', state: 'TX', zip: '77001' }, avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', phone: '(567) 890-1234', role: 'Customer', address: { street: '202 Maple Dr', city: 'Phoenix', state: 'AZ', zip: '85001' }, avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
  ]);

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  return <UserTable users={users} onDelete={handleDeleteUser} />;
};

export default Users;