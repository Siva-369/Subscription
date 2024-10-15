import React, { useState, useEffect } from 'react';
import { View, Text, Button, Picker } from 'react-native';
import axios from 'axios';

const PreferencesScreen = () => {
    const [notifications, setNotifications] = useState('in-app');

    const handleUpdatePreferences = async () => {
        await axios.put('https://your-backend-url/api/auth/profile', { preferences: { notifications } });
        alert('Preferences updated successfully');
    };

    return (
        <View>
            <Text>Notification Preferences</Text>
            <Picker selectedValue={notifications} onValueChange={(itemValue) => setNotifications(itemValue)}>
                <Picker.Item label="In-App" value="in-app" />
                <Picker.Item label="Email" value="email" />
            </Picker>
            <Button title="Update Preferences" onPress={handleUpdatePreferences} />
        </View>
    );
};

export default PreferencesScreen;