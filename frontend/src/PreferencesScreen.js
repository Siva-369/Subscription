import React, { useState, useEffect } from 'react';
import { View, Text, Button, Picker, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const PreferencesScreen = () => {
    const [notifications, setNotifications] = useState('in-app');
    const [loading, setLoading] = useState(false);

    const handleUpdatePreferences = async () => {
        setLoading(true);
        try {
            await axios.put('https://subscription-cyan.vercel.app/api/auth/profile', {
                preferences: { notifications }
            });
            Alert.alert('Success', 'Preferences updated successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to update preferences. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Optionally, you could fetch existing preferences here
    // useEffect(() => {
    //     const fetchPreferences = async () => {
    //         try {
    //             const response = await axios.get('https://your-api-endpoint');
    //             setNotifications(response.data.preferences.notifications);
    //         } catch (error) {
    //             console.error('Failed to fetch preferences', error);
    //         }
    //     };
    //     fetchPreferences();
    // }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notification Preferences</Text>
            <Picker
                selectedValue={notifications}
                onValueChange={(itemValue) => setNotifications(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="In-App" value="in-app" />
                <Picker.Item label="Email" value="email" />
            </Picker>
            <Button title="Update Preferences" onPress={handleUpdatePreferences} />
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: 200,
        marginBottom: 20,
    },
});

export default PreferencesScreen;
