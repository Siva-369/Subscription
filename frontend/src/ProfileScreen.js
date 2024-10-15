import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { setAuthToken } from './axiosConfig';

const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fetchProfile = async () => {
        const response = await axios.get('https://your-backend-url/api/auth/profile');
        setEmail(response.data.email);
    };

    const handleUpdateProfile = async () => {
        try {
            await axios.put('https://your-backend-url/api/auth/profile', { email, password });
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <View>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="New Password" secureTextEntry value={password} onChangeText={setPassword} />
            <Button title="Update Profile" onPress={handleUpdateProfile} />
        </View>
    );
};

export default ProfileScreen;