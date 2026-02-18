import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme, colors } from '../theme';
import { Order } from '../types';
import { StatusPill, PendingBadge } from './StatusPill';

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  // Determine if it's local based on ID or flag
  const isLocal = order.isLocal || order.id.startsWith('L-');

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.orderId}>#{order.id}</Text>
          {isLocal ? (
            <View style={styles.syncRow}>
              <PendingBadge />
            </View>
          ) : (
            <Text style={styles.timeText}>Updated 2 mins ago</Text>
          )}
        </View>
        <StatusPill status={order.status} />
      </View>

      <View style={styles.separator} />

      <View style={styles.grid}>
        <View style={styles.column}>
          <Text style={styles.label}>SENDER</Text>
          <Text style={styles.value} numberOfLines={1}>{order.sender}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>RECIPIENT</Text>
          <Text style={styles.value} numberOfLines={1}>{order.recipient}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(26, 42, 71, 0.05)',
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  syncRow: {
    marginTop: 4,
  },
  timeText: {
    fontSize: 12,
    color: colors.mutedText,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.mutedText,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
});
