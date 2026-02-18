import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StatusBar,
    Platform
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useOrders } from '../context/OrderContext';
import { RootStackParamList } from '../types';
import { colors, theme } from '../theme';
import { StatusPill } from '../components/StatusPill';

type OrderDetailsRouteProp = RouteProp<RootStackParamList, 'OrderDetails'>;

export default function OrderDetailsScreen() {
    const route = useRoute<OrderDetailsRouteProp>();
    const navigation = useNavigation();
    const { orders } = useOrders();
    const { orderId } = route.params;

    const order = orders.find(o => o.id === orderId);

    if (!order) {
        return (
            <View style={styles.errorContainer}>
                <Text>Order not found</Text>
            </View>
        );
    }

    const getProgress = () => {
        switch (order.status) {
            case 'Pending': return '33%';
            case 'In Transit': return '66%';
            case 'Delivered': return '100%';
            default: return '0%';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Summary Card */}
                <View style={styles.card}>
                    <View style={styles.summaryHeader}>
                        <View>
                            <Text style={styles.summaryLabel}>Order Reference</Text>
                            <Text style={styles.orderId}>#{order.id}</Text>
                        </View>
                        <StatusPill status={order.status} />
                    </View>

                    <View style={styles.progressContainer}>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: getProgress() }]} />
                        </View>
                        <View style={styles.progressLabels}>
                            <Text style={styles.progressText}>Ordered</Text>
                            <Text style={styles.progressText}>In Transit</Text>
                            <Text style={[styles.progressText, order.status === 'Delivered' && styles.progressTextActive]}>Arrived</Text>
                        </View>
                    </View>
                </View>

                {/* Parties Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>PARTIES</Text>
                    <View style={styles.partiesContainer}>
                        <View style={styles.partyRow}>
                            <View style={styles.avatar}>
                                <Ionicons name="person" size={20} color={colors.primary} />
                            </View>
                            <View style={styles.partyInfo}>
                                <Text style={styles.partyLabel}>Sender</Text>
                                <Text style={styles.partyName}>{order.sender || '—'}</Text>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <View style={[styles.partyRow, { justifyContent: 'space-between' }]}>
                            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', flex: 1 }}>
                                <View style={styles.avatar}>
                                    <Ionicons name="pin" size={20} color={colors.primary} />
                                </View>
                                <View style={styles.partyInfo}>
                                    <Text style={styles.partyLabel}>Recipient</Text>
                                    <Text style={styles.partyName}>{order.recipient}</Text>
                                    <Text style={styles.partyContact}>{order.contact}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.callButton}>
                                <Ionicons name="call" size={18} color="#ffffff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Delivery Info Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>DELIVERY INFO</Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.addressRow}>
                            <View style={styles.addressIcon}>
                                <Ionicons name="location" size={18} color={colors.primary} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.partyLabel}>Address</Text>
                                <Text style={styles.addressText}>{order.address}</Text>
                            </View>
                        </View>

                        <View style={styles.timeline}>
                            <View style={styles.timelineItem}>
                                <View style={styles.timelineDot} />
                                <View style={styles.timelineLine} />
                                <View>
                                    <Text style={styles.timelineLabel}>Created</Text>
                                    <Text style={styles.timelineTime}>
                                        {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', 'hour': '2-digit', 'minute': '2-digit' })}
                                    </Text>
                                </View>
                            </View>
                            {order.status === 'Delivered' && (
                                <View style={styles.timelineItem}>
                                    <View style={[styles.timelineDot, { backgroundColor: colors.primary }]} />
                                    <View>
                                        <Text style={styles.timelineLabel}>Delivered</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                            <Text style={[styles.timelineTime, { fontWeight: '700', color: colors.primary }]}>
                                                Just now
                                            </Text>
                                            <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.reorderButton}>
                    <Ionicons name="sync" size={20} color="#ffffff" />
                    <Text style={styles.reorderButtonText}>Reorder</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        ...theme.shadows.sm,
    },
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    summaryLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: colors.mutedText,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    orderId: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.primary,
    },
    progressContainer: {
        marginTop: 8,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#f1f5f9',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#1a2a4766', // Muted primary as seen in Stitch
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    progressText: {
        fontSize: 12,
        color: colors.mutedText,
        fontWeight: '600',
    },
    progressTextActive: {
        color: colors.primary,
        fontWeight: '800',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: '800',
        color: colors.mutedText,
        letterSpacing: 2,
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    partiesContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(26, 42, 71, 0.05)',
    },
    partyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    partyInfo: {
        flex: 1,
    },
    partyLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.mutedText,
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    partyName: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.primary,
    },
    partyContact: {
        fontSize: 13,
        color: colors.mutedText,
        marginTop: 1,
    },
    callButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.md,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(26, 42, 71, 0.05)',
    },
    infoContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        gap: 16,
    },
    addressRow: {
        flexDirection: 'row',
        gap: 12,
    },
    addressIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addressText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
        lineHeight: 22,
    },
    timeline: {
        marginTop: 8,
    },
    timelineItem: {
        paddingLeft: 24,
        paddingBottom: 20,
        position: 'relative',
    },
    timelineDot: {
        position: 'absolute',
        left: 0,
        top: 4,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(26, 42, 71, 0.2)',
        zIndex: 1,
    },
    timelineLine: {
        position: 'absolute',
        left: 4,
        top: 14,
        bottom: 0,
        width: 2,
        backgroundColor: 'rgba(26, 42, 71, 0.1)',
    },
    timelineLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.mutedText,
    },
    timelineTime: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.primary,
        marginTop: 2,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    reorderButton: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 4,
    },
    reorderButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '800',
    },
});
