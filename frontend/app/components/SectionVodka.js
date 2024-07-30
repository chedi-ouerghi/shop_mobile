import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const SectionVodka = () => {
  const imageSource = { uri: 'https://i.pinimg.com/564x/46/ae/cd/46aecda5cfc82c615118af0847b0f61a.jpg' }; // Image de vodka
  const title = "Vodka Luxe GREYGOOSE";
  const description = "Découvrez la GREYGOOSE Vodka Luxe, une vodka raffinée et élégante, fabriquée avec des ingrédients de première qualité pour une expérience pure et veloutée.";

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const descriptionOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(descriptionOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [titleOpacity, descriptionOpacity]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
          {title}
        </Animated.Text>
        <Animated.Text style={[styles.description, { opacity: descriptionOpacity }]}>
          {description}
        </Animated.Text>
      </View>
      <Image source={imageSource} style={styles.image} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 290,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e3f2fd', // Bleu clair pour le thème vodka
    borderRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  image: {
    width: 125,
    height: '100%',
    borderRadius: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff', // Bleu pour s'harmoniser avec le thème vodka
  },
  description: {
    fontSize: 16,
    color: '#333', // Couleur de texte légèrement plus sombre pour le contraste
    marginTop: 8,
  },
});

export default SectionVodka;
