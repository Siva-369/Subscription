import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, Alert } from 'react-native';
import axios from 'axios';

const PaymentScreen = () => {
    const [payments, setPayments] = useState([]);
    const [amount, setAmount] = useState('');
    
    // Replace this URL with your Vercel backend URL
    const API_URL = 'https://subscription-cyan.vercel.app/api/payments';

    const fetchPayments = async () => {
        try {
            const response = await axios.get(`${API_URL}/history`);
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payment history:', error);
            Alert.alert('Error', 'Failed to load payment history');
        }
    };

    const handleAddPayment = async (subscriptionId) => {
        try {
            await axios.post(API_URL, { subscriptionId, amount });
            setAmount(''); // Clear input after successful payment
            fetchPayments(); // Refresh payment history
            Alert.alert('Success', 'Payment added successfully');
        } catch (error) {
            console.error('Error adding payment:', error);
            Alert.alert('Error', 'Failed to add payment');
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Your Payment History</Text>
            <FlatList
                data={payments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Text>
                        {item.subscriptionId.name} - ${item.amount} on {new Date(item.date).toLocaleDateString()}
                    </Text>
                )}
                ListEmptyComponent={<Text>No payment history available.</Text>}
            />
            <TextInput
                placeholder="Enter amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 5,
                }}
            />
            <Button title="Add Payment" onPress={() => handleAddPayment('subscription_id_here')} /> {/* Replace with actual logic */}
        </View>
    );
};

export default PaymentScreen;
