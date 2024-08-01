// React Native Essential imports
import React, {useState, useRef} from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// library imports
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Entypo';
import Toast, {BaseToast} from 'react-native-toast-message';
import _ from 'lodash';

// custom imports
import Style from './styles/CumulativeScreenStyle';
import Colors from '../theme';
import Header from '../Components/Header';
import IonIcon from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('window').height;

const CumulativeScreen = ({navigation}) => {
  const [marksCrHrsArray, setMarksCrHrsArray] = useState(Array(24).fill(''));
  const [inputHasData, setInputHasData] = useState(Array(8).fill(false));
  const [oddArray, setOddArray] = useState([]);
  const [evenArray, setEvenArray] = useState([]);
  const [totalSum, setTotalSum] = useState('0.00');
  const [totalSgpPoints, setTotalSgpPoints] = useState(0);
  const [totalChPoints, setTotalChPoints] = useState(0);

  const firstInputRefs = useRef([...Array(8)].map(() => React.createRef()));

  // Inside the handleInputChange function:
  const handleInputChange = (index, text) => {
    if (
      /^\d{0,3}(\.\d{0,2})?$/.test(text) &&
      ((index % 2 === 1 && parseFloat(text) <= 30) ||
        (index % 2 === 0 && parseFloat(text) <= 120))
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
    if (index === 0) {
      setMarksCrHrsArray(prevMarks => {
        const marksCrHrsArray = [...prevMarks];
        marksCrHrsArray[0] = '';
        return marksCrHrsArray;
      });
    } else if (index % 2 === 1) {
      setMarksCrHrsArray(prevMarks => {
        const marksCrHrsArray = [...prevMarks];
        marksCrHrsArray[index] = marksCrHrsArray[index].slice(0, -1);
        return marksCrHrsArray;
      });
    }
  };

  const calculateCGPA = () => {
    const nonEmptyValues = marksCrHrsArray.filter(value => value !== '');
    let marksCrHrsInt = nonEmptyValues.map(parseFloat);
    const combineArraySum = marksCrHrsInt
      .filter((_, index) => index % 2 === 0)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const combineArraySumed = marksCrHrsInt
      .filter((_, index) => index % 2 !== 0)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    let newChPoints = combineArraySumed;
    let totalSum = (combineArraySum / combineArraySumed).toFixed(2);
    //console.log('cgpa', totalSum, 'cr hrs', newChPoints);
    let data = {
      newChPoints,
      totalSum,
    };
    validateData(data);
  };

  const validateData = data => {
    const sgpa = _.get(data, 'totalSum');
    const crPoints = _.get(data, 'newChPoints');
    // console.log('sgpa', sgpa, 'cr points', crPoints, 'sgpPoints', sgpPoints);
    if (sgpa === NaN || crPoints === 0) {
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
    navigation.navigate('ChartScreen', {data: data});
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
      gridItems.push(
        <View key={i} style={Style.row}>
          <View style={Style.inputContainer}>
            <TextInput
              keyboardAppearance="dark"
              ref={firstInputRefs[i / 2]}
              style={[Style.input, {marginBottom: i === 24 ? 20 : 0}]}
              value={marksCrHrsArray[i]}
              caretHidden={false}
              cursorColor={Colors.primary}
              onChangeText={text => handleInputChange(i, text)}
              keyboardType="numeric"
              placeholder="Marks"
              placeholderTextColor={Colors.placeholder}
              // maxLength={5}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspacePress(i);
                }
              }}
            />
          </View>
          <View style={Style.inputContainer}>
            <TextInput
              style={[Style.input, {marginBottom: i === 24 ? 20 : 0}]}
              value={marksCrHrsArray[i + 1]}
              onChangeText={text => handleInputChange(i + 1, text)}
              cursorColor={Colors.primary}
              caretHidden={false}
              keyboardType="numeric"
              placeholder="Cr Hours"
              placeholderTextColor={Colors.placeholder}
              // maxLength={2}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspacePress(i + 1);
                }
              }}
            />
          </View>
        </View>,
      );
    }
    return gridItems;
  };

  const handleReset = () => {
    const emptyArray = Array(24).fill('');
    setMarksCrHrsArray(emptyArray);
    setTotalSgpPoints(0);
    setTotalChPoints(0);
    setTotalSum('0.00');
    setInputHasData([]);

    if (firstInputRefs.current[0] && firstInputRefs.current[0].current) {
      firstInputRefs.current[0].current.focus();
    }
  };
  const toastConfig = {
    success: props => (
      <BaseToast
        text1={props.text1}
        style={{
          borderLeftColor:
            props.text1 === 'Image saved to gallery'
              ? Colors.primary
              : Colors.redColor,
          backgroundColor: Colors.secondaryLight,
          color: Colors.primary,
        }}
        contentContainerStyle={Style.contentContainerStyle}
        text1Style={Style.contentContainerText}
      />
    ),
  };

  function renderHeader() {
    return (
      <Header
        title={'Calculate Cumulative GPA'}
        noOfLines={1}
        titleStyle={{
          fontSize: 20,
          fontFamily: 'Roboto-Regular',
          color: Colors.white,
        }}
        containerStyle={{
          alignItems: 'center',
          alignSelf: 'center',
        }}
        leftComponent={
          <IonIcon
            name="arrow-back"
            onPress={() => navigation.goBack()}
            size={28}
            color={Colors.white}
            style={{left: 10}}
          />
        }
        rightComponent={<View style={{marginRight: 10}} />}
      />
    );
  }

  return (
    <SafeAreaView style={Style.mainView}>
      {renderHeader()}
      <View style={Style.headerView}>
        <View style={Style.container}>
          <View style={Style.rowText}>
            <Text style={Style.tag}>T. Semester Quality Points</Text>
            <Text style={Style.tagLeft}>T. Semester Credit Hours</Text>
          </View>
          <View style={Style.border}></View>
          <View style={Style.scrollView}>
            <KeyboardAwareScrollView
              style={Style.keyboardViewStyle}
              // contentContainerStyle={{flexGrow: 1}}
              extraScrollHeight={screenHeight / 8} // Adjust this value based on your UI needs
              enableOnAndroid={true}
              enableAutomaticScroll={true}>
              {renderGrid()}
              {/* <FlatList
                data={renderGrid()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderGridItem}
              /> */}
            </KeyboardAwareScrollView>
          </View>
          <View style={Style.btnView}>
            <View style={Style.buttonView}>
              <TouchableOpacity onPress={handleReset} style={Style.buttonReset}>
                <Text style={Style.buttonText}>
                  {/*'#3664dc'*/}
                  Reset
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={calculateCGPA} style={Style.button}>
                <Text style={Style.buttonText}>Calculate CGPA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default CumulativeScreen;
