// React Native essentials imports
import React from 'react';
import {View, StatusBar} from 'react-native';
import AppStack from './Navigators/AppNavigator';

// custom imports
import Colors from './theme';
import Style from './AppStyle';

// Main launching screen which calls the drawer stack & then Main Screen is launched
const App = () => {
  return (
    <View style={Style.container}>
      {/* Calling the app stack which contains stack navigators and screens */}
      <AppStack />
    </View>
  );
};

export default App;
