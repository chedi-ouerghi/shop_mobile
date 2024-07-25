import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const SectionGin = () => {
  const imageSource = { uri: 'https://i.pinimg.com/564x/83/9c/00/839c00eb8d98ea249f87a8358816281b.jpg' };
  const title = "Beefeater Gin";
    const description = "Beefeater Gin est un gin londonien classique, connu pour son goût riche et botanique. Fabriqué avec des ingrédients de haute qualité, il offre une expérience de dégustation unique et parfaite .";

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
    height: 270,
    width: '100%',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'darkgray',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  image: {
    width: 145,
    height: '100%',
    borderRadius: 10,
    marginLeft: 16,
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

export default SectionGin;