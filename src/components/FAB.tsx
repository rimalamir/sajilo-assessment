import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, theme } from '../theme';

interface FABProps {
    onPress: () => void;
}

export const FAB: React.FC<FABProps> = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.85}
            accessibilityLabel="Create new delivery request"
            accessibilityRole="button"
        >
            <Ionicons name="add" size={32} color="#FFFFFF" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.md,
        // Custom extra-deep shadow for FAB to match Stitch
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
    },
});
