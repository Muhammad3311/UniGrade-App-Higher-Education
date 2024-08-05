// React Native essentials imports
import React from 'react';
import AppStack from './navigators/AppNavigator';
import {ThemeProvider} from './config';

// Main launching screen which calls the drawer stack & then Main Screen is launched
const App = () => {
  return (
    <ThemeProvider>
      {/* Calling the app stack which contains stack navigators and screens */}
      <AppStack />
    </ThemeProvider>
  );
};

export default App;
