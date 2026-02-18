import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

// Screens (Placeholder imports for now, will implement these next)
import OrderListScreen from '../screens/OrderListScreen';
import CreateRequestScreen from '../screens/CreateRequestScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import TrackingScreen from '../screens/TrackingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="OrderList"
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: '#F2F2F7' },
                }}
            >
                <Stack.Screen
                    name="OrderList"
                    component={OrderListScreen}
                    options={{ title: 'Orders' }}
                />
                <Stack.Screen
                    name="CreateRequest"
                    component={CreateRequestScreen}
                    options={{ title: 'New Delivery' }}
                />
                <Stack.Screen
                    name="OrderDetails"
                    component={OrderDetailsScreen}
                    options={{ title: 'Order Details' }}
                />
                <Stack.Screen
                    name="Tracking"
                    component={TrackingScreen}
                    options={{ title: 'Tracking' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
