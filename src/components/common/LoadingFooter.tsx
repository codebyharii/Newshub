import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../theme';

interface LoadingFooterProps {
  isLoading: boolean;
}

export const LoadingFooter: React.FC<LoadingFooterProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing['5'],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
