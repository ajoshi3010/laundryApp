import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Contacts from 'expo-contacts';

const AddContactScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleAddContact = async () => {
        const prefixedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
        try {
            const response = await axios.post('http://192.168.29.94:3000/addContact', { name, phone: prefixedPhone });
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
        // alert('hello')
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers]
            });

            if (data.length > 0) {
                setContacts(data);
                setFilteredContacts(data);
                setModalVisible(true);
            }
        }
    };

    const handleSearch = (text) => {
        setSearch(text);
        const filtered = contacts.filter(contact =>
            contact.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredContacts(filtered);
    };

    return (
        <View style={styles.container}>
            <Text>Add Contact</Text>
            <TextInput placeholder="Name" value={name} onChangeText={setName} />
            <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
            <Button title="Add" onPress={handleAddContact} />
            <Button title="Fetch Contacts" onPress={handleFetchContacts} />

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search Contacts"
                        value={search}
                        onChangeText={handleSearch}
                    />
                    <FlatList
                        data={filteredContacts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                setName(item.name);
                                if (item.phoneNumbers && item.phoneNumbers.length > 0) {
                                    setPhone(item.phoneNumbers[0].number);
                                } else {
                                    setPhone('');
                                }
                                setModalVisible(false);
                            }}>
                                <Text style={styles.contactItem}>
                                    {item.name} - {item.phoneNumbers && item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : 'No phone number'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    modalContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    contactItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});

export default AddContactScreen;