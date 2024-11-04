import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { setAuthToken } from './axiosConfig';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        setLoading(true);
        setError(''); // Clear any previous error
        try {
            const response = await axios.post('https://subscription-cyan.vercel.app/api/auth/login', { email, password });
            setAuthToken(response.data.token); // Set token
            navigation.navigate('Dashboard');
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid credentials or server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Login" onPress={handleLogin} />
            )}
            <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
        </View>
    );
};

export default LoginScreen;
