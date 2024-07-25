import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import Button from '../components/Button';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; // Renommé en MaterialIcon
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Renommé en FontAwesomeIcon

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5452/auth/register', {
        name,
        email,
        password,
      });
      const { token } = response.data;
      console.log('Registration successful, token:', token);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Sign up</Text>
      </View>
      <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesomeIcon name="google" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesomeIcon name="github" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <Button title="Create Account" onPress={handleRegister} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.switchText}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1B24',
  },
  header: {
    padding: 20,
    backgroundColor: '#1F1B24',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2C2A34',
  },
  backButton: {
    marginRight: 16,
    borderRadius: 10,
    backgroundColor: '#000',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
        position: 'relative',
    top: '5%',
  },
  socialButton: {
    backgroundColor: '#333',
    borderRadius: 30,
 shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    height: 50,
    width: 100,
    alignItems: 'center',  // Centre horizontalement
    justifyContent: 'center',  // Centre verticalement
  },
  form: {
    alignItems: 'center',
    backgroundColor: '#2C2A34',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3D3B45',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#2C2A34',
    color: '#FFF',
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  switchText: {
    color: '#9C27B0',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default RegisterScreen;
