import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order } from '../types';

const STORAGE_KEY = '@mini_delivery_app_orders';

export const saveOrders = async (orders: Order[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(orders);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save orders to storage', e);
  }
};

export const loadOrders = async (): Promise<Order[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load orders from storage', e);
    return [];
  }
};
