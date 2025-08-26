import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiLogIn,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/stylenstoryimage.png";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  // --- CHANGE 1: Remove setCartOpen from the hook ---
  const { cartCount } = useCart();
  const { isLoggedIn, user, logout, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = () => {
    navigate("/auth");
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm py-3">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Stylenstore Logo" className="h-10" />
              </Link>
            </div>
            <div className="animate-pulse h-8 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/95 backdrop-blur-sm py-3"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="md:hidden mr-3 p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Stylenstore Logo"
                className={`transition-all duration-300 ${
                  scrolled ? "h-12" : "h-10"
                }`}
              />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-4 lg:space-x-6">
            {[
              { path: "/", name: "Home" },
              { path: "/products", name: "Shop" },
              { path: "/about", name: "About" },
              { path: "/contact", name: "Contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-3 py-2 text-gray-700 hover:text-[#214b84] font-medium transition-colors group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#214b84] transition-all group-hover:w-4/5"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative" ref={dropdownRef}>
              {isLoggedIn ? (
                <>
                  <button
                    className="p-2 rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors flex items-center"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    aria-expanded={userDropdownOpen}
                    aria-label="User menu"
                  >
                    <FiUser size={20} />
                    <span className="ml-1 hidden sm:inline">
                      {userDropdownOpen ? (
                        <FiChevronUp size={16} />
                      ) : (
                        <FiChevronDown size={16} />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <FiLogOut className="mr-2" /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-[#214b84] border border-blue-600 rounded-md hover:bg-[#214b84] hover:text-white transition-colors flex items-center text-sm sm:text-base"
                >
                  <FiLogIn className="mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Login</span>
                </button>
              )}
            </div>

            {/* --- CHANGE 2 & 3: Converted button to Link, removed onClick --- */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group"
              aria-label={`Cart (${cartCount} items)`}
            >
              <FiShoppingCart
                size={20}
                className="text-gray-700 group-hover:text-blue-600 transition-colors"
              />
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden overflow-hidden"
            >
              <motion.nav className="flex flex-col space-y-1 py-2">
                {[
                  { path: "/", name: "Home" },
                  { path: "/products", name: "Shop" },
                  { path: "/about", name: "About" },
                  { path: "/contact", name: "Contact" },
                ].map((link) => (
                  <motion.div key={link.path} variants={itemVariants}>
                    <Link
                      to={link.path}
                      className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  variants={itemVariants}
                  className="border-t pt-2 mt-1"
                >
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-2 text-sm font-medium text-gray-700">
                        Hi, {user?.name || "User"}
                      </div>
                      <Link
                        to="/profile"
                        className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FiUser className="mr-3" /> Profile
                      </Link>
                       <Link
                        to="/orders"
                        className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FiShoppingCart className="mr-3" /> Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors flex items-center"
                      >
                        <FiLogOut className="mr-3" /> Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="w-full text-left py-3 px-4 text-blue-600 hover:bg-blue-50 rounded-md transition-colors flex items-center"
                    >
                      <FiLogIn className="mr-3" /> Login
                    </button>
                  )}
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;