// React Native essential imports
import React from 'react';
import {View, Text, Image, StatusBar, Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

// custom imports
import Style from './styles/AboutUsStyle';
import {ThemeContext, aboutParagraph} from '../config';
import {Colors, lightTheme, darkTheme} from '../constants';
import {WEBSITE_URL, INSTAGRAM_URL, CONTACT_US_URL} from '../utils';

// The screen contains the information about author and user or customer can update their queries, problems by contacting the author
const AboutUs = () => {
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const paragraph = aboutParagraph;
  const businessLink = 'follow us on Instagram';
  const authorName = 'DeTech Digital Studio';

  const handlePress = () => {
    Linking.openURL(WEBSITE_URL);
  };
  const handleInstaPress = () => {
    Linking.openURL(INSTAGRAM_URL);
  };
  const handleMailPress = () => {
    Linking.openURL(CONTACT_US_URL);
  };

  return (
    <SafeAreaView
      style={[Style.safeAreaView, {backgroundColor: theme.backgroundColor}]}>
      <StatusBar barStyle={theme.statusContent} />
      <Image
        source={require('../assets/images/DETECH.webp')}
        resizeMode="cover"
        style={Style.image}
      />
      <View
        style={{
          ...Style.contactView,
          backgroundColor: theme.cardColor,
        }}>
        <View>
          <Text
            allowFontScaling={false}
            style={{...Style.title, color: theme.textColor}}>
            {authorName}
          </Text>
        </View>
        <View style={Style.marginTopView}>
          <Text
            allowFontScaling={false}
            style={{...Style.text, marginLeft: 0, color: theme.textColor}}>
            We
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              ...Style.text,
              textDecorationLine: 'line-through',
              color: theme.textColor,
            }}>
            Develop
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              ...Style.text,
              color: Colors.primary,
              fontFamily: 'Roboto-Bold',
            }}>
            Cook
          </Text>
          <Text
            allowFontScaling={false}
            style={{...Style.text, color: theme.textColor}}>
            Ideas
          </Text>
        </View>
        <View style={Style.paragraphMainView}>
          <Text
            allowFontScaling={false}
            style={{...Style.paragraphText, color: theme.lightTextColor}}>
            {paragraph}
          </Text>
        </View>
        <View style={Style.iconTextView}>
          <View style={Style.iconView}>
            <Entypo
              name="link"
              color={theme.textColor}
              size={responsiveWidth(8)}
              allowFontScaling={false}
            />
            <View>
              <Text
                allowFontScaling={false}
                style={{...Style.iconText, color: theme.lightTextColor}}>
                {authorName}
              </Text>
              <Text
                allowFontScaling={false}
                style={Style.linkText}
                onPress={handlePress}>
                DeTech digital studio link
              </Text>
            </View>
          </View>

          <View style={Style.iconView}>
            <IonIcons
              name="mail-outline"
              color={theme.textColor}
              size={responsiveWidth(8)}
              allowFontScaling={false}
            />
            <View>
              <Text
                allowFontScaling={false}
                style={{...Style.iconText, color: theme.lightTextColor}}>
                Mail
              </Text>
              <Text
                allowFontScaling={false}
                style={Style.linkText}
                onPress={handleMailPress}>
                developer support
              </Text>
            </View>
          </View>

          <View style={Style.iconView}>
            <IonIcons
              name="logo-instagram"
              color={theme.textColor}
              size={responsiveWidth(8)}
              allowFontScaling={false}
            />
            <View>
              <Text
                allowFontScaling={false}
                style={{...Style.iconText, color: theme.lightTextColor}}>
                Instagram
              </Text>
              <Text
                allowFontScaling={false}
                style={Style.linkText}
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
