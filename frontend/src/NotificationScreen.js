import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        const response = await axios.get('http://localhost:5000/api/notifications'); // Create this endpoint
        setNotifications(response.data);
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <View>
            <Text>Your Notifications</Text>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.message}</Text>
                        <Button title="Mark as Read" onPress={() => {/* Logic to mark as read */}} />
                    </View>
                )}
            />
        </View>
    );
};

export default NotificationScreen;