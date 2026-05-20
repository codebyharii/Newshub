import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';

interface DetailHeaderProps {
  onBack: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({ onBack, onBookmark, isBookmarked }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.button}>
        <Text style={styles.icon}>← Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBookmark} style={styles.button}>
        <Text style={[styles.icon, isBookmarked && styles.activeIcon]}>
          {isBookmarked ? '♥ Saved' : '♡ Bookmark'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing['4'],
    paddingVertical: Spacing['3'],
    backgroundColor: Colors.bgBase,
  },
  button: {
    padding: Spacing['2'],
  },
  icon: {
    color: Colors.secondary,
    fontFamily: Typography.fontFamily.displayMedium,
    fontSize: Typography.fontSize.base,
  },
  activeIcon: {
    color: Colors.primary,
  }
});
