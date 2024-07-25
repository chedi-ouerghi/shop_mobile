import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const GallerySection = () => {
  const navigation = useNavigation();

  const cards = [
    { id: 1, title: 'Martini', image: { uri: 'https://i.pinimg.com/564x/bd/9c/57/bd9c57d017c91b27fa4b816dd7106313.jpg' }, route: 'Categorie', type: 'martini' },
    { id: 2, title: 'Vodka', image: { uri: 'https://i.pinimg.com/564x/cc/a0/ae/cca0ae70ee99e40e53e8aa25d513a99a.jpg' }, route: 'Categorie', type: 'vodka' },
    { id: 3, title: 'Whisky', image: { uri: 'https://i.pinimg.com/564x/a1/c0/e3/a1c0e3c576bff46b3907cc1beeff1537.jpg' }, route: 'Categorie', type: 'whisky' },
    { id: 4, title: 'Bière', image: { uri: 'https://i.pinimg.com/564x/8c/d0/d0/8cd0d0ff1d0669dbdeb849ecd8dfd0ed.jpg' }, route: 'Categorie', type: 'biere' },
    { id: 5, title: 'Champagne', image: { uri: 'https://i.pinimg.com/564x/58/2b/15/582b1504ddfcf419e4b938b5a05ae644.jpg' }, route: 'Categorie', type: 'champagne' },
  ];

  const handleCardPress = (route, type) => {
    navigation.navigate(route, { type });
  };

  return (
    <View style={styles.container}>
      {cards.map((card) => (
        <TouchableOpacity key={card.id} onPress={() => handleCardPress(card.route, card.type)} style={styles.card}>
          <Image source={card.image} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{card.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap:10,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    width: 100,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default GallerySection;
