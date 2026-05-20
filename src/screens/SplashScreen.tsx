import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { RootState } from '../redux/rootReducer';
import { setHydrated } from '../redux/slices/uiSlice';
import { Colors, Typography, Spacing } from '../theme';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in Logo
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false, // width animation doesn't support native driver
    }).start(() => {
      // Simulate hydration/store ready
      dispatch(setHydrated());
      navigation.replace('Main', { screen: 'Home' });
    });
  }, [fadeAnim, progressAnim, dispatch, navigation]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Text style={styles.logo}>NewsHub</Text>
      </Animated.View>
      
      <View style={styles.loaderContainer}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
        <Text style={styles.hydratingText}>Hydrating local store…</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: Colors.textWhite,
    fontFamily: Typography.fontFamily.display,
    fontSize: Typography.fontSize['3xl'],
    marginBottom: 40,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 100,
    width: '80%',
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.bgSurface,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing['2'],
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  hydratingText: {
    color: Colors.secondary,
    fontFamily: Typography.fontFamily.body,
    fontSize: Typography.fontSize.sm,
  },
});
