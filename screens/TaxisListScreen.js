import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

const TaxisListScreen = ({ navigation }) => {
  const [taxis, setTaxis] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'cabs'), (querySnapshot) => {
      const taxisList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTaxis(taxisList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={taxis}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Taxi Detail', { taxi: item })}>
            <Text style={styles.title}>{item.companyName}</Text>
            <Text style={styles.text}>{item.carModel}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0E0E0',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#6200EE',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#757575',
  },
});

export default TaxisListScreen;