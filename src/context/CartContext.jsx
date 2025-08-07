// src/context/CartContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token || !isLoggedIn) {
        setCart([]);
        setIsLoading(false);
        return;
      }

      const response = await axios.get("https://menstshirtstore-backend.onrender.com/api/cart", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const rawCart = response.data.items || [];
      const cartItems = rawCart.map((item) => ({
        ...item.product,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        _id: item.product._id,
      }));

      setCart(cartItems);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      if (error.response?.status === 401) {
        setCart([]);
      } else {
        toast.error("Failed to load cart from server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isLoggedIn, user]);

  const addToCart = async (product, quantity = 1, size, color) => {
    try {
      const response = await axios.post(
        "https://menstshirtstore-backend.onrender.com/api/cart/add",
        {
          productId: product._id,
          quantity,
          size,
          color,
        },
        {
          withCredentials: true,
        }
      );

      await fetchCart();
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Failed to add to cart:", error);

      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "Not authenticated. Please login."
      ) {
        toast.error("Please login to add items to cart.");
        navigate("/auth"); // Redirect to login page
      } else {
        toast.error("Failed to add item to cart.");
      }
    }
  };

  const removeFromCart = async (productId, size, color) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "https://menstshirtstore-backend.onrender.com/api/cart/remove",
        { productId, size, color },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchCart();
      toast.success("Item removed from cart.");
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Failed to remove item from cart.");
    }
  };

  const updateQuantity = async (productId, size, color, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size, color);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        "https://menstshirtstore-backend.onrender.com/api/cart/update",
        { productId, size, color, quantity: newQuantity },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchCart();
      toast.success("Quantity updated successfully");
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete("https://menstshirtstore-backend.onrender.com/api/cart/clear", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart([]);
      toast.success("Cart cleared successfully");
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
