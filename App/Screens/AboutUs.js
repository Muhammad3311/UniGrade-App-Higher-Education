// React Native essential imports
import React from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

// custom imports
import Style from './styles/AboutUsStyle';
import {aboutParagraph} from '../Loader/AboutParagraph';
import images from '../Assets/images';
import Colors from '../theme';
import {Linking} from 'react-native';
import {ThemeContext} from '../../ThemeContext';
import {lightTheme, darkTheme} from '../../themes';
import theme from '../theme';

// The screen contains the information about author and user or customer can update their queries, problems by contacting the author
const AboutUs = () => {
  const {isDarkTheme, toggleTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const paragraph = aboutParagraph;
  const number = '+92 303 5317873';
  const mail = 'mdcesar0824@gmail.com';
  const businessLink = 'follow us on Instagram';
  const linkedin = 'muhammad-okz';
  const authorName = 'DeTech Digital Stdio';
  const authorDesignation =
    'CEO & Sr Full Stack App Developer at Smart Developers Company';

  const handlePress = () => {
    Linking.openURL('https://detech-online.vercel.app');
  };
  const handleInstaPress = () => {
    Linking.openURL(
      'https://www.instagram.com/muhammad_27001?utm_source=qr&igsh=MWp3Y2lvaTY5dzFsNw==',
    );
  };

  return (
    <SafeAreaView
      style={[Style.safeAreaView, {backgroundColor: theme.backgroundColor}]}>
      <StatusBar barStyle={theme.statusContent} />
      <Image source={images.Detech} resizeMode="cover" style={Style.image} />

      <View style={Style.contactView}>
        <View>
          <Text style={Style.title}>{authorName}</Text>
        </View>
        <View style={Style.marginTopView}>
          <Text style={{...Style.text, marginLeft: 0}}>We</Text>
          <Text style={{...Style.text, textDecorationLine: 'line-through'}}>
            Develop
          </Text>
          <Text
            style={{
              ...Style.text,
              color: Colors.primary,
              fontFamily: 'Roboto-Bold',
            }}>
            Cook
          </Text>
          <Text style={Style.text}>Ideas</Text>
        </View>
        <View style={Style.paragraphMainView}>
          <Text style={Style.paragraphText}>{paragraph}</Text>
        </View>
        <View style={Style.iconTextView}>
          <View style={Style.iconView}>
            <Entypo name="link" color={Colors.white} size={30} />
            <View>
              <Text style={Style.iconText}>DeTech Digital Stdio</Text>
              <Text
                style={{
                  ...Style.iconText,
                  color: '#1E90FF',
                  textDecorationLine: 'underline',
                }}
                onPress={handlePress}>
                DeTech digital stdio link
              </Text>
            </View>
          </View>

          <View style={Style.iconView}>
            <IonIcons name="mail-outline" color={Colors.primary} size={30} />
            <View>
              <Text style={Style.iconText}>Mail</Text>
              <Text style={Style.iconText}>{mail}</Text>
            </View>
          </View>

          <View style={Style.iconView}>
            <IonIcons name="logo-instagram" color={'#fff'} size={30} />
            <View>
              <Text style={Style.iconText}>Instagram </Text>
              <Text
                style={{
                  ...Style.iconText,
                  color: '#1E90FF',
                  textDecorationLine: 'underline',
                }}
                onPress={handleInstaPress}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {businessLink}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AboutUs;
