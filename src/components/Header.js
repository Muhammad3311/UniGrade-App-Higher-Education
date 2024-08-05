// React Native Component imports
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Custom Style imports
import Style from './styles/HeaderStyle';

const Header = ({
  containerStyle,
  title,
  titleStyle,
  leftComponent,
  rightComponent,
}) => {
  return (
    <View style={{...Style.container, ...containerStyle}}>
      {leftComponent}
      <TouchableOpacity style={Style.leftView} activeOpacity={1}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{...Style.label, ...titleStyle}}>
          {title}
        </Text>
      </TouchableOpacity>
      {rightComponent}
    </View>
  );
};

export default Header;
