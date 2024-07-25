import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlcoholDefinition = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', // Remplacement de shadow*
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#fff',
    fontWeight:'700'
  },
});

export default AlcoholDefinition;


// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const NFTDefinition = ({ title, description }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{title}</Text>
//       <Text style={styles.description}>{description}</Text>
//       <Text style={styles.description}>{dispo}</Text>
//       <Text style={styles.description}>{prix}</Text> 
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 20,
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 10,
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', // Remplacement de shadow*
//     width: '90%',
//     alignSelf: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     color: '#666',
//   },
// });

// export default NFTDefinition;
