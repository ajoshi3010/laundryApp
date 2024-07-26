import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const StatusScreen = () => {
  const [statusData, setStatusData] = useState({
    inWork: [],
    readyForDelivery: [],
    history: [],
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('http://192.168.29.94:3000/status');
        setStatusData(response.data);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    fetchStatus();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>ID: {item.id}</Text>
      <Text style={styles.itemText}>Name: {item.name}</Text>
      <Text style={styles.itemText}>Phone: {item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>In Work</Text>
      <FlatList
        data={statusData.inWork}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Text style={styles.title}>Ready for Delivery</Text>
      <FlatList
        data={statusData.readyForDelivery}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Text style={styles.title}>History</Text>
      <FlatList
        data={statusData.history}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
});

export default StatusScreen;
