import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const DeliveredScreen = () => {
  const [id, setId] = useState('');

  const markDelivered = async () => {
    try {
      const response = await axios.post('http://192.168.29.94:3000/markDelivered', {
        id,
      });

      if (response.data.success) {
        alert('Marked as delivered successfully!');
      } else {
        alert('Failed to mark as delivered.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter ID:</Text>
      <TextInput
        style={styles.input}
        placeholder="ID of the item"
        value={id}
        onChangeText={setId}
      />
      <Button title="Mark as Delivered" onPress={markDelivered} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default DeliveredScreen;
