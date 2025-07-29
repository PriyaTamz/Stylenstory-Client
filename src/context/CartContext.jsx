import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // const [cartOpen, setCartOpen] = useState(false); // <-- REMOVE THIS STATE

  const addToCart = (product, quantity = 1, size, color) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item._id === product._id && item.size === size && item.color === color
      );

      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity, size, color }];
    });
    toast.success(`${product.title} added to cart!`);
    // setCartOpen(true); // <-- REMOVE THIS
  };

  const removeFromCart = (productId, size, color) => {
    setCart(prevCart =>
      prevCart.filter(
        item => !(item._id === productId && item.size === size && item.color === color)
      )
    );
    toast.error("Item removed from cart.");
  };

  const updateQuantity = (productId, size, color, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size, color);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId && item.size === size && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

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