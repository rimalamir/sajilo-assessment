import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useOrders } from '../context/OrderContext';

export const OfflineBanner: React.FC = () => {
  const { isOffline, orders } = useOrders();
  const localOrdersCount = orders.filter(o => o.isLocal).length;

  if (!isOffline || localOrdersCount === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons name="cloud-off" size={20} color="#ca8a04" />
        <View style={styles.textColumn}>
          <Text style={styles.title}>You're offline.</Text>
          <Text style={styles.subtitle}>
            {localOrdersCount} pending request{localOrdersCount !== 1 ? 's' : ''} — will sync when online
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fefce8',
    borderBottomWidth: 1,
    borderBottomColor: '#fef08a',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  textColumn: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#854d0e',
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(133, 77, 14, 0.8)',
  }
});
