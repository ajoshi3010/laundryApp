import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as Contacts from 'expo-contacts';

const AddContactScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [contacts, setContacts] = useState([]);

    const handleAddContact = async () => {
        try {
            const response = await axios.post('http://192.168.29.94:3000/addContact', { name, phone });
            if (response.data.success) {
                alert('Contact added successfully');
                navigation.goBack(); // Navigate back to the home screen
            } else {
                alert('Error adding contact: ' + response.data.error);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const handleFetchContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers]
            });

            if (data.length > 0) {
                setContacts(data);
            }
        }
    };

    return (
        <View>
            <Text>Add Contact</Text>
            <TextInput placeholder="Name" value={name} onChangeText={setName} />
            <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
            <Button title="Add" onPress={handleAddContact} />
            <Button title="Fetch Contacts" onPress={handleFetchContacts} />
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        setName(item.name);
                        if (item.phoneNumbers && item.phoneNumbers.length > 0) {
                            setPhone(item.phoneNumbers[0].number);
                        } else {
                            setPhone('');
                        }
                    }}>
                        <Text>
                            {item.name} - {item.phoneNumbers && item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : 'No phone number'}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default AddContactScreen;
