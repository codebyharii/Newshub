import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { User } from '../../types/User';

interface MetaRowProps {
  user: User | null;
}

export const MetaRow: React.FC<MetaRowProps> = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>👤 {user ? user.name : 'Loading...'}</Text>
      <Text style={styles.text}>📅 Today</Text>
      <Text style={styles.text}>⏱ 4m</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing['4'],
    marginVertical: Spacing['3'],
  },
  text: {
    color: Colors.secondary,
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.xs,
  },
});
