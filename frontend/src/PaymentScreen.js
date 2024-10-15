import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';

const PaymentScreen = () => {
    const [payments, setPayments] = useState([]);
    const [amount, setAmount] = useState('');

    const fetchPayments = async () => {
        const response = await axios.get('https://your-backend-url/api/payments/history');
        setPayments(response.data);
    };

    const handleAddPayment = async (subscriptionId) => {
        await axios.post('https://your-backend-url/api/payments', { subscriptionId, amount });
        fetchPayments(); // Refresh payment history
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <View>
            <Text>Your Payment History</Text>
            <FlatList
                data={payments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Text>{item.subscriptionId.name} - ${item.amount} on {new Date(item.date).toLocaleDateString()}</Text>
                )}
            />
            <Button title="Add Payment" onPress={() => handleAddPayment('subscription_id_here')} /> {/* Replace with actual logic */}
        </View>
    );
};

export default PaymentScreen;