import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import DashboardScreen from './DashboardScreen';
import AddSubscriptionScreen from './AddSubscriptionScreen';
import NotificationScreen from './NotificationScreen';
import PaymentScreen from './PaymentScreen';
import ProfileScreen from './ProfileScreen';
import AnalyticsScreen from './AnalyticsScreen';
import PreferencesScreen from './PreferencesScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="AddSubscription" component={AddSubscriptionScreen} />
                <Stack.Screen name="Notifications" component={NotificationScreen} />
                <Stack.Screen name="Payments" component={PaymentScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Analytics" component={AnalyticsScreen} />
                <Stack.Screen name="Preferences" component={PreferencesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;