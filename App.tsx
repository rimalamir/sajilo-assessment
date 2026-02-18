import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OrderProvider } from './src/context/OrderContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <OrderProvider>
        <AppNavigator />
      </OrderProvider>
    </SafeAreaProvider>
  );
}
