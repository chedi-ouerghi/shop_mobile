import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const savedCartItems = await AsyncStorage.getItem('cartItems');
        if (savedCartItems) {
          const items = JSON.parse(savedCartItems);
          setCartItems(items);
          setCartCount(items.length);
          console.log('Cart data loaded:', items);
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };

    loadCartData();
  }, []);

  useEffect(() => {
    const saveCartData = async () => {
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log('Cart data saved:', cartItems);
      } catch (error) {
        console.error('Error saving cart data:', error);
      }
    };

    saveCartData();
  }, [cartItems]);

  const addToCart = (item) => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
    setCartCount(updatedCartItems.length);
    console.log('Added to cart:', item);
  };

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
    setCartCount(updatedCartItems.length);
    console.log('Removed from cart:', item);
  };

const clearCart = async () => {
  setCartItems([]);
  setCartCount(0);
  await AsyncStorage.removeItem('cartItems');
  console.log('Cart cleared');
};


  return (
    <CartContext.Provider value={{ cartCount, cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
