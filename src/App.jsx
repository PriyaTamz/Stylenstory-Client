import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { CartProvider, ProductProvider } from './context';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AppRoutes from './AppRoutes';
import AddToCart from './components/cart/AddToCart';
import ScrollToTop from './context/ScrollToTop';
import { setAuthToken } from './services/api';

// Initialize auth token if exists
const token = localStorage.getItem('authToken');
if (token) {
  setAuthToken(token);
}

const Layout = () => {
  const location = useLocation();

  // List of full-page routes
  const fullPageRoutes = ['/auth','/admin','/admindash', '/admindash/products', '/admindash/orders', '/admindash/users'];

  const isFullPage = fullPageRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {!isFullPage && <Header />}
      {!isFullPage && <ScrollToTop />}
      {!isFullPage && <AddToCart />}

      <main className="flex-grow">
        <AppRoutes />
      </main>

      {!isFullPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>
            <Layout />
          </AuthProvider>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
};

export default App;