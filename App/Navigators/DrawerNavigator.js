// React Native Essential imports
import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

// libraries imports
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';

// import screens
import MainScreen from '../Screens/MainScreen';
import HomeScreen from '../Screens/HomeScreen';
import CumulativeScreen from '../Screens/CumulativeScreen';
import FAQScreen from '../Screens/FAQScreen';
import GradingSytem from '../Screens/GradingSystem';
import ChartScreen from '../Screens/ChartScreen';
import AboutUs from '../Screens/AboutUs';
import PerformaceScreen from '../Screens/PerformanceScreen';

// cusotm imports
import Style from './DrawerNavigatorStyle';
import images from '../Assets/images';
import Colors from '../theme';

const Drawer = createDrawerNavigator();
// assinging drawer properties

const Stack = createNativeStackNavigator();
// assigning stack properties

// default theme of app
const MyTheme = {
  dark: true,
  colors: {
    primary: Colors.secondary,
    background: Colors.secondary,
  },
};

// Home stack is the stack navigator which stacks all the screens of app
function HomeStack() {
  return (
    <Stack.Navigator
      headerLayoutPreset="left"
      screenOptions={{
        headerShown: true,
      }}>
      {/* Main Screen of app or starting screen */}
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      {/* Home Screen is the screen where user can enter marks and credit hours */}
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitle: 'UGM System',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: Colors.secondary},
          headerTitleStyle: Style.mainTitle,
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: () => (
            // <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon
              onPress={() => navigation.goBack()}
              name="arrow-back"
              color={Colors.white}
              size={30}
            />
            // </TouchableWithoutFeedback>
          ),
          headerRight: () => (
            <Image
              source={images.appLogo}
              style={Style.rightImage}
              resizeMode="cover"
            />
          ),
        })}
      />
      {/* the screen is used to calculate the overall user semester grades */}
      <Stack.Screen
        name="CumulativeScreen"
        component={CumulativeScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerTitleAlign: 'left',
          headerTitleStyle: {marginLeft: Style.headerTitleMargin},
          headerStyle: {backgroundColor: Colors.secondary},
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: () => (
            // <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon
              onPress={() => navigation.goBack()}
              name="arrow-back"
              color={Colors.white}
              size={30}
            />
            // </TouchableWithoutFeedback>
          ),
          headerRight: () => (
            <Image
              source={images.appLogo}
              style={Style.rightImage}
              resizeMode="cover"
            />
          ),
        })}
      />
      {/* The screen contains the questions/bullets and an image of organization policies and regulations */}
      <Stack.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerTitleAlign: 'left',
          headerTitleStyle: {marginLeft: Style.headerTitleMargin},
          headerStyle: {backgroundColor: Colors.secondary},
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: () => (
            // <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon
              onPress={() => navigation.goBack()}
              name="arrow-back"
              color={Colors.white}
              size={30}
            />
            // </TouchableWithoutFeedback>
          ),
          headerRight: () => (
            <Image
              source={images.appLogo}
              style={Style.rightImage}
              resizeMode="cover"
            />
          ),
        })}
      />
      {/* The screen contains the pictorial/visualized form of policies */}
      <Stack.Screen
        name="GradingSystem"
        component={GradingSytem}
        options={({navigation}) => ({
          headerTitle: '',
          headerTitleAlign: 'left',
          headerTitleStyle: {marginLeft: Style.headerTitleMargin},
          headerStyle: {backgroundColor: Colors.secondary},
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: () => (
            // <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon
              onPress={() => navigation.goBack()}
              name="arrow-back"
              color={Colors.white}
              size={30}
            />
            // </TouchableWithoutFeedback>
          ),
          headerRight: () => (
            <Image
              source={images.appLogo}
              style={Style.rightImage}
              resizeMode="cover"
            />
          ),
        })}
      />
      {/* This is the screen which evaluates the user data into animated chart with clear explanation and percentages */}
      <Stack.Screen
        name="Chart"
        component={ChartScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerTitleAlign: 'left',
          headerTitleStyle: {marginLeft: Style.headerTitleMargin},
          headerStyle: {backgroundColor: Colors.secondary},
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: () => (
            // <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon
              onPress={() => navigation.goBack()}
              name="arrow-back"
              color={Colors.white}
              size={30}
            />
            // </TouchableWithoutFeedback>
          ),
          headerRight: () => (
            <View>
              <Image
                source={images.appLogo}
                style={Style.rightImage}
                resizeMode="cover"
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={({navigation}) => ({
          headerTitle: '',
          headerTitleAlign: 'left',
          headerTitleStyle: {marginLeft: Style.headerTitleMargin},
          headerStyle: {backgroundColor: Colors.secondaryBlack},
          headerShown: true,
          headerShadowVisible: false,
          statusBarColor: Colors.secondaryBlack,
          headerLeft: () => (
            // <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon
              onPress={() => navigation.goBack()}
              name="arrow-back"
              color={Colors.white}
              size={30}
            />
            // </TouchableWithoutFeedback>
          ),
          headerRight: () => (
            <Image
              source={images.appLogo}
              style={Style.rightImage}
              resizeMode="cover"
            />
          ),
        })}
      />
      {/* User can view the performance criteria based on the rules of organization */}
      <Stack.Screen
        name="PerformanceScreen"
        component={PerformaceScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerTitleAlign: 'left',
          headerTitleStyle: {marginLeft: Style.headerTitleMargin},
          headerStyle: {backgroundColor: Colors.secondaryBlack},
          headerShown: true,
          headerShadowVisible: false,
          statusBarColor: Colors.secondaryBlack,
          headerLeft: () => (
            // <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon
              onPress={() => navigation.goBack()}
              name="arrow-back"
              color={Colors.white}
              size={30}
            />
            // </TouchableWithoutFeedback>
          ),
          headerRight: () => (
            <Image
              source={images.appLogo}
              style={Style.rightImage}
              resizeMode="cover"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function DrawerStack() {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);
  return (
    <NavigationContainer theme={MyTheme}>
      {/* Main Screen of my app is MainScreen which is the very first screen displayed after splash screen */}
      <Drawer.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          headerShown: false,
        }}>
        {/* Define your drawer screens */}
        <Drawer.Screen name="Main" component={HomeStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerStack;
