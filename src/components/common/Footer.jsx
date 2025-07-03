import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">T-Shirt Store</h3>
            <p className="text-gray-400">
              Your one-stop shop for premium quality t-shirts.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-white">All Products</Link></li>
              <li><Link to="/products?category=classic" className="text-gray-400 hover:text-white">Classic Tees</Link></li>
              <li><Link to="/products?category=graphic" className="text-gray-400 hover:text-white">Graphic Tees</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Shipping Policy</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">Returns & Exchanges</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} T-Shirt Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;