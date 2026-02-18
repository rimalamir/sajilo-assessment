import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radii, spacing, typography } from "../theme";

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="alert-circle-outline" size={18} color={colors.danger} />
      <Text style={styles.text}>{message}</Text>
      {onRetry ? (
        <TouchableOpacity style={styles.retry} onPress={onRetry} activeOpacity={0.8}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: "#FFECEC",
  },
  text: {
    flex: 1,
    fontSize: typography.caption,
    color: colors.danger,
  },
  retry: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  retryText: {
    color: colors.danger,
    fontSize: typography.caption,
    fontWeight: "700",
  },
});
