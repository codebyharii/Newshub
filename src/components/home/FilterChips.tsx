import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';

interface FilterChipsProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ categories, activeCategory, onSelect }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.listContent}
      style={styles.list}
      renderItem={({ item }) => {
        const isActive = item === activeCategory;
        return (
          <TouchableOpacity
            style={[styles.chip, isActive && styles.activeChip]}
            onPress={() => onSelect(item)}
            activeOpacity={0.7}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>{item}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    maxHeight: 40,
    marginBottom: Spacing['3'],
  },
  listContent: {
    paddingHorizontal: Spacing['4'],
    alignItems: 'center',
  },
  chip: {
    backgroundColor: Colors.bgSurface,
    borderWidth: 1,
    borderColor: Colors.secondary,
    paddingVertical: Spacing['2'],
    paddingHorizontal: Spacing['4'],
    borderRadius: 20,
    marginRight: Spacing['2'],
  },
  activeChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  text: {
    color: Colors.secondary,
    fontFamily: Typography.fontFamily.displayMedium,
    fontSize: Typography.fontSize.sm,
  },
  activeText: {
    color: Colors.textWhite,
  },
});
