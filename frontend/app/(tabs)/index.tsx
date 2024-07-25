import React from 'react';
import AppNavigator from '../navigation/AppNavigator';

const App = () => {
  return (
    <AppNavigator />
  );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Modal, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// function HomeScreen({ navigation }) {
//   const [count, setCount] = useState(0);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [apiData, setApiData] = useState(null);

//   useEffect(() => {
//     if (modalVisible) {
//       // Fetch data when modal is visible
//       fetch('https://jsonplaceholder.typicode.com/todos/1')
//         .then(response => response.json())
//         .then(data => setApiData(data))
//         .catch(error => console.error('Error fetching data:', error));
//     }
//   }, [modalVisible]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Compteur: {count}</Text>
//       <Button title="Incrementer le compteur" onPress={() => setCount(count + 1)} />
//       <Button title="Afficher Modal" onPress={() => setModalVisible(true)} />
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>Données de l'API:</Text>
//             <Text>{apiData ? JSON.stringify(apiData, null, 2) : 'Chargement...'}</Text>
//             <Button title="Fermer" onPress={() => setModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
// });
