import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../theme';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  border: {
    borderColor: Colors.white,
    borderWidth: 0.5,
    flexDirection: 'row',
    marginTop: 5,
    width: screenWidth,
  },
  btnView: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 1,
    justifyContent: 'center',
    marginTop: 8,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    elevation: 5,
    height: 45,
    justifyContent: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
    width: '100%',
  },
  buttonReset: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    elevation: 5,
    height: 45,
    justifyContent: 'center',
    marginTop: 30,
    paddingHorizontal: 50,
    width: '100%',
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  buttonView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  contentContainerStyle: {paddingHorizontal: 15},
  contentContainerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: Colors.white,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    // marginTop: 20,
    // padding: 10,
    // width: '90%',
  },
  headerView: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  keyboardViewStyle: {
    backgroundColor: Colors.secondaryLight, //#363c4c
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: -10,
    paddingTop: 5,
  },
  mainView: {backgroundColor: Colors.secondary, flex: 1, marginBottom: 80},
  scrollView: {
    height: screenHeight / 1.5,
  },
  tag: {
    color: Colors.white,
    flex: 1,
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
  tagLeft: {
    color: Colors.white,
    flex: 1,
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    paddingLeft: 30,
    textAlign: 'center',
  },
  resultContainer: {
    alignItems: 'flex-start',
    flex: 0.3,
  },
  resultView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  result: {
    color: Colors.white,
    fontWeight: 'bold',
    // width: '100%',
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 10,
    marginLeft: 20,
    paddingVertical: 5,
    width: '100%',
  },
  rowText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: 10,
    paddingTop: 10,
    width: '100%',
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    alignSelf: 'flex-start',
    width: '80%',
    backgroundColor: Colors.secondaryLight,
    borderRadius: 10,
    borderWidth: 0,
    height: 40,
    borderBottomWidth: 1,
    fontFamily: 'Roboto-Regular',
    borderBottomColor: Colors.white,
    padding: 5,
    color: Colors.white,
  },
  result: {
    color: 'black',
    fontFamily: 'Roboto-Bold',
    // width: '100%',
  },
});
