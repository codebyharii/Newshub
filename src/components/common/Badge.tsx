import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';

interface BadgeProps {
  label: string;
}

export const Badge: React.FC<BadgeProps> = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingVertical: Spacing['1'],
    paddingHorizontal: Spacing['2'],
    alignSelf: 'flex-start',
  },
  text: {
    color: Colors.textWhite,
    fontFamily: Typography.fontFamily.displayMedium,
    fontSize: Typography.fontSize.xs,
  },
});
