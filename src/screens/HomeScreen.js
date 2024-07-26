// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="New Order" onPress={() => navigation.navigate('AddContact')} />
            <Button title="Work Finished" onPress={() => navigation.navigate('WorkFinished')} />
            <Button title="Delivered" onPress={() => navigation.navigate('Delivered')} />
            <Button title="Status" onPress={() => navigation.navigate('Status')} />
        </View>
    );
};

export default HomeScreen;
