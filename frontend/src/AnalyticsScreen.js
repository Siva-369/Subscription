import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const AnalyticsScreen = () => {
    const [analyticsData, setAnalyticsData] = useState([]);

    const fetchAnalytics = async () => {
        const response = await axios.get('http://localhost:3000/api/analytics'); // Create this endpoint
        setAnalyticsData(response.data);
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