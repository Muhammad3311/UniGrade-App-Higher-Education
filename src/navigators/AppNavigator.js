// React Native Essential imports
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StatusBar} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

// import screens
import {
  AboutUs,
  ChartScreen,
  CumulativeScreen,
  MainScreen,
  PerformaceScreen,
  CreateCustomScale,
  SemesterGpa,
} from '../screens';

import Icon from 'react-native-vector-icons/Ionicons';
import {CustomTabBar} from '../components';
import {Colors, darkTheme, lightTheme} from '../constants';
import {ThemeContext} from '../config';

// Assigning Stack & Tab properties
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

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

          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              allowFontScaling={false}
            />
          );
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="MainScreen" component={MainScreen} />
      <Tab.Screen name="HomeScreen" component={TopTabs} />
      <Stack.Screen name="PerformanceScreen" component={PerformaceScreen} />
      <Tab.Screen name="AboutUs" component={AboutUs} />
    </Tab.Navigator>
  );
}

function TopTabs() {
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  return (
    <TopTab.Navigator
      initialRouteName="SGPA"
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: Colors.primary},
        tabBarLabelStyle: {
          color: Colors.primary,
          fontFamily: 'Roboto-Medium',
          fontSize: responsiveFontSize(2.2),
        },
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
          elevation: 0,
          paddingTop: StatusBar.currentHeight,
        },
        tabBarPressOpacity: 1,
        tabBarPressColor: Colors.transparent,
      }}>
      <TopTab.Screen name="SGPA" component={SemesterGpa} />
      <TopTab.Screen name="CGPA" component={CumulativeScreen} />
    </TopTab.Navigator>
  );
}

// Home stack is the stack navigator which stacks all the screens of app
function HomeStack() {
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  // default theme of app
  const MyTheme = {
    dark: true,
    colors: {
      primary: theme.backgroundColor,
      background: theme.backgroundColor,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* Main Screen of app or starting screen */}
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="ChartScreen" component={ChartScreen} />
        <Stack.Screen name="CreateCustomScale" component={CreateCustomScale} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
