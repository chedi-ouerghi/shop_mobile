import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Icon, Tooltip } from 'react-native-elements';
import { useRoute, useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import Card from '../components/Card';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const AlcoholDetailsScreen = () => {
  const route = useRoute();
    const navigation = useNavigation(); 
  const { id } = route.params;
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-50)); 

  useEffect(() => {
    const fetchNFTDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5452/alcool/${id}`);
        setNft(response.data);
      } catch (error) {
        console.error('Error fetching alcool details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTDetails();
  }, [id]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: slideAnim }],
  };

  if (loading) {
    return (
      <View style={[globalStyles.container, styles.backgroundContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={[globalStyles.container, styles.backgroundContainer]}>
      <View style={styles.headerContainer}>
       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        </View>
      <Animated.Image source={{ uri: nft?.url }} style={[styles.backgroundImage, animatedStyle]} />
      <Animated.View style={[styles.contentContainer, animatedStyle]}>
        <Card
          title={nft?.titre}
          description={nft?.description}
          price={nft?.prix} 
          dispo={nft?.dispo ? 'Disponible' : 'Non disponible'}
          qte={nft?.qte}
          url={nft?.url}
        />
        <Tooltip popover={<Text>Ajouter au Panier</Text>} height={50} width={150}>
          <TouchableOpacity
            onPress={() => addToCart({ id: nft.id, titre: nft.titre, prix: nft.prix, url: nft.url })}
            style={styles.iconButton}
          >
            <Icon name="shopping-cart" type="font-awesome" color="#000" size={30} />
          </TouchableOpacity>
        </Tooltip>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)', 
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  contentContainer: {
    alignItems: 'center',
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 10,
  },
  iconButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    top: '1%',
    left: '1%',
zIndex:2
  },
  backButton: {
    borderRadius: 10,
    backgroundColor: '#000',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AlcoholDetailsScreen;
