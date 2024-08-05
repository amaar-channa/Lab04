import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

const TaxiDetailScreen = ({ route }) => {
  const { taxi } = route.params;

  const bookTaxi = async () => {
    try {
      const q = query(collection(firestore, 'bookings'), where('userId', '==', 'currentUserId'));
      const userBookings = await getDocs(q);

      if (userBookings.docs.length < 2) {
        await addDoc(collection(firestore, 'bookings'), { userId: 'currentUserId', taxiId: taxi.id });
        Alert.alert('Success', 'Taxi booked successfully!');
      } else {
        Alert.alert('Limit Exceeded', 'You can only book up to 2 taxis at a time.');
      }
    } catch (error) {
      Alert.alert('Error', 'Error booking taxi. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{taxi.companyName}</Text>
      <Text style={styles.text}>{taxi.carModel}</Text>
      <Text style={styles.text}>{`Passengers: ${taxi.passengerLimit}`}</Text>
      <Text style={styles.text}>{`Rating: ${taxi.rating}`}</Text>
      <Text style={styles.text}>{`Cost per hour: ${taxi.costPerHour}`}</Text>
      <Button title="Book Taxi" onPress={bookTaxi} color="#6200EE" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0E0E0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200EE',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#757575',
  },
});

export default TaxiDetailScreen;