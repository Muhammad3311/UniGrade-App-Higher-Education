import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Switch} from 'react-native';
import Modal from 'react-native-modal';
import Big from 'big.js';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useFocusEffect} from '@react-navigation/native';
import {
  AndroidSoftInputModes,
  KeyboardController,
} from 'react-native-keyboard-controller';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// custom imports
import Style from './styles/CumulativeScreenStyle';
import {ThemeContext, useToast} from '../config';
import {
  Colors,
  lightTheme,
  darkTheme,
  commonGPAConfigScale5,
  commonGPAConfigScale4,
} from '../constants';
import {TextButton} from '../components';

const CumulativeScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const {showToast} = useToast();
  const [numberOfSemesters, setNumberOfSemesters] = useState(null);
  const [entries, setEntries] = useState([]);
  const [cgpa, setCgpa] = useState(null);
  const [isSemesterModalVisible, setSemesterModalVisible] = useState(false);
  const [showCreditHours, setShowCreditHours] = useState(true);
  const [gpaScale, setGpaScale] = useState(4); // Default to 4

  useFocusEffect(
    React.useCallback(() => {
      KeyboardController.setInputMode(
        AndroidSoftInputModes.SOFT_INPUT_ADJUST_RESIZE,
      );

      return () => KeyboardController.setDefaultMode();
    }, []),
  );

  const initializeEntries = numSemesters => {
    const initialEntries = Array.from({length: numSemesters}, (_, i) => ({
      semester: i + 1,
      sgpa: '',
      creditHours: '',
    }));
    setEntries(initialEntries);
  };

  const handleInputChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const calculateCgpa = () => {
    if (entries.length > 0) {
      // Check if all SGPA values are entered
      const allSgpaEntered = entries.every(entry => entry.sgpa !== '');
      if (!allSgpaEntered) {
        showToast('error', 'Attempt all the SGPA atleast!');
        return;
      }

      const totalSemesters = entries.length;
      const totalSgpa = entries.reduce(
        (acc, entry) => acc.plus(new Big(entry.sgpa || 0)),
        new Big(0),
      );

      const totalCreditHours = entries.reduce(
        (acc, entry) => acc.plus(new Big(entry.creditHours || 0)),
        new Big(0),
      );

      // Adjust the GPA calculation based on selected scale
      let adjustedSgpa = totalSgpa.div(totalSemesters);
      if (gpaScale == 5) {
        adjustedSgpa = adjustedSgpa.div(4).times(5).minus(1.25);
      }
      setCgpa(adjustedSgpa.toFixed(2));
      let data = {
        totalSum: adjustedSgpa.toFixed(2),
        newChPoints: totalCreditHours.toString(),
        gpaScale: gpaScale,
      };
      // console.log('data: ', data);
      navigationData(data);
    }
  };

  const navigationData = data => {
    navigation.navigate('ChartScreen', {
      data: data,
      source: 'CGPA',
    });
  };

  const toggleGpaScale = () => {
    setGpaScale(prev => (prev === 4 ? 5 : 4));
  };

  return (
    <View
      style={[
        Style.container,
        {
          backgroundColor: theme.backgroundColor,
          flex: 1,
          paddingBottom:
            insets.bottom == 0
              ? insets.bottom + responsiveHeight(9)
              : insets.bottom + responsiveHeight(7),
        },
      ]}>
      <Modal
        isVisible={isSemesterModalVisible}
        backdropColor={theme.backgroundColor}
        onBackButtonPress={() => setSemesterModalVisible(false)}
        coverScreen={false}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={900}
        style={{
          marginBottom: responsiveHeight(10),
          backgroundColor: theme.backgroundColor,
        }}
        onBackdropPress={() => setSemesterModalVisible(false)}>
        <View
          style={[
            Style.modalContent,
            {backgroundColor: theme.backgroundColor},
          ]}>
          <Text allowFontScaling={false} style={Style.modalTitle}>
            Choose Semesters
          </Text>
          {Array.from({length: 10}, (_, i) => i + 1).map(num => (
            <TouchableOpacity
              style={Style.modalButton}
              key={num}
              onPress={() => {
                setNumberOfSemesters(num);
                initializeEntries(num);
                setSemesterModalVisible(false);
              }}>
              <View style={Style.viewStyle}>
                <AwesomeIcon
                  name="graduation-cap"
                  size={responsiveWidth(5.5)}
                  color={theme.textColor}
                  allowFontScaling={false}
                />
              </View>
              <View style={Style.modalView}>
                <Text
                  allowFontScaling={false}
                  style={[Style.modalItem, {color: theme.textColor}]}>
                  Semester
                </Text>
              </View>
              <View style={Style.numbersViewStyle}>
                <Text
                  allowFontScaling={false}
                  style={[Style.modalItem, {color: theme.textColor}]}>
                  {num}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: responsiveWidth(90),
          paddingVertical: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            allowFontScaling={false}
            style={{
              color: theme.textColor,
              fontFamily: 'Roboto-Regular',
              fontSize: responsiveFontSize(2.5),
              marginRight: 8, // Adjust the space between the texts here
            }}>
            {`Selected GPA Scale:`}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.primary,
              fontFamily: 'Roboto-Bold',
              fontSize: responsiveFontSize(3),
            }}>
            {gpaScale}
          </Text>
        </View>
        <Switch
          trackColor={{false: Colors.primaryTransparent, true: Colors.primary}}
          thumbColor={gpaScale === 4 ? Colors.white : Colors.placeholder}
          onValueChange={toggleGpaScale}
          value={gpaScale === 4}
        />
      </View>
      <View style={Style.mainView}>
        <View style={Style.headerView}>
          <TouchableOpacity
            style={Style.pickerContainer}
            activeOpacity={0.8}
            onPress={() => setSemesterModalVisible(true)}>
            <Text allowFontScaling={false} style={Style.pickerText}>
              Add Semesters
            </Text>
            <Icon
              name="caret-down"
              size={responsiveWidth(3.5)}
              color={Colors.white}
              style={{left: 5}}
              allowFontScaling={false}
            />
          </TouchableOpacity>
          <View style={Style.switchViewStyle}>
            <Text
              allowFontScaling={false}
              style={{...Style.switchText, color: theme.textColor}}>
              Show Cr Hrs
            </Text>
            <Switch
              trackColor={{
                false: Colors.primaryTransparent,
                true: Colors.primary,
              }}
              thumbColor={showCreditHours ? Colors.white : Colors.placeholder}
              onValueChange={() => setShowCreditHours(prev => !prev)}
              value={showCreditHours}
            />
          </View>
        </View>
        <KeyboardAwareScrollView
          // contentContainerStyle={Style.keyboardScrollViewStyle}
          style={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          {entries.map((item, index) => (
            <View key={index} style={Style.entry}>
              <View style={Style.semesterContainer}>
                <Text
                  allowFontScaling={false}
                  style={[Style.semesterText, {color: theme.textColor}]}>
                  Semester {item.semester}
                </Text>
              </View>
              <View style={Style.textInputViewStyle}>
                <TextInput
                  style={[Style.input, {color: theme.textColor}]}
                  cursorColor={Colors.primary}
                  placeholder="SGPA"
                  placeholderTextColor={theme.placeholderTextColor}
                  keyboardType="numeric"
                  value={item.sgpa}
                  onChangeText={text => handleInputChange(index, 'sgpa', text)}
                  maxLength={5}
                  numberOfLines={1}
                  multiline={false}
                  allowFontScaling={false}
                />
              </View>
              {showCreditHours && (
                <View style={Style.crHrsViewStyle}>
                  <TextInput
                    style={[
                      Style.input,
                      {color: theme.textColor, textAlign: 'right'},
                    ]}
                    placeholder="Cr Hrs"
                    placeholderTextColor={theme.placeholderTextColor}
                    multiline={false}
                    numberOfLines={1}
                    scrollEnabled={false}
                    keyboardType="numeric"
                    allowFontScaling={false}
                    value={item.creditHours}
                    onChangeText={text =>
                      handleInputChange(index, 'creditHours', text)
                    }
                    maxLength={3}
                  />
                </View>
              )}
            </View>
          ))}
        </KeyboardAwareScrollView>

        {numberOfSemesters && (
          <TextButton
            label={'Calculate CGPA'}
            onPress={calculateCgpa}
            labelStyle={Style.labelStyle}
            buttonContainerStyle={{
              ...Style.buttonContainerStyle,
              marginVertical: 10,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default CumulativeScreen;
