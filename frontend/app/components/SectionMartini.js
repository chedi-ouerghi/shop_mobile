import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const SectionMartini = () => {
  const imageSource = { uri: 'https://i.pinimg.com/564x/d0/f1/ca/d0f1ca5fbabe7dc92da478d891219169.jpg' };
  const title = "Martini Bleu";
  const description = "Un cocktail élégant et rafraîchissant, le Martini Bleu est préparé avec du gin, du vermouth et une touche de liqueur de curaçao bleu, garni d'une rondelle de citron.";

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
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
          {title}
        </Animated.Text>
        <Animated.Text style={[styles.description, { opacity: descriptionOpacity }]}>
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 220,
    width: '100%',
    alignItems: 'center',
    padding: 20,
        backgroundColor: 'darkgray',
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
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#000',
    marginTop: 8,
  },
});

export default SectionMartini;