import React, {createContext, useContext} from 'react';
import Toast, {BaseToast} from 'react-native-toast-message';
import {Colors, darkTheme, lightTheme} from '../constants';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {ThemeContext} from './ThemeContext';

const ToastContext = createContext();

export const ToastProvider = ({children}) => {
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const showToast = (type, message) => {
    Toast.show({
      type,
      text1: message,
    });
  };

  const hideToast = () => {
    Toast.hide();
  };

  const toastConfig = {
    success: props => (
      <BaseToast
        text1={props.text1}
        style={{
          borderLeftColor: Colors.primary,
          backgroundColor: theme.cardColor,
          color: Colors.primary,
          width: responsiveWidth(80),
        }}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          color: theme.textColor,
          fontFamily: 'Roboto-Thin',
          fontSize: responsiveFontSize(1.8),
        }}
      />
    ),
    error: props => (
      <BaseToast
        text1={props.text1}
        style={{
          borderLeftColor: Colors.redColor,
          backgroundColor: theme.cardColor,
          color: Colors.primary,
          width: responsiveWidth(80),
        }}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          color: theme.textColor,
          fontFamily: 'Roboto-Thin',
          fontSize: responsiveFontSize(1.8),
        }}
      />
    ),
  };

  return (
    <ToastContext.Provider value={{showToast, hideToast}}>
      {children}
      <Toast topOffset={100} config={toastConfig} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
