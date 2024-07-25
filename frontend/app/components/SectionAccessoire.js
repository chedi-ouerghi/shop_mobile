import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const accessories = [
  {
    id: 1,
    title: "Verre à Martini en Cristal",
    price: "89,99 €",
    image: "https://i.pinimg.com/564x/bb/15/1a/bb151a63ab63c664738123d94d804586.jpg",
  },
  {
    id: 2,
    title: "Shaker à Cocktail Professionnel",
    price: "59,99 €",
    image: "https://i.pinimg.com/564x/b6/e9/09/b6e909b4ea52c3af200845c5bd7f5b49.jpg",
  },
  {
    id: 3,
    title: "Set de Cuillères à Cocktail",
    price: "39,99 €",
    image: "https://i.pinimg.com/564x/46/df/25/46df254c5fe0f1c31c8eee482cdf3f2b.jpg",
  },
];

const SectionAccessoire = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Accessoires de Luxe</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {accessories.map(accessory => (
          <View key={accessory.id} style={styles.card}>
            <Image source={{ uri: accessory.image }} style={styles.image} />
            <Text style={styles.title}>{accessory.title}</Text>
            <Text style={styles.price}>{accessory.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  card: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#007bff',
      marginTop: 4,
      position: 'relative',
    left:'35%'
  },
});

export default SectionAccessoire;