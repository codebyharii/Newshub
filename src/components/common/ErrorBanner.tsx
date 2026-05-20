import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';

interface ErrorBannerProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ error, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error}</Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.button}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.error,
    padding: Spacing['3'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: Spacing['4'],
    borderRadius: 8,
  },
  text: {
    color: Colors.textWhite,
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.sm,
    flex: 1,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing['3'],
    paddingVertical: Spacing['2'],
    borderRadius: 4,
    marginLeft: Spacing['3'],
  },
  buttonText: {
    color: Colors.textWhite,
    fontFamily: Typography.fontFamily.displayMedium,
    fontSize: Typography.fontSize.sm,
  },
});
