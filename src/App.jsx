import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { CartProvider, ProductProvider } from './context';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AppRoutes from './AppRoutes';
// import AddToCart from './components/cart/AddToCart'; // <-- REMOVE THIS IMPORT
import ScrollToTop from './context/ScrollToTop';
import { setAuthToken } from './services/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Initialize auth token if it exists (for regular users)
const token = localStorage.getItem('authToken');
if (token) {
  setAuthToken(token);
}

const Layout = () => {
  const location = useLocation();
  const isFullPage = location.pathname.startsWith('/auth') || location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 font-sans">
      {!isFullPage && <Header />}
      {!isFullPage && <ScrollToTop />}
      {/* {!isFullPage && <AddToCart />} <-- REMOVE THIS COMPONENT */}

      <main className="flex-grow">
        <AppRoutes />
      </main>

      {!isFullPage && <Footer />}
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>
            <AdminAuthProvider>
              <Layout />
            </AdminAuthProvider>
          </AuthProvider>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
};

export default App;