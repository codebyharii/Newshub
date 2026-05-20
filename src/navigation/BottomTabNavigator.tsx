import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { BookmarksScreen } from '../screens/BookmarksScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { BottomTabParamList } from './types';
import { Colors, Typography } from '../theme';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bgBase,
          height: 60,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.secondary,
        tabBarLabelStyle: {
          fontFamily: Typography.fontFamily.body,
          fontSize: Typography.fontSize.xs,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ color }) => <TabBarIcon icon="🏠" color={color} /> }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{ tabBarIcon: ({ color }) => <TabBarIcon icon="🔖" color={color} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <TabBarIcon icon="👤" color={color} /> }}
      />
    </Tab.Navigator>
  );
};

// Simple placeholder since we don't have vector icons configured
const TabBarIcon = ({ icon, color }: { icon: string; color: string }) => (
  <React.Fragment>
    <Text style={{ fontSize: 22, color }}>{icon}</Text>
  </React.Fragment>
);
