import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const AnalyticsScreen = () => {
    const [analyticsData, setAnalyticsData] = useState([]);

    const fetchAnalytics = async () => {
        try {
            // Replace localhost with the deployed Vercel URL
            const response = await axios.get('https://subscription-cyan.vercel.app/api/analytics'); // Update this URL
            setAnalyticsData(response.data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    return (
        <View>
            <Text>Your Subscription Analytics</Text>
            <FlatList
                data={analyticsData}
                keyExtractor={(item) => item.subscriptionId}
                renderItem={({ item }) => (
                    <Text>{item.subscriptionName}: ${item.totalCost} spent</Text>
                )}
            />
        </View>
    );
};

export default AnalyticsScreen;
