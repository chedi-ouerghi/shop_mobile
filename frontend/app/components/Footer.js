import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2024 Mon App Crypto. Tous droits réservés.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#EEE',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#666',
  },
});

export default Footer;
