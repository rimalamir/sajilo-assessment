import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order } from '../types';
import { saveOrders, loadOrders } from '../utils/storage';
import { mockOrders } from '../data/mockOrders';
import NetInfo from '@react-native-community/netinfo';

interface OrderContextType {
    orders: Order[];
    addRequest: (order: Omit<Order, 'id' | 'createdAt' | 'isLocal' | 'status'>) => Promise<void>;
    refreshOrders: () => Promise<void>;
    refreshing: boolean;
    isOffline: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
        });

        // Initial Load
        loadInitialData();

        return () => unsubscribe();
    }, []);

    const loadInitialData = async () => {
        const localOrders = await loadOrders();
        // In a real app, we would fetch remote orders here and merge.
        // For now, we combine local pending + mock remote orders.
        // Priority: Local Pending -> In Transit -> Others.

        // Filter out local orders that might be duplicates or handle sync logic if we had a backend.
        // For this assessment, we assume localOrders are strictly pending/offline created ones.
        const mergedOrders = [...localOrders, ...mockOrders];
        setOrders(sortOrders(mergedOrders));
    };

    const sortOrders = (ordersToSort: Order[]) => {
        return ordersToSort.sort((a, b) => {
            // 1. Pending Local first
            if (a.isLocal && !b.isLocal) return -1;
            if (!a.isLocal && b.isLocal) return 1;

            // 2. In Transit next (if not local)
            if (a.status === 'In Transit' && b.status !== 'In Transit') return -1;
            if (a.status !== 'In Transit' && b.status === 'In Transit') return 1;

            // 3. Most recent first
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    };

    const addRequest = async (newOrderData: Omit<Order, 'id' | 'createdAt' | 'isLocal' | 'status'>) => {
        const newOrder: Order = {
            ...newOrderData,
            id: `L-${Date.now().toString().slice(-4)}`, // Simple local ID generation
            createdAt: new Date().toISOString(),
            status: 'Pending',
            isLocal: true,
        };

        const updatedOrders = [newOrder, ...orders];
        const sortedOrders = sortOrders(updatedOrders);

        setOrders(sortedOrders);

        // Save ONLY local orders to storage
        const localOnly = sortedOrders.filter(o => o.isLocal);
        await saveOrders(localOnly);
    };

    const refreshOrders = async () => {
        setRefreshing(true);
        // Simulate fetching remote data
        const localOrders = orders.filter(o => o.isLocal);
        const merged = [...localOrders, ...mockOrders];
        setOrders(sortOrders(merged));

        // Brief timeout to show the spinner
        setTimeout(() => setRefreshing(false), 500);
    };

    return (
        <OrderContext.Provider value={{ orders, addRequest, refreshOrders, refreshing, isOffline }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};
