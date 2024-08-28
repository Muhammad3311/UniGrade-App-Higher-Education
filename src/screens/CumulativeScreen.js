import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Switch} from 'react-native';
import Modal from 'react-native-modal';
import Big from 'big.js';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../config';
import {Colors, lightTheme, darkTheme} from '../constants';
import {Header, TextButton} from '../components';
import Toast, {BaseToast} from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Style from './styles/CumulativeScreenStyle';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const CumulativeScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const [numberOfSemesters, setNumberOfSemesters] = useState(null);
  const [entries, setEntries] = useState([]);
  const [cgpa, setCgpa] = useState(null);
  const [isSemesterModalVisible, setSemesterModalVisible] = useState(false);
  const [showCreditHours, setShowCreditHours] = useState(true);
  const [gpaScale, setGpaScale] = useState(4); // Default to 4

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
        Toast.show({
          // type: 'fail',
          text1: `Please fill the below SGPA fields`,
          position: 'top',
          bottomOffset: 100,
        });
        return;
      }

      const totalSemesters = entries.length;
      const totalSgpa = entries.reduce(
        (acc, entry) => acc.plus(new Big(entry.sgpa || 0)),
        new Big(0),
      );
      // Adjust the GPA calculation based on selected scale
      const adjustedSgpa = totalSgpa.div(totalSemesters).times(4).div(gpaScale);

      setCgpa(adjustedSgpa.toFixed(2));
      // const totalCreditHours = entries.reduce(
      //   (acc, entry) => acc.plus(new Big(entry.creditHours || 0)),
      //   new Big(0),
      // );
      let data = {
        totalSum: adjustedSgpa.toFixed(2),
        gpaScale: gpaScale,
      };
      console.log('cgpa: ', data);
      navigationData(data);
    }
  };

  const navigationData = data => {
    navigation.navigate('ChartScreen', {
      data: data,
      source: 'CumulativeScreen',
    });
  };

  const toastConfig = {
    success: props => (
      <BaseToast
        text1={props.text1}
        style={{
          borderLeftColor: Colors.redColor,
          backgroundColor: theme.backgroundColorHome,
          color: Colors.primary,
        }}
        contentContainerStyle={Style.contentContainerStyle}
        text1Style={[Style.text1Style, {color: theme.textColor}]}
      />
    ),
  };

  const toggleGpaScale = () => {
    setGpaScale(prev => (prev === 4 ? 5 : 4));
  };

  const onChangeTextInput = React.useCallback(text => {
    setPostText(text);
  }, []);

  return (
    <View
      style={[
        Style.container,
        {
          backgroundColor: theme.backgroundColor,
          // paddingBottom: insets.bottom + responsiveHeight(10),
          height: responsiveHeight(100),
        },
      ]}>
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: responsiveWidth(90),
          paddingVertical: 10,
        }}>
        {/* <Text
          allowFontScaling={false}
          style={{
            color: theme.textColor,
            fontFamily: 'Roboto-Regular',
            fontSize: responsiveFontSize(2.5),
            // letterSpacing: 1,
          }}>
          {`Selected GPA Scale: ${gpaScale}`}
        </Text> */}
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
          style={{flexGrow: 0.8}}
          showsVerticalScrollIndicator={false}
          extraScrollHeight={200}
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

        <Modal
          isVisible={isSemesterModalVisible}
          backdropColor={theme.backgroundColor}
          onBackButtonPress={() => setSemesterModalVisible(false)}
          coverScreen={false}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={500}
          animationOutTiming={900}
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
        <TextButton
          label={'Calculate CGPA'}
          onPress={calculateCgpa}
          labelStyle={Style.labelStyle}
          buttonContainerStyle={{...Style.buttonContainerStyle, marginTop: 10}}
        />

        <Toast config={toastConfig} />
      </View>
    </View>
  );
};

export default CumulativeScreen;
