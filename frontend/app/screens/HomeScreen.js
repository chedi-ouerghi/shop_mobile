
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import ContactUs from '../components/ContactUs';
import SectionVodka from '../components/SectionVodka';
import VodkaCube from '../components/VodkaCube';
import GallerySection from '../components/GallerySection';
import SectionAccessoire from '../components/SectionAccessoire';
import Animated, { useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [alcoholData, setAlcoholData] = useState([]);
  const navigation = useNavigation();
  const scrollY = useSharedValue(0);

  useEffect(() => {
    const fetchAlcoholData = async () => {
      try {
        const response = await axios.get('http://localhost:5452/alcool');
        setAlcoholData(response.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching alcohol data:', error);
      }
    };

    fetchAlcoholData();
  }, []);

  const handleScrollY = (event) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-25, 100], [1, 1.5], 'clamp');
    return {
      transform: [{ scale }],
    };
  });

  return (
    <ScrollView
      style={globalStyles.container}
      onScroll={handleScrollY}
      scrollEventThrottle={16}
    >
  <View style={styles.banner}>
        <ImageBackground
          source={{ uri: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXcxejl2cWE0YjFrYnV6dmhhaDAweW5sZzFuZDdjOGpkaXU1Ym5kbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26xBJlRPiabEcQHHa/giphy.gif' }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      
      {/* <View style={styles.buttonContainerBanner}>
        <Button title="Explorez nos créations" onPress={() => {}} />
        </View>
        <Animated.Text style={[styles.animatedText, titleAnimatedStyle]}>
        Absolut Vodka: L'Élégance Suédoise
      </Animated.Text> */}
    </View>


       <View style={styles.containerCube}>
      <VodkaCube />
    </View>

      <AlcoholCards alcoholData={alcoholData} />

      <SectionVodka />
      {/* <SectionGin /> */}
      <SectionAccessoire />

      <GallerySection/>
      <View style={styles.contactUsSection}>
        <ContactUs />
      </View>
    </ScrollView>
  );
};

const AlcoholCards = ({ alcoholData }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardSection}>
      <View style={styles.titreCARDHOME}>
        <Text style={styles.cardHeader}>Nos Vodkas </Text>
        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={() => navigation.navigate('Alcohol')}
        >
          <Text style={styles.seeMoreText}>Découvrir plus</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer}>
        {alcoholData.map(alcohol => (
          <View key={alcohol.id} style={styles.card}>
            <Image source={{ uri: alcohol.url }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{alcohol.titre}</Text>
            <Text style={styles.cardPrice}>{alcohol.prix} €</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 290,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 20,
    backgroundColor: '#000', 
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%', 
    height: '95%', 
    marginTop: '4%',
    marginLeft: '4%',
  },
  specialCardImage: {
    width: '40%',
    height: '95%',
    borderRadius: 10,
    position: 'absolute',
    top: '10%',
    left: '65%',
  },
  animatedText: {
    position: 'absolute',
    top: '15%',
    left: '18%',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titreCARDHOME: {
      flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginBottom: 20,
  },
    cardHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainerBanner: {
    position: 'absolute',
    left: '10%',
    top: '30%',
  },
  cardSection: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  cardHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContainer: {
    paddingVertical: 10,
  },
  card: {
    width: 150,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardPrice: {
    fontSize: 14,
    color: '#666',
  },
  contactUsSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(248 248 248 / 80%)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  seeMoreButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  seeMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
   containerCube: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    
    
  },
});

export default HomeScreen;
