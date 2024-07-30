import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GallerySection = () => {
  const navigation = useNavigation();

  const cards = [
    { id: 1, title: 'Belvedere', image: { uri: 'https://i.pinimg.com/564x/8a/ff/5c/8aff5c8b2f86f01d4f59c48a5517c211.jpg' }, route: 'Categorie', type: 'Belvedere' },
    { id: 2, title: 'Ketel One', image: { uri: 'https://i.pinimg.com/564x/4c/c5/5e/4cc55e0867eb005658b977be09fa4cb7.jpg' }, route: 'Categorie', type: 'Ketel One' },
    { id: 3, title: 'Ciroc', image: { uri: 'https://i.pinimg.com/564x/ba/f0/24/baf024fa4f62d5b3c21442976875e05a.jpg' }, route: 'Categorie', type: 'Ciroc' },
    { id: 4, title: 'Skyy', image: { uri: 'https://i.pinimg.com/564x/07/e6/e0/07e6e0229b70cbd69ecad738076b8e4d.jpg' }, route: 'Categorie', type: 'Skyy' },
    { id: 5, title: 'Absolut Elyx', image: { uri: 'https://i.pinimg.com/564x/07/4f/24/074f2423f1ec055e01106d357ea4aba2.jpg' }, route: 'Categorie', type: 'Absolut' },
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
    justifyContent: 'flex-start',
    gap:'5%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#000', // Optionnel, pour la couleur de fond
  },
  card: {
    width: '30%', // Ajustez la largeur pour trois cartes par ligne
    marginBottom: 20,
    backgroundColor: '#ffffff', // Couleur de fond des cartes
    borderRadius: 10,
    elevation: 5, // Ombre de la carte
    overflow: 'hidden',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 150, // Ajustez la hauteur pour une apparence équilibrée
  },
  cardTitle: {
    fontSize: 18, // Taille du texte
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#007bff', // Couleur du texte
  },
});

export default GallerySection;
