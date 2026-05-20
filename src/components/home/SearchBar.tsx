import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, onClear }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search posts..."
        placeholderTextColor={Colors.secondary}
        selectionColor={Colors.primary}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Text style={styles.clearIcon}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgSurface,
    borderRadius: 12,
    height: 48,
    marginHorizontal: Spacing['4'],
    marginBottom: Spacing['3'],
    paddingHorizontal: 14,
  },
  icon: {
    color: Colors.secondary,
    fontSize: 16,
    marginRight: Spacing['2'],
  },
  input: {
    flex: 1,
    color: Colors.textWhite,
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.base,
    height: '100%',
  },
  clearButton: {
    padding: Spacing['1'],
  },
  clearIcon: {
    color: Colors.secondary,
    fontSize: 20,
    lineHeight: 20,
  },
});
