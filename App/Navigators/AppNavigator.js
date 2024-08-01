// React Native Essential imports
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from 'react-native-splash-screen';

// import screens
import MainScreen from '../Screens/MainScreen';
import HomeScreen from '../Screens/HomeScreen';
import CumulativeScreen from '../Screens/CumulativeScreen';
import ChartScreen from '../Screens/ChartScreen';
import AboutUs from '../Screens/AboutUs';
import PerformaceScreen from '../Screens/PerformanceScreen';

import Colors from '../theme';
import CustomTabBar from '../Components/CustomTabBar';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
// assigning stack properties
const Tab = createBottomTabNavigator();

// default theme of app
const MyTheme = {
  dark: true,
  colors: {
    primary: Colors.secondary,
    background: Colors.secondary,
  },
};

function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'MainScreen':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'HomeScreen':
              iconName = focused ? 'rocket' : 'rocket-outline';
              break;
            case 'PerformanceScreen':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'AboutUs':
              iconName = focused ? 'link' : 'link-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="MainScreen" component={MainScreen} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PerformanceScreen" component={PerformaceScreen} />
      <Tab.Screen name="AboutUs" component={AboutUs} />
    </Tab.Navigator>
  );
}

// Home stack is the stack navigator which stacks all the screens of app
function HomeStack() {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* Main Screen of app or starting screen */}
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="ChartScreen" component={ChartScreen} />
        <Tab.Screen name="CumulativeScreen" component={CumulativeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
