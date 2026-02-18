export type OrderStatus = 'Pending' | 'In Transit' | 'Delivered' | 'Cancelled';

export interface Order {
    id: string;
    sender: string;
    recipient: string;
    address: string;
    contact: string;
    status: OrderStatus;
    isLocal: boolean;
    createdAt: string; // ISO string
    notes?: string;
    eta?: string;
    lastKnownLocation?: { latitude: number; longitude: number };
}

export type RootStackParamList = {
    OrderList: undefined;
    CreateRequest: undefined;
    OrderDetails: { orderId: string };
    Tracking: { orderId: string };
};
