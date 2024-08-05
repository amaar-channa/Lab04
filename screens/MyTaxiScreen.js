import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { collection, query, where, onSnapshot, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

const MyTaxiScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [taxis, setTaxis] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, 'bookings'), where('userId', '==', 'currentUserId'));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const bookingsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsList);

      const taxisDetails = await Promise.all(
        bookingsList.map(async (booking) => {
          const taxiDoc = await getDoc(doc(firestore, 'cabs', booking.taxiId));
          return { bookingId: booking.id, taxiId: booking.taxiId, ...taxiDoc.data() };
        })
      );
      setTaxis(taxisDetails);
    });

    return () => unsubscribe();
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      await deleteDoc(doc(firestore, 'bookings', bookingId));
      Alert.alert('Success', 'Booking cancelled');
    } catch (error) {
      Alert.alert('Error', 'Error cancelling booking. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={taxis}
        keyExtractor={item => item.bookingId}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.taxiDetails}>
              <Text style={styles.companyName}>{item.companyName}</Text>
              <Text style={styles.carModel}>{item.carModel}</Text>
            </View>
            <Button title="Cancel Booking" onPress={() => cancelBooking(item.bookingId)} color="#D32F2F" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taxiDetails: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  carModel: {
    fontSize: 16,
    color: '#757575',
  },
});

export default MyTaxiScreen;