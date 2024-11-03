import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import { setAuthToken } from './axiosConfig';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            setAuthToken(response.data.token); // Set token
            navigation.navigate('Dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <View>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            {error ? <Text>{error}</Text> : null}
            <Button title="Login" onPress={handleLogin} />
            <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
        </View>
    );
};

export default LoginScreen;