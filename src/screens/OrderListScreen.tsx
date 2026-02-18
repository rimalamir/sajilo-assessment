import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SectionList,
    RefreshControl,
    StatusBar,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useOrders } from '../context/OrderContext';
import { RootStackParamList, Order } from '../types';
import { OrderCard } from '../components/OrderCard';
import { OfflineBanner } from '../components/OfflineBanner';
import { FAB } from '../components/FAB';
import { EmptyState } from '../components/EmptyState';
import { colors, theme } from '../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OrderList'>;

export default function OrderListScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { orders, refreshing, refreshOrders, isOffline } = useOrders();

    const sections = useMemo(() => {
        const pendingLocal = orders.filter(o => o.isLocal);
        const others = orders.filter(o => !o.isLocal);

        const result = [];
        if (pendingLocal.length > 0) {
            result.push({ title: 'PENDING (LOCAL)', data: pendingLocal });
        }
        if (others.length > 0) {
            result.push({ title: 'ALL ORDERS', data: others });
        }
        return result;
    }, [orders]);

    const handleOrderPress = (order: Order) => {
        if (order.status === 'In Transit') {
            navigation.navigate('Tracking', { orderId: order.id });
        } else {
            navigation.navigate('OrderDetails', { orderId: order.id });
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <OfflineBanner />

            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <OrderCard
                            order={item}
                            onPress={() => handleOrderPress(item)}
                        />
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                )}
                contentContainerStyle={[
                    styles.listContent,
                    sections.length === 0 && { flex: 1, justifyContent: 'center' }
                ]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refreshOrders}
                        tintColor={colors.primary}
                    />
                }
                ListEmptyComponent={
                    <EmptyState
                        title="No orders yet"
                        description="Start by creating your first delivery request."
                        ctaLabel="Create Request"
                        onPress={() => navigation.navigate('CreateRequest')}
                    />
                }
            />

            <FAB onPress={() => navigation.navigate('CreateRequest')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    listContent: {
        paddingBottom: 100,
        paddingTop: 8,
    },
    cardWrapper: {
        paddingHorizontal: 16,
    },
    sectionHeader: {
        backgroundColor: colors.background,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 8,
    },
    sectionHeaderText: {
        fontSize: 10,
        fontWeight: '800',
        color: colors.mutedText,
        letterSpacing: 2,
    },
});
