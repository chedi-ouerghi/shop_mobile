import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCart } from '../context/CartContext'; 

const Navbar = () => {
  const navigation = useNavigation();
  const { cartCount } = useCart(); 

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.navbar}>


      <TouchableOpacity onPress={() => handleNavigation('Home')}>
        <Text style={styles.title}>OL</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigation('Alcohol')}>
        <Text style={styles.title}>List</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigation('Login')}>
        <Text style={styles.title}>Login</Text>
      </TouchableOpacity>

      {/* Icône de panier avec badge */}
      <TouchableOpacity onPress={() => handleNavigation('Cart')} style={styles.cartButton}>
        <Icon name="shopping-cart" size={24} color="#FFF" />
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}>
        <Icon name="menu" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#000',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 10,
  },
  cartButton: {
    position: 'relative',
    padding: 10,
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Navbar;