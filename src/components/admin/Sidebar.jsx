import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAdminAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Admin logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admindash"
                className={`flex items-center p-2 rounded-lg ${location.pathname === '/admindash' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admindash/products"
                className={`flex items-center p-2 rounded-lg ${location.pathname.includes('/products') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <span className="ml-3">Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admindash/orders"
                className={`flex items-center p-2 rounded-lg ${location.pathname.includes('/orders') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <span className="ml-3">Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admindash/users"
                className={`flex items-center p-2 rounded-lg ${location.pathname.includes('/users') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <span className="ml-3">Users</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700 text-red-400 hover:text-red-300 transition-colors"
        >
          <FiLogOut className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;