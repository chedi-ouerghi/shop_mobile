import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import { globalStyles } from '../styles/globalStyles';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const PaymentScreen = ({ route, navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cart, setCart] = useState(route.params?.cart || []);
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getToken();
  }, []);

  const handlePayment = async () => {
    if (!token) {
      navigation.navigate('Login', { fromPayment: true });
      return;
    }

    try {
      const productIds = cart.map(item => item.id);
      const response = await axios.post('http://localhost:5452/achat/add', {
        idproduct: productIds,
        iduser: JSON.parse(await AsyncStorage.getItem('user')).id,
        valideachat: true
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        await AsyncStorage.removeItem('cartItems');
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Succès',
          text2: 'Paiement effectué avec succès.',
        });
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erreur',
        text2: 'Erreur lors du paiement. Veuillez réessayer.',
      });
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
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
