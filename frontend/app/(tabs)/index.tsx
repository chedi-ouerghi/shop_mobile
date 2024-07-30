import React from 'react';
import AppNavigator from '../navigation/AppNavigator';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

const App = () => {
  return (
    
      <AuthProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </AuthProvider>
   
  );
};

export default App;