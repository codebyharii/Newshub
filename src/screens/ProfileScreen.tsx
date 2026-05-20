import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../theme';

export const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.placeholder}>User settings and app info will appear here.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase,
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: Spacing['4'],
    paddingBottom: Spacing['4'],
  },
  headerTitle: {
    color: Colors.textWhite,
    fontFamily: Typography.fontFamily.display,
    fontSize: Typography.fontSize['2xl'],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['4'],
  },
  placeholder: {
    color: Colors.secondary,
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
  },
});
