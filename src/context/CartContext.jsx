import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, user } = useAuth();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token || !isLoggedIn) {
        setCart([]);
        setIsLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/api/cart", {
        withCredentials: true,
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
  }, [isLoggedIn, user]); // Refetch cart when auth status changes

  const addToCart = async (product, quantity = 1, size, color) => {
    const newCart = [...cart];
    const existingItem = newCart.find(
      (item) =>
        item._id === product._id && item.size === size && item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      newCart.push({ ...product, quantity, size, color });
    }

    setCart(newCart);
    
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: product._id, quantity, size, color },
        { withCredentials: true }
      );
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add item to server cart.");
      fetchCart(); // Revert to server state on error
    }
  };

  const removeFromCart = async (productId, size, color) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/remove",
        { productId, size, color },
        { withCredentials: true }
      );

      setCart((prevCart) =>
        prevCart.filter(
          (item) =>
            !(
              item._id === productId &&
              item.size === size &&
              item.color === color
            )
        )
      );

      toast.error("Item removed from cart.");
    } catch (error) {
      console.error(
        "Failed to remove item:",
        error.response?.data || error.message
      );
      toast.error("Failed to remove item from server.");
      fetchCart(); // Revert to server state on error
    }
  };

  const updateQuantity = async (productId, size, color, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size, color);
      return;
    }

    try {
      await axios.put(
        "http://localhost:5000/api/cart/update",
        { productId, size, color, quantity: newQuantity },
        { withCredentials: true }
      );

      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === productId && item.size === size && item.color === color
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      toast.success("Quantity updated successfully");
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
      fetchCart(); // Revert to server state on error
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);