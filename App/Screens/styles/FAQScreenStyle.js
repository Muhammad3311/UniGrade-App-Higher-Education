import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../theme';

// to get responsive width for screen
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 20,
    width: '90%',
  },
  image: {
    borderRadius: 6,
    height: 300,
    width: screenWidth - 30,
  },
  imageView: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: Colors.primary,
    borderRadius: 10,
    elevation: 5,
    marginLeft: 20,
    marginTop: 20,
  },
  marginTopView: {marginTop: 5},
  title: {color: Colors.white, fontFamily: 'Roboto-Bold', fontSize: 16},
  text: {
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    marginLeft: 10,
  },
  textLeft: {
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    marginLeft: 15,
  },
  viewStyle: {flexDirection: 'row', marginTop: 5},
});
