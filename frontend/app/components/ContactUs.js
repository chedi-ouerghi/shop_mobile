import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, TextInput } from 'react-native';
import Button from '../components/Button';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleContactPress = () => {
    const subject = 'Message from App User';
    const body = `Email: ${email}%0D%0A%0D%0A${message}`;
    Linking.openURL(`mailto:contact@example.com?subject=${subject}&body=${body}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Contactez-nous</Text>
        <TextInput
          style={styles.input}
          placeholder="Votre e-mail"
          onChangeText={setEmail}
          value={email}
          inputMode="email-address"
        />
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Votre message"
          onChangeText={setMessage}
          value={message}
          multiline
          rows={4}
        />
      </View>
      <Button title="Envoyez-nous un e-mail" onPress={handleContactPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', // Remplacement de shadow*
    width: '90%',
  },
  content: {
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  messageInput: {
    height: 120,
    verticalAlign: 'top', // Remplacement de textAlignVertical
  },
});

export default ContactUs;
