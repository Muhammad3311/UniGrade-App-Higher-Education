// React Native Essential imports
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// library imports
import Animated, {EasingNode} from 'react-native-reanimated';
import {Animated as RnAnimated} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

// custom imports
import Loader from '../Loader/Loader';
import Style from './styles/MainScreenStyle';
import Colors from '../theme';

// giving reference of the circulating circle or progress bar
const AnimatedCircle = RnAnimated.createAnimatedComponent(Circle);
const AnimatedInput = RnAnimated.createAnimatedComponent(TextInput);

// The Main Screen of app which launches first and of course you can also navigate to every screen of app
const MainScreen = ({navigation}) => {
  // main state variables
  const [showLoader, setShowLoader] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const animatedValue = useRef(new RnAnimated.Value(0)).current;
  const circleRef = useRef();
  const inputRef = useRef();
  const halfCircle = 110 + 15;
  const circleCircumference = 2 * Math.PI * 110;
  const percentage = 100;
  const max = 100;
  const duration = 4000;
  const delay = 500;

  // The contant variables
  const welcomeMessage = 'Welcome To';
  const ugmSystem = 'UGM System';
  const successMessage = " You're one step away to track your success record";

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

  // navigating function
  const navigateToRoute = route => {
    setShowLoader(true);
    navigation.navigate(route);
    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  };
  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.titleView}>
        <Text style={Style.title}>{welcomeMessage}</Text>
        <Text style={[Style.title, Style.marginTopView]}>{ugmSystem}</Text>
      </View>
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}>
        <Text style={[Style.titleMsg, Style.titleMsgView]}>
          {successMessage}
        </Text>
      </Animated.View>

      {/* <View style={{height: 100, marginTop: 20}}>
        <PacmanIndicator size={100} color="#3664dc" />
      </View> */}
      <View style={Style.graphView}>
        <Svg
          width={220} // Updated for a circle diameter of 220
          height={220} // Updated for a circle diameter of 220
          viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
          <G rotation={'-90'} origin={`${halfCircle}, ${halfCircle}`}>
            {/* for starting circle from 90 and perform this in Group G tag*/}
            <Circle
              cx={'50%'}
              cy={'50%'}
              stroke={Colors.black}
              strokeWidth={20} // Updated for a stroke width of 15
              r={110} // Updated for a circle radius of 110
              strokeOpacity={0.9}
              fill={'transparent'}
            />

            <AnimatedCircle
              ref={circleRef}
              cx={'50%'}
              cy={'50%'}
              stroke={Colors.primary}
              strokeWidth={20} // Updated for a stroke width of 30
              r={110} // Updated for a circle radius of 110
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
          style={[StyleSheet.absoluteFillObject, Style.graphText]}
        />
      </View>

      <View style={Style.buttonView}>
        <TouchableOpacity
          style={Style.button}
          onPress={() => navigateToRoute('HomeScreen')}>
          <Text style={Style.buttonText}>SGPA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Style.button}
          onPress={() => navigateToRoute('CumulativeScreen')}>
          <Text style={Style.buttonText}>CGPA</Text>
        </TouchableOpacity>
      </View>
      <View style={Style.buttonView}>
        <TouchableOpacity
          style={Style.button}
          onPress={() => navigateToRoute('FAQScreen')}>
          <Text style={Style.buttonText}>FAQs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Style.button}
          onPress={() => navigateToRoute('GradingSystem')}>
          <Text style={Style.buttonText}>Grade Policy</Text>
        </TouchableOpacity>
      </View>
      <View style={Style.buttonView}>
        <TouchableOpacity
          style={Style.button}
          onPress={() => navigateToRoute('AboutUs')}>
          <Text style={Style.buttonText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Style.button}
          onPress={() => navigateToRoute('PerformanceScreen')}>
          <Text style={Style.buttonText}>Grades Chart</Text>
        </TouchableOpacity>
      </View>
      {showLoader && <Loader />}
    </SafeAreaView>
  );
};

export default MainScreen;
