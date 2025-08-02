import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { CartProvider, ProductProvider } from './context';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AddressProvider } from './context/AddressContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AppRoutes from './AppRoutes';
import ScrollToTop from './context/ScrollToTop';
import { setAuthToken } from './services/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem('authToken');
if (token) {
  setAuthToken(token);
}

const Layout = () => {
  const location = useLocation();
  const isFullPage = location.pathname.startsWith('/auth') || location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
      {!isFullPage && <Header />}
      {!isFullPage && <ScrollToTop />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {!isFullPage && <Footer />}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <AdminAuthProvider>
              <AddressProvider> 
                <Layout />
              </AddressProvider>
            </AdminAuthProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;