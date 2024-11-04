import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Replace the URL with your Vercel backend URL
    const API_URL = 'https://subscription-cyan.vercel.app/api/notifications';

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(API_URL);
            setNotifications(response.data);
            setError('');
        } catch (err) {
            console.error('Failed to fetch notifications:', err);
            setError('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await axios.patch(`${API_URL}/${notificationId}/markAsRead`);
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification._id === notificationId ? { ...notification, read: true } : notification
                )
            );
            Alert.alert('Success', 'Notification marked as read');
        } catch (err) {
            console.error('Failed to mark as read:', err);
            Alert.alert('Error', 'Failed to mark notification as read');
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Your Notifications</Text>
            {error ? (
                <Text style={{ color: 'red' }}>{error}</Text>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={{
                            padding: 15,
                            marginBottom: 10,
                            backgroundColor: item.read ? '#e0e0e0' : '#f9f9f9',
                            borderRadius: 5,
                        }}>
                            <Text style={{ fontSize: 16 }}>{item.message}</Text>
                            <Button
                                title="Mark as Read"
                                onPress={() => markAsRead(item._id)}
                                disabled={item.read}
                            />
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default NotificationScreen;
