// React Native Essential imports
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// library imports
import {FlatList} from 'react-native-gesture-handler';
import Svg, {G, Circle} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewShot, {captureScreen} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Toast, {BaseToast} from 'react-native-toast-message';
// custom imports
import Style from './styles/ChartScreenStyle';
import {Header} from '../components';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import {ThemeContext} from '../config';
import {Colors, darkTheme, lightTheme} from '../constants';
import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const adUnitId = 'ca-app-pub-5104848143569703/9692815003';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['education', 'books', 'learning', 'productivity', 'study'],
  requestNonPersonalizedAdsOnly: true,
});

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ChartScreen = ({route, navigation}) => {
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const [image, setImage] = useState('');
  //const data = route.params.data; // incoming data from multiple
  const {data, source} = route.params;
  const [gpaType, setGpaType] = useState('___');
  const totalSum = data.totalSum;
  const totalChPoints = data.newChPoints;
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const halfCircle = 110 + 15;
  const circleCircumference = 2 * Math.PI * 110;
  const percentage = (totalSum / 4) * 100;
  const remainingPercentage = (100 - percentage).toFixed(2);
  const max = 100;
  const duration = 1000;
  const delay = 0;
  const chartArray = [
    {id: 1, type: 'Your Score', value: totalSum},
    {id: 2, type: 'Total Cr Hrs', value: totalChPoints},
    // {id: 3, type: 'Total Sgp Points', value: totalSgpPoints},
    {id: 3, type: 'Aim to Achieve ', value: `${remainingPercentage}%`},
  ];
  const ref = useRef();
  const [loaded, setLoaded] = useState(false);
  const [shareClickCounter, setShareClickCounter] = useState(0);

  useEffect(() => {
    const loadAd = () => {
      interstitial.load();
    };

    const onAdLoaded = () => {
      setLoaded(true);
    };

    const onAdClosed = () => {
      setLoaded(false);
      loadAd();
    };

    interstitial.addAdEventListener(AdEventType.LOADED, onAdLoaded);
    interstitial.addAdEventListener(AdEventType.CLOSED, onAdClosed);

    loadAd();

    return () => {
      interstitial.removeAllListeners();
    };
  }, []);

  // function which will capture screen and save the screenshot to gallery
  const takeScreenShot = async () => {
    try {
      const uri = await captureScreen({
        format: 'jpg',
        quality: 0.2,
      });

      const pictureDirectory = RNFS.PicturesDirectoryPath;
      const timestamp = new Date().getTime(); // Get current timestamp
      const fileName = `Screenshot_${timestamp}.jpg`; // Use timestamp in filename
      const filePath = `${pictureDirectory}/${fileName}`;
      RNFS.copyFile(uri, filePath);
      setImage(filePath); // setting image to state variables

      // modern toast messages are implementated for success / failure alerts
      Toast.show({
        type: 'success',
        text1: 'Image saved to gallery',
        position: 'bottom',
        bottomOffset: 100,
        // And I can pass any custom props I want
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Image failed to save',
        position: 'bottom',
        bottomOffset: 100,
      });
    }
  };
  const toastConfig = {
    success: props => (
      <BaseToast
        text1={props.text1}
        style={{
          borderLeftColor:
            props.text1 === 'Image saved to gallery'
              ? Colors.primary
              : Colors.redColor,
          backgroundColor: theme.backgroundColorHome,
          color: Colors.primary,
        }}
        contentContainerStyle={Style.contentContainer}
        text1Style={[Style.contentContainerText, {color: theme.textColor}]}
      />
    ),
    error: props => (
      <BaseToast
        text1={props.text1}
        style={{
          borderLeftColor:
            props.text1 === 'Image saved to gallery'
              ? Colors.primary
              : Colors.redColor,
          backgroundColor: theme.backgroundColorHome,
          color: Colors.primary,
        }}
        contentContainerStyle={Style.contentContainer}
        text1Style={[Style.contentContainerText, {color: theme.textColor}]}
      />
    ),
  };

  const animation = toValue => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (source == 'HomeScreen') {
      setGpaType('Semester');
    } else if (source == 'CumulativeScreen') {
      setGpaType('Cumulative');
    }
  }, [source]);

  useEffect(() => {
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
          text: `${totalSum}`,
        });
      }
    });
    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, percentage]);

  // Function to share app name and results
  const shareResults = async () => {
    setShareClickCounter(shareClickCounter + 1);

    if (shareClickCounter % 2 === 1 && loaded) {
      interstitial.show();
    }

    try {
      await Share.open({
        title: 'Share Results',
        message: `Check out my results on MyApp!\nYour Score: ${totalSum}\nSgp Points: ${totalChPoints}\nAim to Achieve: ${remainingPercentage}%`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to share',
        position: 'bottom',
        bottomOffset: 100,
      });
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={Style.flatlistView}>
        <Text
          style={[
            Style.renderText,
            {
              color:
                item.value === `${remainingPercentage}%`
                  ? Colors.black
                  : Colors.primary && item.value === totalChPoints
                  ? Colors.white
                  : Colors.primary,
            },
          ]}>
          ●
        </Text>
        <View style={Style.flatlistTextView}>
          <Text style={[Style.flatlistText, {color: theme.textColor}]}>
            {item.type}
          </Text>
          <Text style={[Style.flatlistText, {color: theme.textColor}]}>
            {item.value}
          </Text>
        </View>
      </View>
    );
  };

  function renderHeader() {
    return (
      <Header
        title={`Your ${gpaType} GPA Score`}
        noOfLines={1}
        titleStyle={{...Style.titleStyle, color: theme.textColor}}
        containerStyle={Style.containerStyle}
        leftComponent={
          <IonIcon
            name="arrow-back"
            onPress={() => navigation.goBack()}
            size={responsiveWidth(7)}
            color={theme.textColor}
            style={{left: 15}}
          />
        }
        rightComponent={
          <IonIcon
            name="share-social-outline"
            onPress={shareResults}
            size={responsiveWidth(7)}
            color={theme.textColor}
            style={{right: 15}}
          />
        }
      />
    );
  }

  return (
    <SafeAreaView
      style={[Style.container, {backgroundColor: theme.backgroundColorHome}]}>
      {renderHeader()}
      <View style={Style.marginView}>
        <Svg
          width={responsiveWidth(55)} // Updated for a circle diameter of 220
          height={responsiveWidth(55)} // Updated for a circle diameter of 220
          viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
          <G rotation={'-90'} origin={`${halfCircle}, ${halfCircle}`}>
            {/* for starting circle from 90 and perform this in Group G tag*/}
            <Circle
              cx={'50%'}
              cy={'50%'}
              stroke={Colors.black}
              strokeWidth={responsiveWidth(7)} // Updated for a stroke width of 30
              r={110} // Updated for a circle radius of 110
              strokeOpacity={0.9}
              fill={'transparent'}
            />

            <AnimatedCircle
              ref={circleRef}
              cx={'50%'}
              cy={'50%'}
              stroke={Colors.primary}
              strokeWidth={30} // Updated for a stroke width of 30
              r={110} // Updated for a circle radius of 110
              fill={'transparent'}
              strokeDasharray={circleCircumference}
              strokeDashoffset={circleCircumference}
              strokeLinecap="butt"
            />
          </G>
        </Svg>
        <TextInput
          ref={inputRef}
          caretHidden={false}
          underlineColorAndroid={'transparent'}
          editable={false}
          defaultValue="0"
          style={[
            StyleSheet.absoluteFillObject,
            Style.progressText,
            {color: theme.textColor},
          ]}
        />
      </View>
      <View
        style={[
          Style.middleView,
          {backgroundColor: theme.backgroundColorHome},
        ]}>
        <View>
          <FlatList
            data={chartArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>

        <View
          style={[
            Style.mainPercentView,
            {backgroundColor: theme.backgroundColorHome},
          ]}>
          <Text style={Style.percentageText}>Percentage</Text>
          <Text style={[Style.percentage, {color: theme.textColor}]}>
            {percentage.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View
        style={[Style.percentView, {backgroundColor: theme.innerContainer}]}>
        <Text style={[Style.saveText, {color: theme.textColor}]}>
          Save Your Result
        </Text>
        <TouchableOpacity onPress={takeScreenShot}>
          <Icon
            style={Style.iconStyle}
            name="login"
            size={responsiveWidth(10)}
            color={theme.textColor}
          />
        </TouchableOpacity>
      </View>
      <Toast config={toastConfig} />
      <ViewShot
        style={Style.viewShot}
        onCapture={captureScreen}
        ref={ref}></ViewShot>
    </SafeAreaView>
  );
};

export default ChartScreen;
