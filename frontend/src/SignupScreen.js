import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        try {
            await axios.post('https://your-backend-url/api/auth/signup', { email, password });
            navigation.navigate('Login');
        } catch (err) {
            setError('Error creating account');
        }
    };

    return (
        <View>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            {error ? <Text>{error}</Text> : null}
            <Button title="Sign Up" onPress={handleSignup} />
        </View>
    );
};

export default SignupScreen;