// React Native Essential imports
import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TextInput, StatusBar} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {EasingNode} from 'react-native-reanimated';
import {Animated as RnAnimated} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import banner ads
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

// custom imports
import Style from './styles/MainScreenStyle';
import {Header} from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../config';
import {Colors, darkTheme, lightTheme} from '../constants';

// giving reference of the circulating circle or progress bar
const AnimatedCircle = RnAnimated.createAnimatedComponent(Circle);

// The Main Screen of app which launches first and of course you can also navigate to every screen of app
const MainScreen = () => {
  const insets = useSafeAreaInsets();
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

  // const adUnitId = 'ca-app-pub-5104848143569703/9884386694'; // real id
  const adUnitId = 'ca-app-pub-3940256099942544/9214589741'; // test id

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
          <Text
            allowFontScaling={false}
            style={[Style.leftComponentStyle, {color: theme.textColor}]}>
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
            allowFontScaling={false}
          />
        }
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        ...Style.container,
        backgroundColor: theme.backgroundColor,
        paddingBottom:
          insets.bottom == 0
            ? insets.bottom + responsiveHeight(10)
            : insets.bottom,
      }}>
      <StatusBar
        barStyle={theme.statusContent}
        backgroundColor={Colors.transparent}
        translucent
      />
      {renderHeader()}
      <View style={Style.adContainer}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
      <View style={Style.mainView}>
        <View style={Style.titleView}>
          <Text
            allowFontScaling={false}
            style={{...Style.title, color: theme.textColor}}>
            {welcomeMessage}
          </Text>
          <Text
            allowFontScaling={false}
            style={[Style.subTitle, {color: theme.textColor}]}>
            {ugmSystem}
          </Text>
        </View>
        <View>
          <Svg
            width={responsiveWidth(55)}
            height={responsiveWidth(55)}
            viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
            <G rotation={'-90'} origin={`${halfCircle}, ${halfCircle}`}>
              <Circle
                cx={'50%'}
                cy={'50%'}
                stroke={theme.chartBackground}
                strokeWidth={'8%'}
                r={responsiveWidth(27.5)}
                strokeOpacity={0.9}
                fill={'transparent'}
              />

              <AnimatedCircle
                ref={circleRef}
                cx={'50%'}
                cy={'50%'}
                stroke={Colors.primary}
                strokeWidth={'8%'}
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
            allowFontScaling={false}
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
          <Text
            allowFontScaling={false}
            style={[Style.titleMsg, {color: theme.textColor}]}>
            {successMessage}
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
