import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactPage from './pages/ContactPage';
import Auth from './pages/Auth';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDash from './pages/admin/AdminDash';
import AdminProducts from './pages/admin/ProductsDetails';
import AdminOrders from './pages/admin/Orders'; 
import AdminUsers from './pages/admin/Users';
import ProtectedAdminRoute from './components/auth/ProtectedAdminRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFoundPage />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admindash" element={
        <ProtectedAdminRoute>
          <AdminDash />
        </ProtectedAdminRoute>
      } />
      <Route path="/admindash/products" element={
        <ProtectedAdminRoute>
          <AdminProducts />
        </ProtectedAdminRoute>
      } />
      <Route path="/admindash/orders" element={
        <ProtectedAdminRoute>
          <AdminOrders />
        </ProtectedAdminRoute>
      } />
      <Route path="/admindash/users" element={
        <ProtectedAdminRoute>
          <AdminUsers />
        </ProtectedAdminRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;