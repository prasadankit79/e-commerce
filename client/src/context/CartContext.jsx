import React, { createContext, useContext, useState } from 'react';

// Create a new Context
const CartContext = createContext();

// Custom Hook
export const useCart = () => useContext(CartContext);

// Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (flower) => {
    const alreadyInCart = cartItems.find((item) => item.id === flower.id);
    if (!alreadyInCart) {
      setCartItems([...cartItems, { ...flower, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
