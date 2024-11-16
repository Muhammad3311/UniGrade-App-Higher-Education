// React Native Essential imports
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StatusBar} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {LineChart} from 'react-native-chart-kit';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import {RewardedAd, RewardedAdEventType} from 'react-native-google-mobile-ads';

// custom imports
import {commonGPAConfigScale4} from '../constants';
import Style from './styles/PerformanceScreenStyle';
import {ThemeContext} from '../config';
import {Colors, darkTheme, lightTheme} from '../constants';

// const adUnitIdRewarded = 'ca-app-pub-5104848143569703/1431181608';

// const rewarded = RewardedAd.createForAdRequest(adUnitIdRewarded, {
//   keywords: ['education', 'books', 'learning', 'productivity', 'study'],
//   requestNonPersonalizedAdsOnly: true,
// });

const PerformaceScreen = () => {
  const insets = useSafeAreaInsets();
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const [chartdata, setChartData] = useState([]);
  // const [adLoaded, setAdLoaded] = useState(false);
  // preparing and loading ads
  // React.useEffect(() => {
  //   const unsubscribeLoaded = rewarded.addAdEventListener(
  //     RewardedAdEventType.LOADED,
  //     () => {
  //       setAdLoaded(true);
  //       rewarded.show();
  //     },
  //   );
  //   const unsubscribeEarned = rewarded.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     reward => {
  //       //console.log('User earned reward of ', reward);
  //     },
  //   );
  //   rewarded.load();
  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeEarned();
  //   };
  // }, []);

  useEffect(() => {
    setChartData(commonGPAConfigScale4);
  }, []);

  const chartConfig = React.useMemo(
    () => ({
      backgroundColor: theme.chartBackground,
      backgroundGradientFrom: theme.chartGradientFrom,
      backgroundGradientTo: theme.chartGradientTo,
      color: (opacity = 1) =>
        isDarkTheme
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) =>
        isDarkTheme
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 15,
      },
      propsForDots: {
        r: '6',
        strokeWidth: '3',
        stroke: Colors.primary,
      },
    }),
    [isDarkTheme, theme],
  );

  const renderItem = React.useCallback(
    ({item, index}) => {
      return (
        <View key={index} style={Style.flatListView}>
          <View style={Style.textView}>
            <Text
              allowFontScaling={false}
              style={[
                Style.textStyle,
                {
                  color:
                    item.marksRange == '90-100'
                      ? Colors.primary
                      : theme.lightTextColor,
                },
              ]}>
              ●
            </Text>
          </View>
          <View style={Style.topText}>
            <Text
              allowFontScaling={false}
              style={[Style.flatListText, {color: theme.textColor}]}>
              {item.marksRange}
            </Text>
          </View>
          <View style={Style.topTextSecond}>
            <Text
              allowFontScaling={false}
              style={[Style.flatListText, {color: theme.textColor}]}>
              {item.letterGrade}
            </Text>
          </View>
        </View>
      );
    },
    [theme],
  );

  return (
    <SafeAreaView
      style={[
        Style.container,
        {
          backgroundColor: theme.backgroundColor,
          paddingBottom:
            insets.bottom == 0
              ? +responsiveHeight(10)
              : insets.bottom + responsiveHeight(3),
        },
      ]}>
      <StatusBar
        barStyle={theme.statusContent}
        backgroundColor={Colors.transparent}
      />
      <View>
        <Text
          allowFontScaling={false}
          style={[Style.mainTitle, {color: theme.textColor}]}>
          Grade Point Average Chart
        </Text>
        <Text allowFontScaling={false} style={Style.mainSubTitle}>
          Worldwide Common Scale - 4
        </Text>
        <LineChart
          animate={true}
          duration={5000}
          data={{
            labels: [
              '2.70',
              '1.00',
              '2.00',
              '1.50',
              '4.00',
              '3.50',
              '1.50',
              '3.00',
              '2.00',
            ],

            datasets: [
              {
                data: [55, 30, 45, 20, 100, 75, 35, 70, 25],
              },
            ],
          }}
          width={responsiveWidth(100) - 20} // from react-native
          height={responsiveHeight(100) / 3}
          chartConfig={chartConfig}
          bezier
          style={Style.chartStyle}
        />
      </View>
      <FlatList
        data={chartdata}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{flexGrow: 1}}
      />
    </SafeAreaView>
  );
};

export default PerformaceScreen;
