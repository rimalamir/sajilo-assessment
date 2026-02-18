import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    Animated,
    PanResponder,
    Platform
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useOrders } from '../context/OrderContext';
import { RootStackParamList } from '../types';
import { colors, theme } from '../theme';
import { StatusPill } from '../components/StatusPill';

const { width, height } = Dimensions.get('window');

type TrackingRouteProp = RouteProp<RootStackParamList, 'Tracking'>;

const START_LOC = { latitude: 27.7172, longitude: 85.3240 };
const END_LOC = { latitude: 27.7218, longitude: 85.3320 };

export default function TrackingScreen() {
    const route = useRoute<TrackingRouteProp>();
    const navigation = useNavigation();
    const { orders } = useOrders();
    const { orderId } = route.params;

    const order = orders.find(o => o.id === orderId);
    const [position, setPosition] = useState(START_LOC);
    const [eta, setEta] = useState(order?.eta || '15 mins');
    const mapRef = useRef<MapView>(null);

    // Simulation logic
    useEffect(() => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 0.005;
            if (progress > 1) progress = 0;

            const newLat = START_LOC.latitude + (END_LOC.latitude - START_LOC.latitude) * progress;
            const newLng = START_LOC.longitude + (END_LOC.longitude - START_LOC.longitude) * progress;

            const newPos = { latitude: newLat, longitude: newLng };
            setPosition(newPos);

            // Simple ETA update simulation
            const minsLeft = Math.ceil(15 * (1 - progress));
            setEta(`${minsLeft} mins`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            {/* Map View */}
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    ...START_LOC,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                customMapStyle={mapStyle}
            >
                <Polyline
                    coordinates={[START_LOC, END_LOC]}
                    strokeColor={colors.primary}
                    strokeWidth={4}
                    lineDashPattern={[10, 5]}
                />

                <Marker coordinate={END_LOC}>
                    <View style={styles.destinationMarker}>
                        <Ionicons name="location" size={32} color="#ef4444" />
                    </View>
                </Marker>

                <Marker coordinate={position} anchor={{ x: 0.5, y: 0.5 }}>
                    <View style={styles.vehicleMarker}>
                        <View style={styles.pulseContainer}>
                            <View style={styles.pulse} />
                        </View>
                        <View style={styles.truckIcon}>
                            <Ionicons name="bicycle" size={24} color={colors.primary} />
                        </View>
                    </View>
                </Marker>
            </MapView>

            {/* Map Overlays */}
            <View style={styles.mapControls}>
                <TouchableOpacity style={styles.controlButton}>
                    <Ionicons name="locate" size={24} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, styles.followButton]}>
                    <Ionicons name="navigate" size={16} color="#ffffff" />
                    <Text style={styles.followText}>Follow</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Sheet */}
            <View style={styles.bottomSheet}>
                <View style={styles.dragHandle} />

                <View style={styles.sheetContent}>
                    <View style={styles.sheetHeader}>
                        <View>
                            <Text style={styles.sheetLabel}>ORDER ID</Text>
                            <Text style={styles.sheetOrderId}>#{order?.id || '—'}</Text>
                        </View>
                        <StatusPill status={order?.status || 'In Transit'} />
                    </View>

                    <View style={styles.estimateGrid}>
                        <View style={styles.estimateItem}>
                            <View style={styles.estimateIcon}>
                                <Ionicons name="time" size={20} color="#ffffff" />
                            </View>
                            <View>
                                <Text style={styles.estimateLabel}>Estimated Arrival</Text>
                                <Text style={styles.estimateValue}>{eta}</Text>
                            </View>
                        </View>
                        <View style={styles.gridSeparator} />
                        <View style={styles.distanceInfo}>
                            <Text style={styles.estimateLabel}>Distance</Text>
                            <Text style={styles.estimateValue}>2.4 km</Text>
                        </View>
                    </View>

                    <View style={styles.courierRow}>
                        <View style={styles.courierInfo}>
                            <View style={styles.courierAvatarContainer}>
                                <Image
                                    source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' }}
                                    style={styles.courierAvatar}
                                />
                                <View style={styles.verifiedBadge}>
                                    <Ionicons name="checkmark-circle" size={12} color="#ffffff" />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.courierName}>Robert Fox</Text>
                                <Text style={styles.courierRole}>Delivery Partner</Text>
                            </View>
                        </View>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.chatButton}>
                                <Ionicons name="chatbubble" size={18} color={colors.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.callButton}>
                                <Ionicons name="call" size={18} color="#ffffff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    map: {
        flex: 1,
    },
    destinationMarker: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    vehicleMarker: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    truckIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.md,
    },
    pulseContainer: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pulse: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
        backgroundColor: 'rgba(26, 42, 71, 0.2)',
    },
    mapControls: {
        position: 'absolute',
        bottom: 340,
        right: 16,
        gap: 12,
    },
    controlButton: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.md,
    },
    followButton: {
        flexDirection: 'row',
        width: 'auto',
        paddingHorizontal: 16,
        backgroundColor: colors.primary,
        gap: 8,
    },
    followText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '700',
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        ...theme.shadows.md,
        shadowOpacity: 0.15,
    },
    dragHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#e2e8f0',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    sheetContent: {
        paddingHorizontal: 24,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    sheetLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: colors.mutedText,
        letterSpacing: 1,
        marginBottom: 4,
    },
    sheetOrderId: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.primary,
    },
    estimateGrid: {
        flexDirection: 'row',
        backgroundColor: 'rgba(26, 42, 71, 0.04)',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(26, 42, 71, 0.08)',
        marginBottom: 24,
    },
    estimateItem: {
        flex: 1.2,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    estimateIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    estimateLabel: {
        fontSize: 12,
        color: colors.mutedText,
        fontWeight: '600',
    },
    estimateValue: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.primary,
    },
    gridSeparator: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(26, 42, 71, 0.1)',
        marginHorizontal: 4,
    },
    distanceInfo: {
        flex: 0.8,
        alignItems: 'flex-end',
    },
    courierRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courierInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    courierAvatarContainer: {
        position: 'relative',
    },
    courierAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f1f5f9',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: colors.success,
        borderWidth: 2,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    courierName: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.primary,
    },
    courierRole: {
        fontSize: 12,
        color: colors.mutedText,
        fontWeight: '500',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    chatButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(26, 42, 71, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    callButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.sm,
    },
});

const mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [{ "color": "#f5f5f5" }]
    },
    {
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#616161" }]
    }
];
