import {StyleSheet} from 'react-native';
import Colors from '../../theme';

export default StyleSheet.create({
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  container: {
    backgroundColor: Colors.secondaryBlack,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 80,
  },
  flatListMainView: {flex: 1, width: '100%'},
  flatListText: {
    fontSize: 20,
    fontFamily: 'Roboto-Light',
    color: Colors.white,
    textAlign: 'justify',
  },
  flatListTextView: {
    width: '90%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  flatListView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // paddingHorizontal: 20,
    marginVertical: 5,
    // marginTop: 30,
    width: '100%',
  },
  mainTitle: {
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
  textView: {alignItems: 'center', flex: 0.5},
  textStyle: {
    textAlign: 'center',
    fontSize: 40,
    color: Colors.textColor,
  },
  topText: {alignItems: 'center', flex: 1},
  topTextSecond: {alignItems: 'center', flex: 0.5},
});
