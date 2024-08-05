// React Native Essential imports
import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, FlatList, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// library imports
import {LineChart} from 'react-native-chart-kit';
// custom imports
import {data} from '../config';
import Style from './styles/PerformanceScreenStyle';
import {ThemeContext} from '../config';
import {Colors, darkTheme, lightTheme} from '../constants';
const screenWidth = Dimensions.get('window').width;

const PerformaceScreen = () => {
  const {isDarkTheme, toggleTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const [chartdata, setChartData] = useState([]);
  const chartConfig = {
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
  };

  useEffect(() => {
    setChartData(data);
  });

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={Style.flatListView}>
        <View style={Style.textView}>
          <Text
            style={[
              Style.textStyle,
              {color: item.per == '86-100' ? Colors.primary : Colors.textColor},
            ]}>
            ●
          </Text>
        </View>
        <View style={Style.topText}>
          <Text style={[Style.flatListText, {color: theme.textColor}]}>
            {item.per}
          </Text>
        </View>
        <View style={Style.topTextSecond}>
          <Text style={[Style.flatListText, {color: theme.textColor}]}>
            {item.grade}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={[Style.container, {backgroundColor: theme.backgroundColor}]}>
      <StatusBar
        barStyle={theme.statusContent}
        backgroundColor={'transparent'}
      />
      <View>
        <Text style={[Style.mainTitle, {color: theme.textColor}]}>
          Grade Point Average Chart
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
          width={screenWidth - 20} // from react-native
          height={250}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          //   yAxisInterval={1} // optional, defaults to 1
          //   yAxisLabel={''} // Remove the default Y-axis label
          chartConfig={chartConfig}
          bezier
          style={Style.chartStyle}
        />
      </View>
      <View style={Style.flatListMainView}>
        <FlatList
          data={chartdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default PerformaceScreen;
