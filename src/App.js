// React Native essentials imports
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppStack from './navigators/AppNavigator';
import {ThemeProvider} from './config';
import {KeyboardProvider} from 'react-native-keyboard-controller';

// Main launching screen which calls the drawer stack & then Main Screen is launched
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <KeyboardProvider
          statusBarTranslucent={true}
          navigationBarTranslucent={true}>
          <AppStack />
        </KeyboardProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
