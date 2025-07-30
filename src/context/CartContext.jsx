import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          withCredentials: true,
        });

        //console.log("Fetched cart from server:", response.data);

        const rawCart = response.data.items || []; // safely get array
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
        toast.error("Failed to load cart from server.");
      }
    };

    fetchCart();
  }, []);

  const addToCart = (product, quantity = 1, size, color) => {
    setCart((prevCart) => {
      const validCart = Array.isArray(prevCart) ? prevCart : [];

      const existingItem = validCart.find(
        (item) =>
          item._id === product._id && item.size === size && item.color === color
      );

      if (existingItem) {
        return validCart.map((item) =>
          item._id === product._id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...validCart, { ...product, quantity, size, color }];
    });

    toast.success(`${product.title} added to cart!`);
  };

  const removeFromCart = async (productId, size, color) => {
    try {
      // ✅ Use POST instead of DELETE and send body
      await axios.post(
        "http://localhost:5000/api/cart/remove",
        { productId, size },
        { withCredentials: true }
      );

      // ✅ Update local state
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
    }
  };

  const updateQuantity = async (productId, size, color, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size, color);
      return;
    }

    try {
      // 1. Send request to backend
      await axios.put(
        "http://localhost:5000/api/cart/update",
        { productId, size, color, quantity: newQuantity },
        { withCredentials: true }
      );

      // 2. Update local cart state
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
    }
  };

  const cartTotal = Array.isArray(cart)
    ? cart.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  const cartCount = Array.isArray(cart)
    ? cart.reduce((count, item) => count + item.quantity, 0)
    : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        // cartOpen,      // <-- REMOVE
        // setCartOpen    // <-- REMOVE
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
