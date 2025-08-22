import { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../../components/admin/UserTable';
import authServices from '../../service/authService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await authServices.getAllUsersData();

      if (res.data.success) {
        const formattedUsers = res.data.users.map((user) => ({
          id: user._id,
          name: user?.addresses?.[0]?.fullName || "No Name",
          email: user.email,
          phone: user.phone,
          role: "Customer",
          address: {
            street: user?.addresses?.[0]?.address || "-",
            city: user?.addresses?.[0]?.city || "-",
            state: user?.addresses?.[0]?.state || "-",
            zip: user?.addresses?.[0]?.pincode || "-",
          },
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`, // dynamic placeholder
        }));
        setUsers(formattedUsers);
      } else {
        console.error("Failed to load users:", res.data.message);
      }
    } catch (err) {
      console.error("Error fetching users:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
      // You can also add an API call to delete the user here if needed
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading users...</div>
      ) : (
        <UserTable users={users} onDelete={handleDeleteUser} />
      )}
    </>
  );
};

export default Users;
