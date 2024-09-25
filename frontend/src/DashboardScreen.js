import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';

const DashboardScreen = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchSubscriptions = async () => {
        const response = await axios.get('http://your-backend-url/api/subscriptions');
        setSubscriptions(response.data);
    };

    const handleInviteUser = async (subscriptionId) => {
        const userId = 'user_id_to_invite'; // Replace with actual user ID logic
        try {
            await axios.post(`http://your-backend-url/api/subscriptions/${subscriptionId}/invite`, { userId });
            Alert.alert('Success', 'User invited to share subscription');
        } catch (error) {
            Alert.alert('Error', 'Failed to invite user');
        }
    };

    const handleTrackUsage = async (subscriptionId) => {
        const userId = 'user_id_to_track'; // Replace with actual user ID logic
        try {
            await axios.post(`http://your-backend-url/api/subscriptions/${subscriptionId}/track`, { userId });
            Alert.alert('Success', 'Usage tracked');
        } catch (error) {
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
        <View>
            <TextInput
                placeholder="Search Subscriptions"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredSubscriptions}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name} - ${item.cost}</Text>
                        <Button title="Track Usage" onPress={() => handleTrackUsage(item._id)} />
                        <Button title="Invite User" onPress={() => handleInviteUser(item._id)} />
                    </View>
                )}
            />
            <Button title="Add Subscription" onPress={() => {/* Navigate to Add Subscription Screen */}} />
        </View>
    );
};

export default DashboardScreen;