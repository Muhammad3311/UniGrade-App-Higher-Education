// React Native Essential imports
import React from 'react';
import {View, Image, ScrollView} from 'react-native';

// custom imports
import Style from './styles/GradingSystemStyle';
import images from '../Assets/images';

// The screen contains the policies and criteria of grades in a pictorial or visulaized form based by organization
const GradingSystem = () => {
  return (
    <View style={Style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Style.marginView}>
          <Image
            source={images.GPA1}
            resizeMode="contain"
            style={Style.image}
          />
        </View>
        <View style={Style.marginView}>
          <Image
            source={images.GPA2}
            resizeMode="contain"
            style={Style.image}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default GradingSystem;
