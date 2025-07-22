import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out md:translate-x-0">
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
  );
};

export default Sidebar;