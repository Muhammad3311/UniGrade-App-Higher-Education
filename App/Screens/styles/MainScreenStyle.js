import {StyleSheet} from 'react-native';
import Colors from '../../theme';

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 15,
    elevation: 5,
    height: 55,
    justifyContent: 'center',
    width: '40%',
    // padding: 10,
    paddingHorizontal: 5,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    //   letterSpacing: 1,
  },
  buttonView: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    width: '100%',
  },
  graphText: {
    fontSize: 48, // Updated for a circle diameter of 220
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  // graphView: {marginBottom: 30, marginTop: 40},
  marginTopView: {fontSize: 30, marginTop: 10},
  title: {
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 38,
    letterSpacing: 1,
  },
  titleMsg: {
    color: Colors.white, //'#3664dc',
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    textAlign: 'center',
    // letterSpacing: 1,
  },
  titleMsgView: {paddingHorizontal: 2},
  titleView: {
    alignItems: 'center',
    // marginTop: 30,
    justifyContent: 'center',
    width: '100%',
  },
});
