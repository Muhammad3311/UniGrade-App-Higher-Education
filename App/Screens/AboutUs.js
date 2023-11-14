// React Native essential imports
import React from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

// custom imports
import Style from './styles/AboutUsStyle';
import {aboutParagraph} from '../Loader/AboutParagraph';
import images from '../Assets/images';
import Colors from '../theme';

// The screen contains the information about author and user or customer can update their queries, problems by contacting the author
const AboutUs = () => {
  const paragraph = aboutParagraph;
  const number = '+92 303 5317873';
  const mail = 'md@smartdevelopers.org';
  const businessNumber = '+92 330 8245848';
  const linkedin = 'muhammad-okz';
  const authorName = 'Muhammad Khan';
  const authorDesignation =
    'CEO & Sr Full Stack App Developer at Smart Developers Company';
  return (
    <SafeAreaView style={Style.safeAreaView}>
      <View style={Style.container}>
        <Image source={images.Author} resizeMode="cover" style={Style.image} />

        <View style={Style.contactView}>
          <View>
            <Text style={Style.title}>{authorName}</Text>
          </View>
          <View style={Style.marginTopView}>
            <Text style={Style.text}>{authorDesignation}</Text>
          </View>
          <View style={Style.paragraphMainView}>
            <Text style={Style.paragraphText}>{paragraph}</Text>
          </View>
          <View style={Style.iconTextView}>
            <View style={Style.iconView}>
              <FeatherIcon name="phone-call" color={Colors.primary} size={30} />
              <View>
                <Text style={Style.iconText}>Number</Text>
                <Text style={Style.iconText}>{number}</Text>
              </View>
            </View>
            <View style={Style.iconView}>
              <AntIcon name="linkedin-square" color={Colors.black} size={35} />
              <View>
                <Text style={Style.iconText}>LinkedIn</Text>
                <Text style={Style.iconText}>{linkedin}</Text>
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
              <IonIcons
                name="logo-whatsapp"
                color={Colors.iconColor}
                size={30}
              />
              <View>
                <Text style={Style.iconText}>Business Number</Text>
                <Text style={Style.iconText}>{businessNumber}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AboutUs;
