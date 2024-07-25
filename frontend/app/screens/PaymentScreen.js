import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { globalStyles } from '../styles/globalStyles';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = ({ route, navigation }) => {
  const { user } = useAuth();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cart, setCart] = useState(route.params?.cart || []);

  const handlePayment = async () => {
    if (!user) {
      navigation.navigate('Login', { fromPayment: true });
      return;
    }

    try {
      const productIds = cart.map(item => item.id);
      const response = await axios.post('http://localhost:5452/achat/add', {
        idproduct: productIds,
        iduser: user.id,
        valideachat: true
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });

      if (response.status === 200) {
        await AsyncStorage.removeItem('cartItems'); // Vider le panier après paiement
        Alert.alert('Succès', 'Paiement effectué avec succès.');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      Alert.alert('Erreur', 'Erreur lors du paiement. Veuillez réessayer.');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Paiement</Text>
      <View style={styles.form}>
        <TextInput
          style={[globalStyles.input, styles.input]}
          placeholder="Numéro de carte"
          onChangeText={setCardNumber}
          value={cardNumber}
          inputMode="numeric"
          editable={false}
        />
        <TextInput
          style={[globalStyles.input, styles.input]}
          placeholder="Date d'expiration (MM/AA)"
          onChangeText={setExpiryDate}
          value={expiryDate}
          inputMode="numeric"
          editable={false}
        />
        <TextInput
          style={[globalStyles.input, styles.input]}
          placeholder="CVV"
          onChangeText={setCvv}
          value={cvv}
          secureTextEntry
          inputMode="numeric"
          editable={false}
        />
        <Text style={styles.info}>Montant à payer : {cart.reduce((total, item) => total + item.prix, 0)} ETH</Text>
        <Button title="Payer maintenant" onPress={handlePayment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    marginVertical: 20,
  },
});

export default PaymentScreen;
