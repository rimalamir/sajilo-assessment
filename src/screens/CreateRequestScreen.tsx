import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useOrders } from '../context/OrderContext';
import { colors } from '../theme';
import { OfflineBanner } from '../components/OfflineBanner';

export default function CreateRequestScreen() {
    const navigation = useNavigation();
    const { addRequest, isOffline } = useOrders();

    const [recipient, setRecipient] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!recipient.trim()) newErrors.recipient = 'Recipient name is required';
        if (!address.trim()) newErrors.address = 'Address is required';
        if (!contact.trim()) newErrors.contact = 'Contact info is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;

        try {
            await addRequest({
                recipient,
                address,
                contact,
                notes,
                sender: 'Me',
            });

            if (isOffline) {
                Alert.alert('Saved locally', 'Your request has been saved and will sync when online.', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            } else {
                navigation.goBack();
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to save request. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <OfflineBanner />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Recipient Name</Text>
                        <TextInput
                            style={[styles.input, !!errors.recipient && styles.inputError]}
                            value={recipient}
                            onChangeText={setRecipient}
                            placeholder="Enter recipient's full name"
                            placeholderTextColor="#94a3b8"
                        />
                        {errors.recipient && (
                            <View style={styles.errorRow}>
                                <Ionicons name="alert-circle" size={14} color="#ef4444" />
                                <Text style={styles.errorText}>{errors.recipient}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Delivery Address</Text>
                        <TextInput
                            style={[styles.input, styles.multilineInput, !!errors.address && styles.inputError]}
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Enter full street address"
                            placeholderTextColor="#94a3b8"
                            multiline
                            numberOfLines={3}
                        />
                        {errors.address && (
                            <View style={styles.errorRow}>
                                <Ionicons name="alert-circle" size={14} color="#ef4444" />
                                <Text style={styles.errorText}>{errors.address}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Contact Number</Text>
                        <View style={styles.inputWithIcon}>
                            <Ionicons name="call-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, styles.inputWithIconField, !!errors.contact && styles.inputError]}
                                value={contact}
                                onChangeText={setContact}
                                placeholder="+977 980-000-0000"
                                placeholderTextColor="#94a3b8"
                                keyboardType="phone-pad"
                            />
                        </View>
                        {errors.contact && (
                            <View style={styles.errorRow}>
                                <Ionicons name="alert-circle" size={14} color="#ef4444" />
                                <Text style={styles.errorText}>{errors.contact}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Delivery Notes (Optional)</Text>
                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            value={notes}
                            onChangeText={setNotes}
                            placeholder="Add any special instructions (e.g., gate code)"
                            placeholderTextColor="#94a3b8"
                            multiline
                            numberOfLines={4}
                        />
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Request</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 120,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 8,
        color: colors.primary,
        paddingHorizontal: 4,
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        fontSize: 16,
        color: colors.primary,
    },
    inputWithIcon: {
        position: 'relative',
        justifyContent: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: 16,
        zIndex: 1,
    },
    inputWithIconField: {
        paddingLeft: 44,
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    inputError: {
        borderColor: '#ef4444',
    },
    errorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 6,
        paddingHorizontal: 4,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    saveButton: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '800',
    },
    cancelButton: {
        marginTop: 12,
        paddingVertical: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#64748b',
        fontSize: 14,
        fontWeight: '700',
    },
});
