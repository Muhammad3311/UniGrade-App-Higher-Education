// React Native essentials imports
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppStack from './navigators/AppNavigator';
import {ThemeProvider} from './config';

// Main launching screen which calls the drawer stack & then Main Screen is launched
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        {/* Calling the app stack which contains stack navigators and screens */}
        <AppStack />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
