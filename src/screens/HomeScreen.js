// React Native Essential imports
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// library imports
import Icon from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const _ = require('lodash');
import Toast, {BaseToast} from 'react-native-toast-message';
// cutom imports
import Style from './styles/HomeScreenStyle';
import {ThemeContext} from '../config';
import {Colors, darkTheme, lightTheme} from '../constants';
import {TextButton} from '../components';

const screenHeight = Dimensions.get('window').height;
// This is the screen where user can get grades by adding marks & credit hrs and also view the progress
const HomeScreen = ({navigation}) => {
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const firstInputRefs = useRef([]);
  const [totalSgpPoints, setTotalSgpPoints] = useState(0);
  const [totalChPoints, setTotalChPoints] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [marksCrHrsArray, setMarksCrHrsArray] = useState([]);
  const [inputHasData, setInputHasData] = useState(Array(8).fill(false));

  const calculateSGPA = async () => {
    const marksCrHrsInt = marksCrHrsArray.map(parseFloat);

    const oddArray = marksCrHrsInt
      .filter((_, index) => index % 2 === 0)
      .map(value => value);

    const evenArray = marksCrHrsInt
      .filter((_, index) => index % 2 !== 0)
      .map(value => value);

    const convertedGrades = oddArray.map(grade =>
      convertGradePoints(Number(grade)),
    );

    const product = oddArray.map((grade, index) => {
      if (evenArray[index] && !isNaN(grade) && !isNaN(evenArray[index])) {
        return convertedGrades[index] * evenArray[index];
      }
      return 0;
    });

    const validProductIndices = product
      .map((value, index) => {
        return evenArray[index] &&
          !isNaN(oddArray[index]) &&
          !isNaN(evenArray[index])
          ? index
          : -1;
      })
      .filter(index => index !== -1);

    const combineArraySum = validProductIndices.reduce(
      (accumulator, currentIndex) => accumulator + product[currentIndex],
      0,
    );

    const validCreditHrsIndices = evenArray
      .map((value, index) => {
        return value && !isNaN(oddArray[index]) && !isNaN(value) ? index : -1;
      })
      .filter(index => index !== -1);

    const creditHrsSum = validCreditHrsIndices.reduce(
      (accumulator, currentIndex) => accumulator + evenArray[currentIndex],
      0,
    );
    let newSgpPoints = combineArraySum;
    let newChPoints = creditHrsSum;
    let totalSum = (combineArraySum / creditHrsSum).toFixed(2);

    let data = {
      newSgpPoints,
      newChPoints,
      totalSum,
    };
    validateData(data);
  };

  const validateData = data => {
    const sgpa = _.get(data, 'totalSum');
    const crPoints = _.get(data, 'newChPoints');
    const sgpPoints = _.get(data, 'newSgpPoints');
    // console.log('sgpa', sgpa, 'cr points', crPoints, 'sgpPoints', sgpPoints);
    if (sgpa === NaN || crPoints === 0 || sgpPoints === 0) {
      Toast.show({
        // type: 'fail',
        text1: 'Empty fields are required',
        position: 'top',
        bottomOffset: 100,
      });
    } else {
      navigationData(data);
    }
  };

  const navigationData = data => {
    navigation.navigate('ChartScreen', {data: data, source: 'HomeScreen'});
  };

  const handleReset = () => {
    setMarksCrHrsArray(Array(16).fill(''));
    setTotalSgpPoints(0);
    setTotalChPoints(0);
    setTotalSum('0.00');
    setInputHasData([]);

    // Set focus on the first TextInput of the first set
    if (firstInputRefs.current[0]) {
      firstInputRefs.current[0].focus();
    }
  };

  const convertGradePoints = x => {
    // console.log('grade', x);
    let store_gpa = 0.0;
    if (x < 50.0) {
      store_gpa = 0.0;
    } else if (x == 50.0 || x <= 50.99) {
      store_gpa = 1.0;
    } else if (x == 51.0 || x <= 51.99) {
      store_gpa = 1.08;
    } else if (x == 52.0 || x <= 52.99) {
      store_gpa = 1.17;
    } else if (x == 53.0 || x <= 53.99) {
      store_gpa = 1.25;
    } else if (x == 54.0 || x <= 54.99) {
      store_gpa = 1.33;
    } else if (x == 55.0 || x <= 55.99) {
      store_gpa = 1.42;
    } else if (x == 56.0 || x <= 56.99) {
      store_gpa = 1.5;
    } else if (x == 57.0 || x <= 57.99) {
      store_gpa = 1.58;
    } else if (x == 58.0 || x <= 58.99) {
      store_gpa = 1.67;
    } else if (x == 59.0 || x <= 59.99) {
      store_gpa = 1.75;
    } else if (x == 60.0 || x <= 60.99) {
      store_gpa = 1.83;
    } else if (x == 61.0 || x <= 61.99) {
      store_gpa = 1.92;
    } else if (x == 62.0 || x <= 62.99) {
      store_gpa = 2.0;
    } else if (x == 63.0 || x <= 63.99) {
      store_gpa = 2.08;
    } else if (x == 64.0 || x <= 64.99) {
      store_gpa = 2.17;
    } else if (x == 65.0 || x <= 65.99) {
      store_gpa = 2.25;
    } else if (x == 66.0 || x <= 66.99) {
      store_gpa = 2.33;
    } else if (x == 67.0 || x <= 67.99) {
      store_gpa = 2.42;
    } else if (x == 68.0 || x <= 68.99) {
      store_gpa = 2.5;
    } else if (x == 69.0 || x <= 69.99) {
      store_gpa = 2.58;
    } else if (x == 70.0 || x <= 70.99) {
      store_gpa = 2.67;
    } else if (x == 71.0 || x <= 71.99) {
      store_gpa = 2.75;
    } else if (x == 72.0 || x <= 72.99) {
      store_gpa = 2.83;
    } else if (x == 73.0 || x <= 73.99) {
      store_gpa = 2.92;
    } else if (x == 74.0 || x <= 74.99) {
      store_gpa = 3.0;
    } else if (x == 75.0 || x <= 75.99) {
      store_gpa = 3.08;
    } else if (x == 76.0 || x <= 76.99) {
      store_gpa = 3.17;
    } else if (x == 77.0 || x <= 77.99) {
      store_gpa = 3.25;
    } else if (x == 78.0 || x <= 78.99) {
      store_gpa = 3.33;
    } else if (x == 79.0 || x <= 79.99) {
      store_gpa = 3.42;
    } else if (x == 80.0 || x <= 80.99) {
      store_gpa = 3.5;
    } else if (x == 81.0 || x <= 81.99) {
      store_gpa = 3.58;
    } else if (x == 82.0 || x <= 82.99) {
      store_gpa = 3.67;
    } else if (x == 83.0 || x <= 83.99) {
      store_gpa = 3.75;
    } else if (x == 84.0 || x <= 84.99) {
      store_gpa = 3.83;
    } else if (x == 85.0 || x <= 85.99) {
      store_gpa = 3.92;
    } else if (x >= 86.0 || x <= 100.0) {
      store_gpa = 4.0;
    }
    return store_gpa;
  };

  const handleInputChange = (index, text) => {
    if (
      /^\d{0,3}(\.\d{0,2})?$/.test(text) &&
      ((index % 2 === 1 && parseFloat(text) >= 0 && parseFloat(text) < 8) ||
        (index % 2 === 0 && parseFloat(text) <= 100))
    ) {
      const updatedArray = [...marksCrHrsArray];
      updatedArray[index] = text.trim();
      setMarksCrHrsArray(updatedArray);

      const newInputHasData = [...inputHasData];
      newInputHasData[index] = text.trim() !== '';
      setInputHasData(newInputHasData);
    } else {
      // Reset the inputHasData state when input is invalid
      const newInputHasData = [...inputHasData];
      newInputHasData[index] = false;
      setInputHasData(newInputHasData);
    }
  };
  const handleBackspacePress = index => {
    const updatedArray = [...marksCrHrsArray];
    updatedArray[index] = '';
    setMarksCrHrsArray(updatedArray);
  };

  const calculateResult = index => {
    const grade = Number(marksCrHrsArray[index]);

    if (marksCrHrsArray[index] === '' || isNaN(grade)) {
      return ''; // Return empty text
    } else {
      return gpaGrades(grade);
    }
  };

  const gpaGrades = y => {
    let grade = '';

    if (y < 50) {
      grade = 'F';
    } else if (y >= 50 && y <= 53.99) {
      grade = 'D';
    } else if (y >= 54 && y <= 57.99) {
      grade = 'D+';
    } else if (y >= 58 && y <= 61.99) {
      grade = 'C-';
    } else if (y >= 62 && y <= 65.99) {
      grade = 'C';
    } else if (y >= 66 && y <= 69.99) {
      grade = 'C+';
    } else if (y >= 70 && y <= 73.99) {
      grade = 'B-';
    } else if (y >= 74 && y <= 77.99) {
      grade = 'B';
    } else if (y >= 78 && y <= 81.99) {
      grade = 'B+';
    } else if (y >= 82 && y <= 85.99) {
      grade = 'A-';
    } else if (y >= 86 && y <= 100) {
      grade = 'A';
    }
    return grade;
  };

  const handleDeleteRecord = index => {
    const newMarksCrHrsArray = [...marksCrHrsArray];
    newMarksCrHrsArray.splice(index, 2); // Remove marks and credit hours
    setMarksCrHrsArray(newMarksCrHrsArray);

    const newInputHasData = [...inputHasData];
    newInputHasData.splice(index, 2); // Remove inputHasData for the deleted record
    setInputHasData(newInputHasData);
  };
  const renderGrid = () => {
    const gridItems = [];
    for (let i = 0; i < 26; i += 2) {
      const result = calculateResult(i);
      const isEmpty =
        marksCrHrsArray[i] === '' || marksCrHrsArray[i + 1] === '';

      gridItems.push(
        <View key={i} style={Style.row}>
          <View style={Style.inputContainer}>
            <TextInput
              keyboardAppearance="dark"
              ref={firstInputRefs[i / 2]}
              style={[
                Style.input,
                {
                  color: theme.textColor,
                  borderColor: theme.textColor,
                  marginBottom: i === 24 ? 20 : 0,
                },
              ]} // inorder to align the last item above the keyboard
              value={marksCrHrsArray[i]}
              cursorColor={Colors.primary}
              caretHidden={false}
              onChangeText={text => handleInputChange(i, text)}
              keyboardType="numeric"
              placeholder="Marks"
              placeholderTextColor={theme.placeholderColor}
              maxLength={4}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspacePress(i);
                }
              }}
            />
          </View>
          <View style={Style.inputContainer}>
            <TextInput
              style={[
                Style.input,
                {
                  color: theme.textColor,
                  borderColor: theme.textColor,
                  marginBottom: i === 24 ? 20 : 0,
                },
              ]} // inorder to align last item above the keyboard
              value={marksCrHrsArray[i + 1]}
              cursorColor={Colors.primary}
              onChangeText={text => handleInputChange(i + 1, text)}
              keyboardType="numeric"
              placeholder="Cr Hours"
              caretHidden={false}
              placeholderTextColor={theme.placeholderColor}
              // maxLength={1}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspacePress(i + 1);
                }
              }}
            />
          </View>
          <View style={Style.resultContainer}>
            {/* <Text style={Style.result}>{isEmpty ? '' : result}</Text> */}
            <View style={Style.resultView}>
              <View style={Style.resultTextView}>
                <Text style={[Style.result, {color: theme.textColor}]}>
                  {result}
                </Text>
              </View>
              <View style={Style.flexStyle}>
                {inputHasData[i] && (
                  <TouchableOpacity onPress={() => handleDeleteRecord(i)}>
                    <Icon name="trash" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>,
      );
    }

    return gridItems;
  };
  // const renderGridItem = ({item}) => {
  //   return item;
  // };
  const toastConfig = {
    success: props => (
      <BaseToast
        text1={props.text1}
        style={{
          borderLeftColor:
            props.text1 === 'Image saved to gallery'
              ? Colors.primary
              : Colors.redColor,
          backgroundColor: theme.backgroundColorHome,
          color: Colors.primary,
        }}
        contentContainerStyle={Style.contentStyle}
        text1Style={[Style.configText, {color: theme.textColor}]}
      />
    ),
  };
  return (
    <SafeAreaView
      style={[Style.mainView, {backgroundColor: theme.backgroundColorHome}]}>
      <StatusBar
        barStyle={theme.statusContent}
        backgroundColor={'transparent'}
        translucent
      />
      <View style={[Style.mainContainer, {backgroundColor: 'transparent'}]}>
        {/* <ScrollView> */}
        <View style={Style.container}>
          <View style={Style.row}>
            <Text style={[Style.tag, {color: theme.textColor}]}>
              Subject Marks
            </Text>
            <Text style={[Style.tag, {color: theme.textColor}]}>
              Subject CH
            </Text>
            <Text style={[Style.tag, {color: theme.textColor}]}>Grade</Text>
          </View>
          <View style={Style.border}></View>

          <View style={Style.scrollView}>
            <KeyboardAwareScrollView
              style={[
                Style.keyboardViewStyle,
                {backgroundColor: theme.innerContainer},
              ]}
              // contentContainerStyle={{flexGrow: 1}}
              extraScrollHeight={screenHeight / 8} // Adjust this value based on your UI needs
              enableOnAndroid={true}
              enableAutomaticScroll={true}>
              {renderGrid()}
            </KeyboardAwareScrollView>
          </View>

          <View
            style={[
              Style.btnView,
              {backgroundColor: theme.backgroundColorHome},
            ]}>
            <View style={Style.buttonView}>
              <TextButton
                label={'Reset'}
                buttonContainerStyle={Style.buttonBlack}
                onPress={handleReset}
                labelStyle={Style.buttonTextWhite}
              />
              <TextButton
                label={'Calculate SGPA'}
                buttonContainerStyle={Style.button}
                onPress={calculateSGPA}
                labelStyle={Style.buttonText}
              />
            </View>
            <View style={Style.flexStyleView}>
              <TextButton
                label={'Calculate CGPA'}
                buttonContainerStyle={Style.primaryButton}
                onPress={() => navigation.navigate('CumulativeScreen')}
                labelStyle={Style.buttonTextWhite}
              />
            </View>
          </View>
        </View>
      </View>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default HomeScreen;
