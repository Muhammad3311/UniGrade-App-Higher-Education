import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  contentContainer: {paddingHorizontal: 15},
  contentContainerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(2),
    color: Colors.white,
  },
  containerStyle: {
    alignItems: 'center',
    // alignSelf: 'center',
  },
  iconStyle: {transform: [{rotate: '90deg'}]},
  flatlistText: {
    fontSize: responsiveFontSize(2.4),
    marginLeft: responsiveWidth(2),
    color: Colors.white,
  },
  flatlistTextView: {
    width: responsiveWidth(82),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveWidth(1),
  },
  flatlistView: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(0.5),
    marginTop: responsiveHeight(5),
  },
  mainPercentView: {
    backgroundColor: '#363c4c',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(8),
    width: responsiveWidth(100),
    borderBottomLeftRadius: responsiveWidth(6),
    borderBottomRightRadius: responsiveWidth(6),
  },
  // marginView: {marginTop: 10},
  middleView: {
    alignSelf: 'flex-start',
    height: responsiveHeight(55),
    backgroundColor: Colors.secondary,
    borderBottomLeftRadius: responsiveWidth(6),
    borderBottomRightRadius: responsiveWidth(6),
    width: responsiveWidth(100),
    // elevation: 5,
  },
  percentage: {
    color: Colors.white,
    fontSize: responsiveFontSize(3.5),
    fontFamily: 'Roboto-Bold',
    // marginTop: 10,
    textAlign: 'center',
  },
  percentageText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(3.5),
    fontFamily: 'Roboto-Bold',
    // marginTop: 10,
    textAlign: 'center',
  },
  percentView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    width: responsiveWidth(100),
    marginTop: responsiveHeight(-3),
    backgroundColor: '#444B5F',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    zIndex: -1,
  },
  progressText: {
    fontSize: responsiveFontSize(6), // Updated for a circle diameter of 220
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  renderText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(4),
  },
  saveText: {
    color: Colors.white,
    fontSize: responsiveFontSize(2.8),
    fontFamily: 'Roboto-Medium',
    // marginTop: 10,
    textAlign: 'center',
  },
  titleStyle: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Roboto-Medium',
  },
  viewShot: {position: 'absolute'},
});
