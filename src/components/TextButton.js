// React Native Component imports
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
// Custom Style imports
import Style from './styles/TextButtonStyle';

const TextButton = ({
  label,
  disabled,
  labelStyle,
  buttonContainerStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{...Style.buttonContainer, ...buttonContainerStyle}}
      disabled={disabled}
      onPress={onPress}>
      <Text allowFontScaling={false} style={{...Style.label, ...labelStyle}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
