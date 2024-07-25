import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, Animated, ScrollView } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import { useSharedValue } from 'react-native-reanimated';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';

const AlcoholList = ({ navigation }) => {
  const [Alcohols, setAlcohols] = useState([]);
  const [filteredAlcohols, setFilteredAlcohols] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [bestAlcohols, setBestAlcohols] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [availableFilter, setAvailableFilter] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = useState(new Animated.Value(-300))[0];
  const scrollX = useSharedValue(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollViewRef = useRef(null);
  const [smiley, setSmiley] = useState('😔');

  useEffect(() => {
    const fetchAlcohols = async () => {
      try {
        const response = await axios.get('http://localhost:5452/alcool');
        setAlcohols(response.data);
        setFilteredAlcohols(response.data);
      } catch (error) {
        console.error('Error fetching Alcohols:', error);
      }
    };

    const fetchTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5452/alcool/types');
        setTypes(response.data);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    const fetchBestAlcohols = async () => {
      try {
        const response = await axios.get('http://localhost:5452/alcool/best');
        setBestAlcohols(response.data);
      } catch (error) {
        console.error('Error fetching best Alcohols:', error);
      }
    };

    fetchAlcohols();
    fetchTypes();
    fetchBestAlcohols();
  }, []);

  useEffect(() => {
    filterAlcohols();
  }, [titleFilter, priceFilter, availableFilter, selectedType, Alcohols, sortOrder]);

  const filterAlcohols = () => {
    let filtered = Alcohols;

    if (titleFilter) {
      filtered = filtered.filter(Alcohol => Alcohol.titre.toLowerCase().includes(titleFilter.toLowerCase()));
    }

    if (priceFilter) {
      filtered = filtered.filter(Alcohol => Alcohol.prix <= parseFloat(priceFilter));
    }

    if (availableFilter) {
      filtered = filtered.filter(Alcohol => Alcohol.dispo);
    }

    if (selectedType) {
      filtered = filtered.filter(Alcohol => Alcohol.type === selectedType);
    }

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.prix - b.prix);
    } else {
      filtered.sort((a, b) => b.prix - a.prix);
    }

    setFilteredAlcohols(filtered);
  };

  const handleScrollX = (event) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  const toggleDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: isDrawerOpen ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsDrawerOpen(!isDrawerOpen));
  };

  const clearFilters = () => {
    setTitleFilter('');
    setPriceFilter('');
    setAvailableFilter(false);
    setSelectedType('');
    setSortOrder('asc'); 
    filterAlcohols();
  };

  const renderAlcoholCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('AlcoholDetails', { id: item.id })}
    >
      <Image source={{ uri: item.url }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.titre}</Text>
        <Text style={styles.cardPrice}>{item.prix} €</Text>
      </View>
    </TouchableOpacity>
  );

  const renderBestAlcoholCard = ({ item }) => (
    <TouchableOpacity
      style={styles.specialCardTop}
      onPress={() => navigation.navigate('AlcoholDetails', { id: item.id })}
    >
      <Image source={{ uri: item.url }} style={styles.specialCardImageTop} />
      <View style={styles.specialCardContent}>
        <Text style={styles.specialCardTitleTop}>{item.titre}</Text>
        <Text style={styles.specialCardPriceTop}>{item.prix} €</Text>
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowScrollToTop(scrollY > 200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Collection Alcohol</Text>
        <TouchableOpacity style={styles.filterButton} onPress={toggleDrawer}>
          <Icon name="filter" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      
     
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.banner}>
        <Text style={styles.bannerText}>
          I swear to drunk,I'm not good {smiley}
        </Text>
      </View>
        <Text style={styles.specialCardText}>Top Alcohol screen</Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate="fast"
          onScroll={handleScrollX}
        >
          <View style={styles.specialCardsContainer}>
            <TouchableOpacity style={styles.specialCard}>
              {/* <View style={styles.circleBackground} /> */}
              <Image source={require('../../assets/images/Bruadarach.png')} style={styles.specialCardImage} />
              <Text style={styles.specialCardTitle}>Bruadarach</Text>
              <Text style={styles.specialCardPrice}>250€</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.specialCard}>
              {/* <View style={styles.circleBackground} /> */}
              <Image source={require('../../assets/images/brass_monkey_gin.png')} style={styles.specialCardImage} />
              <Text style={styles.specialCardTitle}>Brass Monkey Gin</Text>
              <Text style={styles.specialCardPrice}>180 €</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.specialCard}>
              {/* <View style={styles.circleBackground} /> */}
              <Image source={require('../../assets/images/park_royal_gin.png')} style={styles.specialCardImage} />
              <Text style={styles.specialCardTitle}>Park Royal Gin</Text>
              <Text style={styles.specialCardPrice}>499 €</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Text style={styles.bestCardText}>Best Alcohol</Text>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate="fast"
          onScroll={handleScrollX}
        >
          <View style={styles.specialCardsContainerTop}>
            <FlatList
              data={bestAlcohols}
              renderItem={renderBestAlcoholCard}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>

        {filteredAlcohols.length > 0 ? (
          <>
            <View style={styles.cardsCountContainer}>
              <Text style={styles.cardsCountText}>
                Nombre d'alcool disponibles : {filteredAlcohols.length}
              </Text>
              <View style={styles.sortButtonsContainer}>
                <TouchableOpacity
                  style={styles.sortButton}
                  onPress={() => setSortOrder('asc')}
                >
                  <Ionicons name="arrow-up" size={20} color="#007bff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sortButton}
                  onPress={() => setSortOrder('desc')}
                >
                  <Ionicons name="arrow-down" size={20} color="#007bff" />
                </TouchableOpacity>
              </View>
            </View>
            
            <FlatList
              data={filteredAlcohols.slice(0, visibleCount)}
              renderItem={renderAlcoholCard}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.list}
              onScroll={handleScroll}
            />
            {visibleCount < filteredAlcohols.length && (
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={handleLoadMore}
              >
                <Text style={styles.loadMoreText}>Afficher plus</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text style={styles.noResultsText}>Aucun alcool trouvé.</Text>
        )}
      </ScrollView>
 {showScrollToTop && (
        <TouchableOpacity
          style={styles.scrollToTopButton}
          onPress={handleScrollToTop}
        >
          <Ionicons name="arrow-up" size={24} color="#fff" />
        </TouchableOpacity>
      )}

  
      <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnimation }] }]}>
        <TextInput
          style={styles.input}
          placeholder="Filtrer par titre"
          value={titleFilter}
          onChangeText={setTitleFilter}
        />
        <View style={styles.priceFilterContainer}>
          <TextInput
            style={[styles.input, styles.priceInput]}
            placeholder="Filtrer par prix max"
            keyboardType="numeric"
            value={priceFilter}
            onChangeText={setPriceFilter}
          />
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setSortOrder('asc')}
          >
            <Ionicons name="arrow-up" size={20} color="#007bff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setSortOrder('desc')}
          >
            <Ionicons name="arrow-down" size={20} color="#007bff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setAvailableFilter(!availableFilter)}
        >
          <Icon name={availableFilter ? 'eye' : 'eye-slash'} size={20} color="#007bff" />
          <Text style={styles.iconButtonText}>{availableFilter ? 'Afficher tous' : 'Afficher seulement disponibles'}</Text>
        </TouchableOpacity>
        <Text style={styles.inputLabel}>Filtrer par type</Text>
        <DropDownPicker
          items={[{ label: 'Tous', value: '' }, ...types.map(type => ({ label: type, value: type }))]}
          defaultValue={selectedType}
          containerStyle={styles.pickerContainer}
          style={styles.picker}
          dropDownStyle={styles.pickerDropdown}
          onChangeItem={item => setSelectedType(item.value)}
        />
        <View style={styles.grpButton}>
          <Button style={{ width: '48%', marginRight: '4%' }} title="Appliquer" onPress={toggleDrawer} />
          <Button style={{ width: '48%' }} title="Vider" onPress={clearFilters} />
        </View>
      </Animated.View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
  },
  banner: {
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  bannerText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },

  specialCardText: {
    backgroundColor:'#000',
     color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
         position: 'relative',
    top: '0%',
    margin:15
  },
    bestCardText: {
    backgroundColor:'#000',
     color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
         position: 'relative',
      top: '0%',
    margin:15
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    position: 'relative',
    top:'0%'
  }, 
    cardsCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
      marginBottom: 10,
      backgroundColor: '#000',
    margin:15
  },
    sortButtonsContainer: {
    flexDirection: 'row',
  },
  specialCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
    gap:10,
    
  },
