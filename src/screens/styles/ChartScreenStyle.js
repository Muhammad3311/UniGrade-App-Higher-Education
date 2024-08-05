import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants';
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  contentContainer: {paddingHorizontal: 15},
  contentContainerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: Colors.white,
  },
  iconStyle: {transform: [{rotate: '90deg'}]},
  flatlistText: {fontSize: 20, marginLeft: 10, color: '#fff'},
  flatlistTextView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  flatlistView: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 5,
    marginTop: 30,
  },
  mainPercentView: {
    backgroundColor: '#363c4c',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // width: '90%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  marginView: {marginTop: 10},
  middleView: {
    alignSelf: 'flex-start',
    height: screenHeight / 1.75,
    backgroundColor: Colors.secondary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: '100%',
    // elevation: 5,
  },
  percentage: {
    color: Colors.white,
    fontSize: 36,
    fontFamily: 'Roboto-Bold',
    // marginTop: 10,
    textAlign: 'center',
  },
  percentageText: {
    color: Colors.primary,
    fontSize: 36,
    fontFamily: 'Roboto-Bold',
    // marginTop: 10,
    textAlign: 'center',
  },
  percentView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginTop: -20,
    backgroundColor: '#444B5F',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: -1,
  },
  progressText: {
    fontSize: 48, // Updated for a circle diameter of 220
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  renderText: {
    textAlign: 'center',
    fontSize: 40,
  },
  saveText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Roboto-Medium',
    // marginTop: 10,
    textAlign: 'center',
  },
  viewShot: {position: 'absolute'},
});
