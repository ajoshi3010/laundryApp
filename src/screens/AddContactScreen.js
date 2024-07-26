// src/screens/AddContactScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const AddContactScreen = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleAddContact = async () => {
        try {
            const response = await axios.post('http://192.168.29.94:3000/addContact', { name, phone });
            if (response.data.success) {
                alert('Contact added successfully');
            } else {
                alert('Error adding contact: ' + response.data.error);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <View>
            <Text>Add Contact</Text>
            <TextInput placeholder="Name" value={name} onChangeText={setName} />
            <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
            <Button title="Add" onPress={handleAddContact} />
        </View>
    );
};

export default AddContactScreen;
