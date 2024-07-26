import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const DeliveredScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch contacts ready for delivery
  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://192.168.29.94:3000/contacts/readyForDelivery');
      if (response.data.success) {
        setContacts(response.data.readyForDelivery);
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

  const markDelivered = async () => {
    if (!selectedContact) {
      alert('Please select a contact.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.29.94:3000/markDelivered', {
        id: selectedContact.id,
        name: selectedContact.name,
        phone: selectedContact.phone
      });

      if (response.data.success) {
        alert('Marked as delivered successfully!');
        // Refresh the contact list after successful operation
        fetchContacts();
        setSelectedContact(null); // Deselect contact after operation
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
      <Text style={styles.label}>Select a Contact Ready for Delivery:</Text>
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
      <Button title="Mark as Delivered" onPress={markDelivered} />
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

export default DeliveredScreen;