import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>OL</Text>
      </View>
      <DrawerItemList {...props} />
      {!user ? (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.drawerItem}
          >
            <Text style={styles.drawerItemText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.drawerItem}
          >
            <Text style={styles.drawerItemText}>Register</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.drawerItem}
          >
            <Text style={styles.drawerItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              logout();
              navigation.navigate('Home');
            }}
            style={styles.drawerItem}
          >
            <Text style={styles.drawerItemText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Payment')}
            style={styles.drawerItem}
          >
            <Text style={styles.drawerItemText}>Payment</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={styles.drawerItem}
      >
        <Text style={styles.drawerItemText}>{`Cart (${cartItems.length})`}</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const AppDrawer = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Login" component={LoginScreen} />
    <Drawer.Screen name="Register" component={RegisterScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Payment" component={PaymentScreen} />
    <Drawer.Screen name="Cart" component={CartScreen} />
  </Drawer.Navigator>
);

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Icon name="menu" size={24} color="#FFF" />
      </TouchableOpacity>
      <Text style={styles.title}>OL</Text>
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
  drawerHeader: {
    padding: 20,
    backgroundColor: '#000',
  },
  drawerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default AppDrawer;
