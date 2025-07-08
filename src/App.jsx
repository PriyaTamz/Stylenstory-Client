import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider, ProductProvider } from './context';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AppRoutes from './AppRoutes';
import AddToCart from './components/cart/AddToCart';
import ScrollToTop from './context/ScrollToTop';

const App = () => {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
              <Header />
              <ScrollToTop />
              <AddToCart />
              <main className="flex-grow">
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
};

export default App;