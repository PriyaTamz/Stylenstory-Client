import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiPackage, FiShoppingCart, FiUsers, FiLogOut, FiX } from 'react-icons/fi';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { toast } from 'react-toastify';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { logout } = useAdminAuth();
  const sidebarRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Admin logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  // Close sidebar on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  const navLinks = [
    { to: "/admindash", icon: <FiGrid className="w-5 h-5" />, label: "Dashboard" },
    { to: "/admindash/products", icon: <FiPackage className="w-5 h-5" />, label: "Products" },
    { to: "/admindash/orders", icon: <FiShoppingCart className="w-5 h-5" />, label: "Orders" },
    { to: "/admindash/users", icon: <FiUsers className="w-5 h-5" />, label: "Users" },
  ];

  return (
    <>
      {/* Sidebar Panel */}
      <div
        ref={sidebarRef}
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Top */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/admindash" className="text-2xl font-bold text-white">
              Admin Panel
            </Link>
            <button
              className="text-gray-400 hover:text-white lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center p-3 rounded-lg transition-colors ${
                        isActive ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800 text-gray-300'
                      }`}
                    >
                      {React.cloneElement(link.icon, {
                        className: `w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`,
                      })}
                      <span className="ml-3">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded-lg text-red-400 hover:bg-gray-800 hover:text-red-300"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
