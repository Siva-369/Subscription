import React, { useState } from 'react';
import { View, TextInput, Button, Picker } from 'react-native';
import axios from 'axios';

const AddSubscriptionScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [cost, setCost] = useState('');
    const [category, setCategory] = useState('Streaming'); // Default category

    const handleAddSubscription = async () => {
        await axios.post('http://your-backend-url/api/subscriptions', { name, type, cost, category });
        navigation.navigate('Dashboard');
    };

    return (
        <View>
            <TextInput placeholder="Subscription Name" value={name} onChangeText={setName} />
            <TextInput placeholder="Type" value={type} onChangeText={setType} />
            <TextInput placeholder="Cost" value={cost} onChangeText={setCost} keyboardType="numeric" />
            <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
                <Picker.Item label="Streaming" value="Streaming" />
                <Picker.Item label="Software" value="Software" />
                <Picker.Item label="News" value="News" />
                <Picker.Item label="Other" value="Other" />
            </Picker>
            <Button title="Add Subscription" onPress={handleAddSubscription} />
        </View>
    );
};

export default AddSubscriptionScreen;