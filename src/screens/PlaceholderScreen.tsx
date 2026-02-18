import React from 'react';
import { View, Text } from 'react-native';

const PlaceholderScreen = ({ name }: { name: string }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{name} Screen</Text>
    </View>
);

export default PlaceholderScreen;
