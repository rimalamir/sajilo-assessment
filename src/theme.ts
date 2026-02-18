export const colors = {
  primary: '#1a2a47',
  secondary: '#5856D6',
  background: '#f6f7f8',
  surface: '#ffffff',
  text: '#1a2a47',
  textSecondary: '#64748b',
  mutedText: '#94a3b8',
  border: '#e2e8f0',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  danger: '#ef4444',

  status: {
    pending: {
      bg: '#fff7ed',
      text: '#ea580c',
      border: '#ffedd5',
    },
    inTransit: {
      bg: '#eff6ff',
      text: '#2563eb',
      border: '#dbeafe',
    },
    delivered: {
      bg: '#f0fdf4',
      text: '#16a34a',
      border: '#dcfce7',
    },
    cancelled: {
      bg: '#fef2f2',
      text: '#dc2626',
      border: '#fee2e2',
    }
  }
};

export const spacing = {
  xs: 4,
  s: 8,
  sm: 8,
  m: 16,
  md: 16,
  lg: 24,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  title: 24,
  subtitle: 18,
  body: 16,
  caption: 12,
  tiny: 10,
};

export const radii = {
  s: 4,
  m: 8,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 999,
};

export const theme = {
  colors,
  spacing,
  typography: {
    title: { fontSize: 24, fontWeight: '700' as const },
    subtitle: { fontSize: 18, fontWeight: '600' as const },
    body: { fontSize: 16, fontWeight: '400' as const },
    caption: { fontSize: 12, fontWeight: '500' as const },
  },
  borderRadius: radii,
  shadows: {
    sm: {
      shadowColor: '#1a2a47',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#1a2a47',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }
  }
};
