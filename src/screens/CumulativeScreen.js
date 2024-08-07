import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Switch} from 'react-native';
import Modal from 'react-native-modal';
import Big from 'big.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../config';
import {Colors, lightTheme, darkTheme} from '../constants';
import {Header, TextButton} from '../components';
import Toast, {BaseToast} from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Style from './styles/CumulativeScreenStyle';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const CumulativeScreen = ({navigation}) => {
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const [numberOfSemesters, setNumberOfSemesters] = useState(null);
  const [entries, setEntries] = useState([]);
  const [cgpa, setCgpa] = useState(null);
  const [isSemesterModalVisible, setSemesterModalVisible] = useState(false);
  const [showCreditHours, setShowCreditHours] = useState(true);

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

      const calculatedCgpa = totalSgpa.div(totalSemesters);
      setCgpa(calculatedCgpa.toFixed(2));
      const totalCreditHours = entries.reduce(
        (acc, entry) => acc.plus(new Big(entry.creditHours || 0)),
        new Big(0),
      );
      let data = {
        totalSum: calculatedCgpa.toFixed(2),
        newChPoints: parseInt(totalCreditHours.toFixed(2)),
      };
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

  function renderHeader() {
    return (
      <Header
        title={`Your Cumulative GPA Score`}
        noOfLines={1}
        titleStyle={{...Style.titleStyle, color: theme.textColor}}
        containerStyle={{
          alignItems: 'center',
          alignSelf: 'center',
        }}
        leftComponent={
          <Icon
            name="arrow-back"
            onPress={() => navigation.goBack()}
            size={responsiveWidth(7.5)}
            color={theme.textColor}
            style={Style.leftComponentStyle}
          />
        }
        rightComponent={null}
      />
    );
  }

  return (
    <SafeAreaView
      style={[Style.container, {backgroundColor: theme.backgroundColorHome}]}>
      {renderHeader()}
      <View style={Style.mainView}>
        <View style={Style.headerView}>
          <TouchableOpacity
            style={Style.pickerContainer}
            activeOpacity={0.8}
            onPress={() => setSemesterModalVisible(true)}>
            <Text style={Style.pickerText}>Add Semesters</Text>
            <Icon
              name="caret-down"
              size={responsiveWidth(3.5)}
              color={Colors.white}
              style={{left: 5}}
            />
          </TouchableOpacity>
          <View style={Style.switchViewStyle}>
            <Text style={{...Style.switchText, color: theme.textColor}}>
              Show Cr Hrs
            </Text>
            <Switch
              trackColor={{false: Colors.lightGray, true: Colors.primary}}
              thumbColor={showCreditHours ? Colors.white : Colors.darkGray}
              onValueChange={() => setShowCreditHours(prev => !prev)}
              value={showCreditHours}
            />
          </View>
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={Style.keyboardScrollViewStyle}
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          enableOnAndroid={true}>
          {entries.map((item, index) => (
            <View key={index} style={Style.entry}>
              <View style={Style.semesterContainer}>
                <Text style={[Style.semesterText, {color: theme.textColor}]}>
                  Semester {item.semester}
                </Text>
              </View>
              <View style={Style.textInputViewStyle}>
                <TextInput
                  style={[Style.input, {color: theme.textColor}]}
                  cursorColor={Colors.primary}
                  placeholder="SGPA"
                  placeholderTextColor={theme.placeholderColor}
                  keyboardType="numeric"
                  value={item.sgpa}
                  onChangeText={text => handleInputChange(index, 'sgpa', text)}
                  maxLength={5}
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
                    placeholderTextColor={theme.placeholderColor}
                    multiline={false}
                    numberOfLines={1}
                    scrollEnabled={false}
                    keyboardType="numeric"
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

        <TextButton
          label={'Calculate CGPA'}
          onPress={calculateCgpa}
          labelStyle={Style.labelStyle}
          buttonContainerStyle={Style.buttonContainerStyle}
        />
        <Modal
          isVisible={isSemesterModalVisible}
          onBackdropPress={() => setSemesterModalVisible(false)}>
          <View
            style={[
              Style.modalContent,
              {backgroundColor: theme.backgroundColorHome},
            ]}>
            <Text style={Style.modalTitle}>Choose Semesters</Text>
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
                  />
                </View>
                <View style={Style.modalView}>
                  <Text style={[Style.modalItem, {color: theme.textColor}]}>
                    Semester
                  </Text>
                </View>
                <View style={Style.numbersViewStyle}>
                  <Text style={[Style.modalItem, {color: theme.textColor}]}>
                    {num}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
        <Toast config={toastConfig} />
      </View>
    </SafeAreaView>
  );
};

export default CumulativeScreen;
