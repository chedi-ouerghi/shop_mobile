import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { globalStyles } from '../styles/globalStyles';

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = 'your-token'; // Replace with actual token logic
      try {
        const response = await axios.get('http://localhost:5452/auth/profile/1', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Mon Profil</Text>
      {profile ? (
        <View>
          <Text style={styles.label}>Nom:</Text>
          <Text>{profile.name}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text>{profile.email}</Text>
          <Text style={styles.label}>Numéro de téléphone:</Text>
          <Text>{profile.num_telephone}</Text>
          <Text style={styles.label}>Adresse:</Text>
          <Text>{profile.adresse}</Text>
          <Text style={styles.label}>Code postal:</Text>
          <Text>{profile.code_postal}</Text>
          <Text style={styles.label}>Date de naissance:</Text>
          <Text>{profile.date_naissance}</Text>
          <Text style={styles.label}>Rôle:</Text>
          <Text>{profile.role}</Text>
        </View>
      ) : (
        <Text>Profil non trouvé</Text>
      )}
      <Button title="Déconnexion" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 23,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10
    }

});