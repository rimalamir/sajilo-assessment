import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { OrderStatus } from '../types';

interface StatusPillProps {
  status: OrderStatus;
}

const getStatusConfig = (status: OrderStatus) => {
  switch (status) {
    case 'In Transit':
      return {
        ...colors.status.inTransit,
        icon: 'bicycle' as const
      };
    case 'Delivered':
      return {
        ...colors.status.delivered,
        icon: 'checkmark-circle' as const
      };
    case 'Pending':
      return {
        ...colors.status.pending,
        icon: 'time' as const
      };
    case 'Cancelled':
      return {
        ...colors.status.cancelled,
        icon: 'close-circle' as const
      };
    default:
      return {
        bg: '#f8fafc',
        text: '#64748b',
        border: '#e2e8f0',
        icon: 'help-circle' as const
      };
  }
};

export const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const config = getStatusConfig(status);

  return (
    <View style={[styles.container, { backgroundColor: config.bg, borderColor: config.border }]}>
      <Text style={[styles.text, { color: config.text }]}>{status.toUpperCase()}</Text>
    </View>
  );
};

export const PendingBadge: React.FC = () => (
  <View style={styles.pendingBadge}>
    <Ionicons name="cloud-offline" size={14} color={colors.status.pending.text} />
    <Text style={styles.pendingText}>Not synced</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pendingText: {
    fontSize: 12,
    color: colors.status.pending.text,
    fontWeight: '600',
  },
});
