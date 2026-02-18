import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radii, spacing, typography } from "../theme";

type EmptyStateProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  onPress?: () => void;
};

export const EmptyState = ({ title, description, ctaLabel, onPress }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name="package-variant-closed" size={36} color={colors.mutedText} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {ctaLabel && onPress ? (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
          <Text style={styles.buttonText}>{ctaLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: spacing.lg,
    gap: spacing.sm,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFE6DC",
  },
  title: {
    fontSize: typography.subtitle,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    textAlign: "center",
    color: colors.mutedText,
    fontSize: typography.body,
  },
  button: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: typography.body,
  },
});
