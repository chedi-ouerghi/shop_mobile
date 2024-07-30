import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Animated } from 'react-native';

const ChampagneCube = () => {
  const rotateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotation();
  }, []);

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateY, {
        toValue: 1,
        duration: 50000, // Durée pour une rotation complète
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
              source={{ uri: 'https://i.pinimg.com/564x/20/74/75/207475f06cbb63a8ee24f58f57f70e7d.jpg' }}
              style={styles.image}
            />
          </View>
          <View style={[styles.face, styles.face2]}>
            <Image
              source={{ uri: 'https://i.pinimg.com/564x/20/74/75/207475f06cbb63a8ee24f58f57f70e7d.jpg' }}
              style={styles.image}
            />
          </View>
          <View style={[styles.face, styles.face3]}>
            <Image
              source={{ uri: 'https://i.pinimg.com/564x/20/74/75/207475f06cbb63a8ee24f58f57f70e7d.jpg' }}
              style={styles.image}
            />
          </View>
          <View style={[styles.face, styles.face4]}>
            <Image
              source={{ uri: 'https://i.pinimg.com/564x/20/74/75/207475f06cbb63a8ee24f58f57f70e7d.jpg' }}
              style={styles.image}
            />
          </View>
          <View style={[styles.face, styles.face5]}>
            <Image
              source={{ uri: 'https://i.pinimg.com/564x/20/74/75/207475f06cbb63a8ee24f58f57f70e7d.jpg' }}
              style={styles.image}
            />
          </View>
          <View style={[styles.face, styles.face6]}>
            <Image
              source={{ uri: 'https://i.pinimg.com/564x/20/74/75/207475f06cbb63a8ee24f58f57f70e7d.jpg' }}
              style={styles.image}
            />
          </View>
        </Animated.View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Champagne</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  cubeContainer: {
    width: 220, // Largeur totale incluant le padding
    height: 220, // Hauteur totale incluant le padding
    padding: 10, // Padding autour du cube
  },
  cube: {
    width: 200, // Largeur de chaque face du cube
    height: 200, // Hauteur de chaque face du cube
    position: 'relative',
    transformStyle: 'preserve-3d',
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
  button: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    bottom: 50, // Positionnement du bouton en dessous du cube
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChampagneCube;
