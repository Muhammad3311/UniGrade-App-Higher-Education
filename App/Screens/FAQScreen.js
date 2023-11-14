// React Native Essential imports
import React from 'react';
import {View, Text, Image} from 'react-native';

// custom imports
import Style from './styles/FAQScreenStyle';
import images from '../Assets/images';

// This screen contains bullets / question session which consists of policies, rules & regulations based by organization
const FAQScreen = () => {
  // bullet variables
  const bullet1 = '1. GPA:';
  const bullet2 = '2. CGPA:';
  const bullet3 = '3. SGP:';
  const bullet4 = '4. SCH:';
  const bullet5 = '5. What is GPA?';
  const bullet6 = '6. Quality Points?';
  const bullet7 = '7. Credit Hours?';
  const bullet8 = '8. Duration of Studies?';

  // Displayed text which explains the organization rules
  const gpaText = 'Grade Point Average';
  const cgpaText = 'Cumulative Grade Point Average';
  const semesterGradePoint = 'Semester Grade Point';
  const semesterCreditHour = 'Semester Credit Hour';
  const semesterDescription = `Grade Point Average (GPA) is an average of all the grade points you
  have earned over the course of your degree program.`;
  const qualityPointDescription = `  Quality Points mean the value assigned to coursework by multiplying
  the number of credit hours a course is worth by the grade points
  earned for the course.`;
  const creditHourDescription = `Credit Hours indicate the sum of all hours in each semester.`;
  return (
    <View style={Style.container}>
      <View style={[Style.viewStyle]}>
        <Text style={Style.title}>{bullet1}</Text>
        <Text style={Style.text}>{gpaText}</Text>
      </View>
      <View style={Style.viewStyle}>
        <Text style={Style.title}>{bullet2}</Text>
        <Text style={Style.text}>{cgpaText}</Text>
      </View>
      <View style={Style.viewStyle}>
        <Text style={Style.title}>{bullet3}</Text>
        <Text style={Style.text}>{semesterGradePoint}</Text>
      </View>
      <View style={Style.viewStyle}>
        <Text style={Style.title}>{bullet4}</Text>
        <Text style={Style.text}>{semesterCreditHour}</Text>
      </View>
      <View style={Style.marginTopView}>
        <Text style={Style.title}>{bullet5}</Text>
        <Text style={Style.textLeft}>{semesterDescription}</Text>
      </View>
      <View style={Style.marginTopView}>
        <Text style={Style.title}>{bullet6}</Text>
        <Text style={Style.textLeft}>{qualityPointDescription}</Text>
      </View>
      <View style={Style.marginTopView}>
        <Text style={Style.title}>{bullet7}</Text>
        <Text style={Style.textLeft}>{creditHourDescription}</Text>
      </View>
      <View style={Style.marginTopView}>
        <Text style={Style.title}>{bullet8}</Text>
      </View>
      <View style={Style.imageView}>
        <Image
          source={images.duration}
          resizeMode="stretch"
          style={Style.image}
        />
      </View>
    </View>
  );
};

export default FAQScreen;
