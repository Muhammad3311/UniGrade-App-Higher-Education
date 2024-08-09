import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  chartStyle: {
    marginVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(3),
  },
  container: {
    backgroundColor: Colors.secondaryBlack,
    alignItems: 'center',
    flex: 1,
    // justifyContent: 'center',
  },
  flatListMainView: {
    height: responsiveHeight(45),
    width: responsiveWidth(100),
  },
  flatListText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Roboto-Regular',
    color: Colors.white,
    textAlign: 'justify',
  },
  flatListView: {
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    // marginVertical: 5,
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
    textAlign: 'center',
    fontSize: responsiveFontSize(4.5),
    color: Colors.textColor,
  },
  topText: {alignItems: 'center', width: responsiveWidth(50)},
  topTextSecond: {alignItems: 'center', width: responsiveWidth(25)},
});
