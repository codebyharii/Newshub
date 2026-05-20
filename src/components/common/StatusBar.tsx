import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { Colors } from '../../theme';

export const StatusBar: React.FC = () => {
  return (
    <RNStatusBar
      barStyle="light-content"
      backgroundColor={Colors.bgBase}
    />
  );
};
