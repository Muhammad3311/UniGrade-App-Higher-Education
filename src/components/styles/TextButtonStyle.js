// React Native Style Sheet for Text Button
import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export default StyleSheet.create({
  animationHeaderIcon: {tintColor: Colors.black},
  animationHeaderIconView: {
    borderColor: Colors.chartGradientTo,
    borderRadius: 10,
    borderWidth: 2,
  },
  animationHeaderText: {
    color: Colors.black,
    flex: 1,
    fontSize: 18,
  },
  animationHeaderView: {alignItems: 'center', flexDirection: 'row'},
  animatedView: {
    backgroundColor: Colors.white,
    height: '100%',
    left: 0,
    position: 'absolute',
    width: '100%',
  },
  backgroundStyle: {bottom: 0, left: 0, position: 'absolute', right: 0, top: 0},
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: Colors.backGroundTransparency,
    flex: 1,
  },
  deliveryContainerView: {color: Colors.black, marginTop: 40},
  deliveryView: {flexDirection: 'row', flexWrap: 'wrap'},
  label: {
    color: Colors.white,
  },
  labelPrice: {
    color: Colors.white,
    flex: 1,
    textAlign: 'right',
  },
  scrollViewContainer: {paddingBottom: 250},
  sectionText: {
    // ...FONTS.h3
  },
  sectionView: {alignItems: 'center'},
});
