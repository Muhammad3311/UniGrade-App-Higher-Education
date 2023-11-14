// React Native essentials imports
import React from 'react';
import {View, StatusBar} from 'react-native';
import DrawerStack from './Navigators/DrawerNavigator';

// custom imports
import Colors from './theme';
import Style from './AppStyle';

// Main launching screen which calls the drawer stack & then Main Screen is launched
const App = () => {
  return (
    <View style={Style.container}>
      {/* Status bar color should be apply in order to control the flow of app theme */}
      <StatusBar backgroundColor={Colors.secondary} barStyle="light-content" />
      {/* Calling the drawer stack which contains stack navigators and screens */}
      <DrawerStack />
    </View>
  );
};

export default App;
