import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  chartStyle: {
    borderRadius: responsiveWidth(3),
    marginVertical: responsiveHeight(1),
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  flatListMainView: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
  flatListText: {
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(2.2),
    textAlign: 'justify',
  },
  flatListView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: responsiveHeight(0.6),
    width: responsiveWidth(100),
  },
  mainTitle: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(3),
    paddingVertical: responsiveHeight(1),
    textAlign: 'center',
  },
  textView: {alignItems: 'center', width: responsiveWidth(25)},
  textStyle: {
    fontSize: responsiveFontSize(4.5),
    textAlign: 'center',
  },
  topText: {alignItems: 'center', width: responsiveWidth(50)},
  topTextSecond: {alignItems: 'center', width: responsiveWidth(25)},
});
