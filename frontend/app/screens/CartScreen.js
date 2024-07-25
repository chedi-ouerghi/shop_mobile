import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    navigation.navigate('Payment', { cartItems }); // Passe cartItems comme paramètre
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre Achat</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.url }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.itemTitle}>{item.titre}</Text>
                <Text style={styles.price}>{item.prix} DT</Text>
              </View>
              <Pressable onPress={() => removeFromCart(item)}>
                <Icon name="trash" size={24} color="red" />
              </Pressable>
            </View>
          )}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Supprimer tous" onPress={clearCart} style={styles.clearButton} />
        <Button title="Valider le paiement" onPress={handleCheckout} style={styles.checkoutButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clearButton: {
    backgroundColor: 'red',
  },
  checkoutButton: {
    backgroundColor: 'green',
  },
});

export default CartScreen;
