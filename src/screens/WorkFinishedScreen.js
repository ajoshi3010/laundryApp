import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Linking, Platform } from 'react-native';
import axios from 'axios';
import * as IntentLauncher from 'expo-intent-launcher';

const WorkFinishedScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch contacts whose status is 'inWork'
  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://laundary-bharath-backend-o750iks6l.vercel.app/inWork');
      if (response.data.success) {
        setContacts(response.data.inWork);
      } else {
        alert('Failed to fetch contacts.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching contacts.');
    }
  };

  // Call this function on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const sendSMS = (phone, message) => {
    const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`;
    if (Platform.OS === 'android') {
      IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: smsUrl
      }).catch(err => console.error('Failed to open SMS app', err));
    } else {
      Linking.openURL(smsUrl).catch(err => console.error('Failed to open SMS app', err));
    }
  };

  const markWorkFinished = async () => {
    if (!selectedContact) {
      alert('Please select a contact.');
      return;
    }

    try {
      const response = await axios.post('https://laundary-bharath-backend-o750iks6l.vercel.app/markReady', {
        id: selectedContact.id,
        name: selectedContact.name,
        phone: selectedContact.phone
      });

      if (response.data.success) {
        sendSMS(selectedContact.phone, 'Your clothes are ready for delivery.');
        // alert('Marked as ready for delivery successfully!');
        // Refresh the contact list after successful operation
        fetchContacts();
        setSelectedContact(null); // Deselect contact after operation
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
      <Text style={styles.label}>Select a Contact:</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.contactItem,
              selectedContact?.id === item.id && styles.selectedContact
            ]}
            onPress={() => setSelectedContact(item)}
          >
            <Text>{item.name} - {item.phone}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Mark as Ready for Delivery" onPress={markWorkFinished} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  contactItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  selectedContact: {
    backgroundColor: '#d3d3d3',
  },
});

export default WorkFinishedScreen;