import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from './src/redux/store';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from './src/theme';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider style={{ backgroundColor: Colors.bgBase }}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
