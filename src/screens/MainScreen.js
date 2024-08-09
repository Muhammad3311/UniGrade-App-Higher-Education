// React Native Essential imports
import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TextInput, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeContext} from '../config';
import {Colors, darkTheme, lightTheme} from '../constants';

// import banner ads
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

// library imports
import Animated, {EasingNode} from 'react-native-reanimated';
import {Animated as RnAnimated} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

// custom imports
import Style from './styles/MainScreenStyle';
import {Header} from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

// giving reference of the circulating circle or progress bar
const AnimatedCircle = RnAnimated.createAnimatedComponent(Circle);

// The Main Screen of app which launches first and of course you can also navigate to every screen of app
const MainScreen = ({navigation}) => {
  const {isDarkTheme, toggleTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  // main state variables
  const fadeAnim = new Animated.Value(0);
  const animatedValue = useRef(new RnAnimated.Value(0)).current;
  const circleRef = useRef();
  const inputRef = useRef();
  const halfCircle = 110 + 15;
  const radius = responsiveWidth(27.5);
  const circleCircumference = 2 * Math.PI * radius;
  const percentage = 100;
  const max = 100;
  const duration = 4000;
  const delay = 500;

  // The contant variables
  const welcomeMessage = 'Welcome To The';
  const ugmSystem = 'Gradify GPA Calculator';
  const successMessage = " You're one step away to track your success record";

  const adUnitId = 'ca-app-pub-5104848143569703/9884386694';

  // animation function for circle
  const animation = toValue => {
    return (
      RnAnimated.timing(animatedValue, {
        toValue,
        duration,
        delay,
        useNativeDriver: true,
      })
        //below code is for back & forth motion
        .start(() => {
          animation(toValue === 0 ? percentage : 0);
        })
    ); // starting animation
  };

  useEffect(() => {
    Animated.timing(
      fadeAnim, // The animated value to drive
      {
        toValue: 1, // Target opacity (1 means fully opaque)
        duration: 4000, // Animation duration in milliseconds
        easing: EasingNode.bounce, // Easing function for animation
        useNativeDriver: true, // Use the native driver for performance
      },
    ).start();

    animation(percentage); // starting animation

    animatedValue.addListener(v => {
      if (circleRef?.current) {
        const strokeDashoffset =
          circleCircumference - (circleCircumference * v.value) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}%`,
        });
      }
    });
    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, percentage, fadeAnim]);

  function renderHeader() {
    return (
      <Header
        title={''}
        containerStyle={Style.containerStyle}
        leftComponent={
          <Text style={[Style.leftComponentStyle, {color: theme.textColor}]}>
            Gradify GPA Calculator
          </Text>
        }
        rightComponent={
          <Icon
            name={isDarkTheme ? 'sunny' : 'moon'}
            size={responsiveWidth(7)}
            color={isDarkTheme ? Colors.white : Colors.primary}
            onPress={toggleTheme}
            style={Style.rightComponentStyle}
          />
        }
      />
    );
  }

  return (
    <SafeAreaView
      style={{...Style.container, backgroundColor: theme.backgroundColor}}>
      <StatusBar
        translucent
        barStyle={theme.statusContent}
        backgroundColor={'transparent'}
      />
      {renderHeader()}
      <View style={Style.adContainer}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
      <View style={Style.mainView}>
        <View style={Style.titleView}>
          <Text style={{...Style.title, color: theme.textColor}}>
            {welcomeMessage}
          </Text>
          <Text style={[Style.subTitle, {color: theme.textColor}]}>
            {ugmSystem}
          </Text>
        </View>
        {/* <View style={{height: 100, marginTop: 20}}>
        <PacmanIndicator size={100} color="#3664dc" />
      </View> */}
        <View>
          <Svg
            width={responsiveWidth(55)}
            height={responsiveWidth(55)}
            viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
            <G rotation={'-90'} origin={`${halfCircle}, ${halfCircle}`}>
              <Circle
                cx={'50%'}
                cy={'50%'}
                stroke={theme.backgroundColor}
                strokeWidth={responsiveWidth(5)}
                r={responsiveWidth(27.5)}
                strokeOpacity={0.9}
                fill={'transparent'}
              />

              <AnimatedCircle
                ref={circleRef}
                cx={'50%'}
                cy={'50%'}
                stroke={Colors.primary}
                strokeWidth={responsiveWidth(5)}
                r={responsiveWidth(27.5)}
                fill={'transparent'}
                strokeDasharray={circleCircumference}
                strokeDashoffset={circleCircumference}
                strokeLinecap="round"
              />
            </G>
          </Svg>
          <TextInput
            ref={inputRef}
            underlineColorAndroid={'transparent'}
            editable={false}
            caretHidden={false}
            defaultValue="0"
            style={[
              StyleSheet.absoluteFillObject,
              Style.graphText,
              {color: theme.textColor},
            ]}
          />
        </View>

        <Animated.View
          style={{
            opacity: fadeAnim,
          }}>
          <Text style={[Style.titleMsg, {color: theme.textColor}]}>
            {successMessage}
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
