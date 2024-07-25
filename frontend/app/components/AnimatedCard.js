import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withSpring } from 'react-native-reanimated';
import Card from './Card';
import Button from './Button';

const { width } = Dimensions.get('window');

const AnimatedCard = ({ nft, index, scrollX }) => {
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(1);
  const navigation = useNavigation();

  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const scale = interpolate(scrollX.value, inputRange, [0.8, 1, 0.8]);
    return {
      transform: [{ scale }],
    };
  });

  const handlePress = () => {
    setIsPressed(true);
    scale.value = withSpring(1.2, { damping: 1 }, () => {
      scale.value = withSpring(1, { damping: 1 }, () => {
        navigation.navigate('NFTDetails', { id: nft.id });
        setIsPressed(false);
      });
    });
  };

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <ImageBackground source={{ uri: nft.url }} style={styles.backgroundImage}>
        <Card
          title={nft.titre}
          description={nft.description}
          price={nft.prix}
          dispo={nft.dispo ? 'Disponible' : 'Non disponible'}
          qte={nft.qte}
          url={nft.url}
        />
        <View style={styles.buttonContainer}>
          <Animated.View style={buttonAnimationStyle}>
            <Button
              title="Voir les détails"
              onPress={handlePress}
            />
          </Animated.View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  card: {
    width: width - 40,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.8)',

    elevation: 11,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 80,
    height: '100%',
    blurRadius: 15,
  },
});

export default AnimatedCard;
