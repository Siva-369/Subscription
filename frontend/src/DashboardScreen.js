import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, Alert } from 'react-native';
import axios from 'axios';

const DashboardScreen = ({ navigation }) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchSubscriptions = async () => {
        try {
            const response = await axios.get('https://subscription-cyan.vercel.app/api/subscriptions');
            setSubscriptions(response.data);
        } catch (error) {
            console.error('Failed to fetch subscriptions:', error);
            Alert.alert('Error', 'Failed to load subscriptions');
        }
    };

    const handleInviteUser = async (subscriptionId) => {
        const userId = 'user_id_to_invite'; // Replace with actual user ID logic
        try {
            await axios.post(`https://your-vercel-backend-url/api/subscriptions/${subscriptionId}/invite`, { userId });
            Alert.alert('Success', 'User invited to share subscription');
        } catch (error) {
            console.error('Failed to invite user:', error);
            Alert.alert('Error', 'Failed to invite user');
        }
    };

    const handleTrackUsage = async (subscriptionId) => {
        const userId = 'user_id_to_track'; // Replace with actual user ID logic
        try {
            await axios.post(`https://your-vercel-backend-url/api/subscriptions/${subscriptionId}/track`, { userId });
            Alert.alert('Success', 'Usage tracked');
        } catch (error) {
            console.error('Failed to track usage:', error);
            Alert.alert('Error', 'Failed to track usage');
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const filteredSubscriptions = subscriptions.filter(subscription =>
        subscription.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={{ padding: 10 }}>
            <TextInput
                style={{ padding: 10, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="Search Subscriptions"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredSubscriptions}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 10 }}>
                        <Text>{item.name} - ${item.cost}</Text>
                        <Button title="Track Usage" onPress={() => handleTrackUsage(item._id)} />
                        <Button title="Invite User" onPress={() => handleInviteUser(item._id)} />
                    </View>
                )}
            />
            <Button title="Add Subscription" onPress={() => navigation.navigate('AddSubscription')} />
        </View>
    );
};

export default DashboardScreen;
