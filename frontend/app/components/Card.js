import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Card = ({ title, description, price, dispo, qte, url }) => {
  return (
    <ImageBackground source={{ uri: url }} style={styles.card} imageStyle={styles.cardImage}>
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>Prix: {price} £</Text>
        {dispo === 'Non disponible' && <Text style={styles.dispo}>{dispo}</Text>}
        <Text style={styles.qte}>Quantité: {qte}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 400,
    borderRadius: 15,
    overflow: 'hidden',
    margin: 10,
    backgroundColor: 'transparent',
    elevation: 3,
  },
  cardImage: {
    borderRadius: 15,
    opacity: 0.8,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  description: {
    fontSize: 16,
    color: '#FFF',
  },
  price: {
    fontSize: 16,
    color: '#FFD700',
    marginTop: 10,
  },
  dispo: {
    fontSize: 16,
    color: '#FF0000',
    marginTop: 5,
  },
  qte: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 5,
  },
});

export default Card;
