// React Native essential imports
import React from 'react';
import {View, Text, Image} from 'react-native';
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

// The screen contains the information about author and user or customer can update their queries, problems by contacting the author
const AboutUs = () => {
  const paragraph = aboutParagraph;
  const number = '+92 303 5317873';
  const mail = 'mdcesar0824@gmail.com';
  const businessNumber = '+92 330 8245848';
  const linkedin = 'muhammad-okz';
  const authorName = 'DeTech Digital Stdio';
  const authorDesignation =
    'CEO & Sr Full Stack App Developer at Smart Developers Company';

  const handlePress = () => {
    Linking.openURL('https://detech-online.vercel.app');
  };

  return (
    <SafeAreaView style={Style.safeAreaView}>
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
                detech-online.vercel.app
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
            <IonIcons name="logo-whatsapp" color={Colors.iconColor} size={30} />
            <View>
              <Text style={Style.iconText}>Business Number</Text>
              <Text style={Style.iconText}>{businessNumber}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AboutUs;
