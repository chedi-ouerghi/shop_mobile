import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Animated } from 'react-native';

const VodkaCube = () => {
  const rotateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotation();
  }, []);

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateY, {
        toValue: 0.8,
        duration: 5000, // Ajustez la durée pour la rotation complète
        useNativeDriver: true,
      })
    ).start();
  };

  const rotateInterpolate = rotateY.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.cubeContainer}>
        <Animated.View style={[styles.cube, { transform: [{ rotateY: rotateInterpolate }] }]}>
          <View style={[styles.face, styles.face1]}>
            <Image
              source={{ uri: 'https://i.pinimg.com/564x/11/d0/6e/11d06ee86ae5716fe3ee8805390cc434.jpg' }}
              style={styles.image}
            />
          </View>
          <View style={[styles.face, styles.face2]}>
            <Image
              source={{ uri: 'https://i.pinimg.com/564x/11/d0/6e/11d06ee86ae5716fe3ee8805390cc434.jpg' }}
              style={styles.image}
            />
          </View>
          <View style={[styles.face, styles.face3]}>
            <Image
              source={{ uri: 'https://i.pinimg.com/564x/11/d0/6e/11d06ee86ae5716fe3ee8805390cc434.jpg' }}
              style={styles.image}
            />
          </View>
          <View style={[styles.face, styles.face4]}>
            <Image
              source={{ uri: 'https://i.pinimg.com/564x/11/d0/6e/11d06ee86ae5716fe3ee8805390cc434.jpg' }}
              style={styles.image}
            />
          </View>
          <View style={[styles.face, styles.face5]}>
            <Image
              source={{ uri: 'https://i.pinimg.com/564x/11/d0/6e/11d06ee86ae5716fe3ee8805390cc434.jpg' }}
              style={styles.image}
            />
          </View>
          <View style={[styles.face, styles.face6]}>
            <Image
              source={{ uri: 'https://i.pinimg.com/564x/11/d0/6e/11d06ee86ae5716fe3ee8805390cc434.jpg' }}
              style={styles.image}
            />
          </View>
        </Animated.View>
      </View>
      <View style={styles.content}>
        <Text style={styles.motivationText}>C'est jour de Vodka !! </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Vodka</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Positionne les éléments horizontalement
    alignItems: 'center',
    padding: 25,
  },
  cube: {
    width: 150,
    height: 150,
    position: 'relative',
    transformStyle: 'preserve-3d',
  },
  cubeContainer: {
    width: 220, // Largeur totale incluant le padding
    height: 220, // Hauteur totale incluant le padding
    padding: 10, // Padding autour du cube
  },
  face: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'transparent',
    backfaceVisibility: 'hidden',
  },
  face1: {
    transform: [{ rotateY: '0deg' }, { translateZ: 100 }],
  },
  face2: {
    transform: [{ rotateY: '90deg' }, { translateZ: 100 }],
  },
  face3: {
    transform: [{ rotateY: '180deg' }, { translateZ: 100 }],
  },
  face4: {
    transform: [{ rotateY: '270deg' }, { translateZ: 100 }],
  },
  face5: {
    transform: [{ rotateX: '90deg' }, { translateZ: 100 }],
  },
  face6: {
    transform: [{ rotateX: '-90deg' }, { translateZ: 100 }],
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20, // Espacement entre le cube et le texte
  },
  motivationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20, // Espacement entre le texte et le bouton
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VodkaCube;
