import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, ProductProvider } from './context';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import AddToCart from './components/cart/AddToCart';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './context/ScrollToTop';
import Auth from './pages/Auth';

const App = () => {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
            {/* Header */}
            <Header />
            
            {/* ScrollToTop */}
            <ScrollToTop/>

            {/* Cart Sidebar */}
            <AddToCart />

            {/* Main Content */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage/>} />
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
};

export default App;