circleBackground: {
    position: 'absolute', 
    top: '25%', 
    left: '22%', 
    width: 120, 
    height: 80, 
    backgroundColor: '#444259', 
    borderTopLeftRadius: 45, 
    borderTopRightRadius: 25, 
    borderBottomRightRadius: 70, 
    borderBottomLeftRadius: 20, 
    overflow: 'hidden', 
  },
  specialCard: {
    flex: 0.48, 
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center', 
    marginVertical: 10,
  },
  specialCardImage: {
    width: '65%',
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
    position: 'relative',
    top: '-14%',
    left: '6%',
  },
  specialCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic', 
    fontFamily: 'monospace',
    marginBottom: 10,
    position: 'relative',
    top: '-10%',
    left: '0%',
  },
  specialCardPrice: {
    fontSize: 18,
    color: '#dc3545',
    backgroundColor: '#fff',
    position: 'absolute',
    top:'85%',
    left: '65%',
    width: '30%',
    height: 30, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5, 
    textAlign: 'center', 
    display: 'flex',
    fontWeight: 'bold',
  },
  cardsCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff',
  },
   list: {
    paddingBottom: 20,
    flexDirection: 'column', 
    display: 'flex',
    width: '100%', 
  },
   circleBackgroundCard: {
    position: 'absolute', 
  top: '60%', 
    left: '78%', 
    width: 65, 
    height: 45,
    backgroundColor: '#444259', 
    borderTopLeftRadius: 60, 
    borderTopRightRadius: 25, 
    borderBottomRightRadius: 70, 
    borderBottomLeftRadius: 10, 
    overflow: 'hidden', 
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10, 
    marginHorizontal: 10, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    width: '90%', 
    height: 120, 
  },
  cardImage: {
    width: 80, 
    height: 100, 
    borderRadius: 10,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1, 
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardPrice: {
    position: 'absolute',
    top:'100%',
    left: '80%',
    fontWeight:' 700',
    width: '25%',
    fontSize: 20,
    color: '#dc3545',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    textAlign: 'center',
    marginTop: 20,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 300, 
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 10,
  },
  grpButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconButtonText: {
    marginLeft: 5,
    color: '#007bff',
  },

  specialCardsContainerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  specialCardTop: {
    margin:15,
    width: 160,  
    height: 250, 
    marginHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6, 
    overflow: 'hidden', 
    position: 'relative',
  },
  specialCardImageTop: {
    width: '100%',
    height: '70%', 
    resizeMode: 'cover',
  },
  specialCardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: '30%', 
  },
  specialCardTitleTop: {
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', 
    marginBottom: 4,
    flexWrap: 'wrap', 
  },
  specialCardPriceTop: {
fontSize: 20,
    color: '#dc3545',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  loadMoreButton: {
    alignItems: 'center',
    marginVertical: 10,
  },
  loadMoreText: {
    fontSize: 16,
    color: 'blue',
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
});

export default AlcoholList;
