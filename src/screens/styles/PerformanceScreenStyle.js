import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

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
  flatListView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    width: '100%',
  },
  mainTitle: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
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
