// React Native essentials imports
import React from 'react';
import {View, StatusBar} from 'react-native';
import AppStack from './Navigators/AppNavigator';
import {ThemeProvider} from '../ThemeContext';

// custom imports
import Colors from './theme';
import Style from './AppStyle';

// Main launching screen which calls the drawer stack & then Main Screen is launched
const App = () => {
  return (
    <View style={Style.container}>
      <ThemeProvider>
        {/* Calling the app stack which contains stack navigators and screens */}
        <AppStack />
      </ThemeProvider>
    </View>
  );
};

export default App;
