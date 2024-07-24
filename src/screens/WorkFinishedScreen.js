import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const WorkFinishedScreen = () => {
  const [id, setId] = useState('');

  const markWorkFinished = async () => {
    try {
      const response = await axios.post('https://your-cloud-function-url/markReady', {
        id,
      });

      if (response.data.success) {
        alert('Marked as ready for delivery successfully!');
      } else {
        alert('Failed to mark as ready.');
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
      <Button title="Mark as Ready for Delivery" onPress={markWorkFinished} />
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

export default WorkFinishedScreen;
