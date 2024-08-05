import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export default StyleSheet.create({
  contactView: {
    backgroundColor: Colors.secondaryLight,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    marginTop: -35,
    width: '100%',
    paddingBottom: 80,
    paddingTop: 50,
    zIndex: -1,
  },
  iconText: {
    color: Colors.white,
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    paddingLeft: 10,
    // paddingTop: 5,
    textAlign: 'left',
  },
  iconTextView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-evenly',
    marginTop: -10,
  },
  iconView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 0,
    paddingLeft: 20,
    width: '100%',
  },
  image: {
    borderColor: Colors.white,
    borderRadius: 100,
    borderWidth: 1,
    height: 100,
    width: 100,
    zIndex: 1,
  },
  imageView: {
    borderRadius: 100,
    zIndex: 1,
  },
  linkText: {
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    paddingLeft: 10,
    // paddingTop: 5,
    textAlign: 'left',
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  marginTopView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  marginView: {paddingTop: 20},
  paragraphMainView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '95%',
  },
  paragraphText: {
    alignContent: 'center',
    color: Colors.white,
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    marginTop: 20,
    paddingHorizontal: 5,
    textAlign: 'justify',
  },
  roundView: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 0.2,
    justifyContent: 'center',
    width: '100%',
  },
  safeAreaView: {
    alignItems: 'center',
    backgroundColor: Colors.secondaryBlack,
    flex: 1,
  },
  text: {
    color: Colors.white,
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    marginLeft: 5,
    // textAlign: 'center',
  },
  title: {
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    textAlign: 'center',
  },
});