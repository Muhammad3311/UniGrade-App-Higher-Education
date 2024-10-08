import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  containerStyle: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  flatlistText: {
    color: Colors.white,
    fontSize: responsiveFontSize(2.4),
    marginLeft: responsiveWidth(2),
  },
  flatlistTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveWidth(1),
    width: responsiveWidth(82),
  },
  flatlistView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: responsiveHeight(5),
    marginVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(5),
  },
  iconStyle: {transform: [{rotate: '90deg'}]},
  mainPercentView: {
    alignItems: 'center',
    borderBottomLeftRadius: responsiveWidth(6),
    borderBottomRightRadius: responsiveWidth(6),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(8),
    width: responsiveWidth(100),
  },
  middleView: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: responsiveWidth(6),
    borderBottomRightRadius: responsiveWidth(6),
    flex: 1,
    width: responsiveWidth(100),
  },
  percentageText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(3.5),
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  percentView: {
    alignItems: 'center',
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(-3),
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    width: responsiveWidth(100),
    zIndex: -1,
  },
  progressText: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(6), // Updated for a circle diameter of 220
    textAlign: 'center',
  },
  renderText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(4),
  },
  saveText: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(2.8),
    textAlign: 'center',
  },
  titleStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: responsiveFontSize(2.7),
  },
  viewShot: {position: 'absolute'},
});
