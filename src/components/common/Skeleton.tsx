import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../theme';

export const Skeleton: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.bgSurface, Colors.secondary],
  });

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.title, { backgroundColor }]} />
      <Animated.View style={[styles.body, { backgroundColor }]} />
      <Animated.View style={[styles.body, { backgroundColor, width: '60%' }]} />
      
      <View style={styles.footer}>
        <Animated.View style={[styles.badge, { backgroundColor }]} />
        <Animated.View style={[styles.meta, { backgroundColor }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgSurface,
    borderRadius: 16,
    padding: Spacing['4'],
    marginBottom: Spacing['3'],
    marginHorizontal: Spacing['4'],
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    height: 20,
    width: '80%',
    borderRadius: 4,
    marginBottom: Spacing['3'],
  },
  body: {
    height: 14,
    width: '100%',
    borderRadius: 4,
    marginBottom: Spacing['2'],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing['3'],
  },
  badge: {
    height: 24,
    width: 60,
    borderRadius: 6,
  },
  meta: {
    height: 12,
    width: 100,
    borderRadius: 4,
  },
});
