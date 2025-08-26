import React from "react";
import { Routes, Route } from "react-router-dom";

// User-facing pages
import HomePage from "./pages/HomePage";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContactPage from "./pages/ContactPage";
import Auth from "./pages/Auth";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import CartPage from "./pages/CartPage";
import ResetPasswordPage from "./pages/ResetPasswordPage"; // <-- IMPORT THE NEW PAGE

// Admin pages and layout
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDash from "./pages/admin/AdminDash";
import AdminProducts from "./pages/admin/ProductsDetails";
import AdminOrders from "./pages/admin/Orders";
import AdminUsers from "./pages/admin/Users";

// Auth wrappers
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProtectedAdminRoute from "./components/auth/ProtectedAdminRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/cart" element={<CartPage />} />
      <Route
        path="/reset-password/:token"
        element={<ResetPasswordPage />}
      />{" "}
      {/* <-- ADD THE RESET PASSWORD ROUTE */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
      
      <Route path="/cart" element={<CartPage step="cart" />} />
      <Route path="/cart/shipping" element={<CartPage step="shipping" />} />
      <Route path="/cart/payment" element={<CartPage step="payment" />} />
      
      {/* Admin Login Route */}
      <Route path="/admin" element={<AdminLogin />} />
      {/* Admin Dashboard Routes */}
      <Route
        path="/admindash"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<AdminDash />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
