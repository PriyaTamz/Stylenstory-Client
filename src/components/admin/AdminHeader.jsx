import React from 'react';
import { FiMenu } from 'react-icons/fi';
import logo from "../../assets/stylenstoryimage.png";

const AdminHeader = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Hamburger button */}
          <div className="flex items-center">
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Open sidebar"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo in center or right */}
          <div className="flex items-center justify-center w-full lg:justify-start">
            <img
              src={logo}
              alt="Logo"
              className="h-10 object-contain"
            />
          </div>

        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
