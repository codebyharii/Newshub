import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message = 'Nothing to see here.' }) => {
  return (
    <View style={styles.container}>
      {/* We could use a local SVG or Image here as requested by spec */}
      <Text style={styles.emoji}>📭</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['6'],
    minHeight: 200,
  },
  emoji: {
    fontSize: 48,
    marginBottom: Spacing['4'],
  },
  text: {
    color: Colors.secondary,
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
  },
});
