// React Native Essential imports
import React from 'react';
import {View, StyleSheet} from 'react-native';

// custom imports
import Style from './LoaderStyle';
import Colors from '../theme';

// libraries imports
import {SkypeIndicator} from 'react-native-indicators';

export default function Loader() {
  return (
    <View style={[StyleSheet.absoluteFillObject, Style.container]}>
      <SkypeIndicator size={100} color={Colors.primary} />
    </View>
  );
}
