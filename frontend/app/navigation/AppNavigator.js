import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AlcoholList from '../screens/AlcoholList';
import CategorieScreen from '../screens/CategorieScreen';
import AlcoholDetailsScreen from '../screens/AlcoholDetailsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CartScreen from '../screens/CartScreen';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ErrorModal from '../components/ErrorModal'; // Importer le modal

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const checkServerStatus = async () => {
    try {
      await axios.get('http://localhost:5452/alcool');
    } catch (error) {
      setErrorMessage('Le serveur ne répond pas. Veuillez réessayer plus tard.');
      setModalVisible(true);
    }
  };

  useEffect(() => {
    checkServerStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            display: 'none',
          },
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Alcohol" component={AlcoholList} />
        <Tab.Screen name="Categorie" component={CategorieScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Register" component={RegisterScreen} />
        <Tab.Screen name="AlcoholDetails" component={AlcoholDetailsScreen} />
        <Tab.Screen name="Payment" component={PaymentScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
      <Footer />
      <ErrorModal
        visible={modalVisible}
        message={errorMessage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator;