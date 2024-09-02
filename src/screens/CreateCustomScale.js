// React Native essential imports
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useFocusEffect} from '@react-navigation/native';
import {
  AndroidSoftInputModes,
  KeyboardController,
} from 'react-native-keyboard-controller';

// custom imports
import Style from './styles/CreateCustomScaleStyle';
import {Colors, kustGPAConfig, lightTheme, darkTheme} from '../constants';
import {ThemeContext} from '../config';
import {Header, TextButton} from '../components';

const CreateCustomScale = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {isDarkTheme} = React.useContext(ThemeContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const [localGpaConfig, setLocalGpaConfig] = useState(() =>
    JSON.parse(JSON.stringify(kustGPAConfig)),
  );
  const [isGpaExpanded, setIsGpaExpanded] = useState(true);
  const [showConfigs, setShowConfigs] = useState(false);
  const [configName, setConfigName] = useState('');
  const [message, setMessage] = useState('');
  const [customConfigs, setCustomConfigs] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const letterGrades = [
    'A+',
    'A',
    'A-',
    'B+',
    'B',
    'B-',
    'C+',
    'C',
    'C-',
    'D+',
    'D',
    'D-',
    'F',
  ];

  useKeyboardAdjustment();

  function useKeyboardAdjustment() {
    useFocusEffect(
      React.useCallback(() => {
        const timeoutId = setTimeout(() => {
          KeyboardController.setInputMode(
            AndroidSoftInputModes.SOFT_INPUT_ADJUST_RESIZE,
          );
        }, 100);

        return () => {
          clearTimeout(timeoutId);
          KeyboardController.setDefaultMode();
        };
      }, []),
    );
  }

  useEffect(() => {
    if (showConfigs) {
      const loadConfigs = async () => {
        const savedConfigs = await AsyncStorage.getItem('customConfigs');
        if (savedConfigs) setCustomConfigs(JSON.parse(savedConfigs));
      };
      loadConfigs();
    }
  }, [showConfigs]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2500);

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [message]);

  const handleViewConfig = config => {
    setSelectedConfig(config);
    setIsModalVisible(true);
  };

  const handleSaveChanges = async () => {
    if (!configName) {
      setMessage('Please enter a configuration name.');
      return;
    }
    const nameExists = customConfigs.some(config => config.name === configName);
    if (nameExists) {
      setMessage(
        'Configuration name already exists. Please choose a different name.',
      );
      return;
    }

    const newConfig = {
      gpaConfig: JSON.parse(JSON.stringify(localGpaConfig)),
      name: configName,
      dateSaved: new Date().toLocaleDateString(), // Store the date with each config
    };

    const updatedConfigs = [...customConfigs, newConfig];
    setCustomConfigs(updatedConfigs);
    await AsyncStorage.setItem('customConfigs', JSON.stringify(updatedConfigs));
    setMessage('Configuration saved successfully.');
    setConfigName('');
    setShowConfigs(true);
  };

  const handleDeleteConfig = async index => {
    Alert.alert(
      'Delete Configuration',
      'Are you sure you want to delete this configuration?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedConfigs = customConfigs.filter((_, i) => i !== index);
            setCustomConfigs(updatedConfigs);
            await AsyncStorage.setItem(
              'customConfigs',
              JSON.stringify(updatedConfigs),
            );
          },
        },
      ],
    );
  };

  const handleInputChange = (text, index, type) => {
    let newText = text;

    if (type === 'marksRange') {
      newText = text.replace(/[^0-9-]/g, '');
      if (newText.split('-').length > 2) {
        newText = newText.replace(/-+$/, '');
      }
    } else if (type === 'gpa') {
      newText = text.replace(/[^0-9.-]/g, '');
    }

    const newConfig = [...localGpaConfig];
    newConfig[index][type] = newText;
    setLocalGpaConfig(newConfig);
  };

  const handleParticularDeleteConfig = index => {
    const newConfig = [...localGpaConfig];
    newConfig.splice(index, 1);
    setLocalGpaConfig(newConfig);
  };

  const ConfigModal = ({visible, config, onClose}) => {
    return (
      config && (
        <Modal
          backdropColor={theme.backgroundColor}
          coverScreen={true}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={500}
          animationOutTiming={900}
          isVisible={visible}
          onBackdropPress={onClose}
          style={Style.flexStyle}
          onBackButtonPress={onClose}>
          <View
            style={[Style.modalContent, {backgroundColor: theme.cardColor}]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={Style.scrollViewContent}>
              <Text allowFontScaling={false} style={Style.modalHeader}>
                {config?.name}
              </Text>
              {config?.gpaConfig.map((item, index) => (
                <View key={index} style={Style.modalRow}>
                  <View style={Style.horizontalText}>
                    <Text
                      allowFontScaling={false}
                      style={{...Style.modalTitle, color: theme.textColor}}>
                      Grade:
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{...Style.modalText, color: theme.lightTextColor}}>
                      {item.letterGrade}
                    </Text>
                  </View>
                  <View style={Style.horizontalText}>
                    <Text
                      allowFontScaling={false}
                      style={{...Style.modalTitle, color: theme.textColor}}>
                      Marks Range:
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{...Style.modalText, color: theme.lightTextColor}}>
                      {item.marksRange}
                    </Text>
                  </View>
                  <View style={Style.horizontalText}>
                    <Text
                      allowFontScaling={false}
                      style={{...Style.modalTitle, color: Colors.primary}}>
                      GPA:
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{...Style.modalText, color: theme.lightTextColor}}>
                      {item.gpa}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <TextButton
              label={'Close'}
              onPress={onClose}
              labelStyle={Style.labelStyle}
              buttonContainerStyle={{
                ...Style.buttonContainerStyle,
                marginTop: 20,
              }}
            />
          </View>
        </Modal>
      )
    );
  };

  function renderHeader() {
    return (
      <Header
        title={`Custom Scale Config`}
        noOfLines={1}
        titleStyle={{...Style.titleStyle, color: theme.textColor}}
        containerStyle={Style.containerStyle}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcon
              name="arrow-back"
              size={30}
              color={theme.textColor}
              allowFontScaling={false}
            />
          </TouchableOpacity>
        }
        rightComponent={null}
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        ...Style.container,
        backgroundColor: theme.backgroundColor,
        paddingBottom:
          insets.bottom == 0
            ? insets.bottom + responsiveHeight(8)
            : insets.bottom + responsiveHeight(1),
      }}>
      {renderHeader()}
      <ConfigModal
        visible={isModalVisible}
        config={selectedConfig}
        onClose={() => setIsModalVisible(false)}
      />
      <KeyboardAwareScrollView
        style={{...Style.scrollViewStyle, flexGrow: 1}}
        contentContainerStyle={Style.scrollViewContentContainer}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={responsiveHeight(35)}
        keyboardOpeningTime={0}>
        <TextInput
          style={{...Style.nameInput, color: theme.textColor}}
          placeholder="Enter configuration name"
          value={configName}
          onChangeText={setConfigName}
          placeholderTextColor={theme.placeholderTextColor}
          allowFontScaling={false}
        />
        {message ? (
          <Text allowFontScaling={false} style={Style.message}>
            {message}
          </Text>
        ) : null}
        <TextButton
          label={'Save Config'}
          onPress={handleSaveChanges}
          labelStyle={Style.labelStyle}
          buttonContainerStyle={{
            ...Style.buttonContainerStyle,
            marginBottom: 20,
          }}
        />

        <View style={Style.sectionHeader}>
          <Text
            allowFontScaling={false}
            style={{...Style.header, color: theme.textColor}}>
            Saved Configurations
          </Text>
          <Switch
            trackColor={{
              false: Colors.primaryTransparent,
              true: Colors.primary,
            }}
            thumbColor={showConfigs ? Colors.white : Colors.placeholder}
            value={showConfigs}
            onValueChange={setShowConfigs}
          />
        </View>
        {showConfigs ? (
          customConfigs.length > 0 ? (
            customConfigs.map((config, index) => (
              <View
                key={index}
                style={{
                  ...Style.configContainer,
                  backgroundColor: theme.cardColor,
                }}>
                <View style={Style.configRow}>
                  <View style={Style.configInnerContainer}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        ...Style.configName,
                        color: theme.lightTextColor,
                      }}>
                      Config Name:
                    </Text>
                    <View style={Style.configHeader}>
                      <Text
                        allowFontScaling={false}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={{
                          ...Style.configName,
                          color: Colors.primary,
                          fontFamily: 'Roboto-Medium',
                        }}>
                        {config.name}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => handleDeleteConfig(index)}>
                    <Entypo
                      name="trash"
                      color={Colors.redColor}
                      size={20}
                      allowFontScaling={false}
                    />
                  </TouchableOpacity>
                </View>
                <View style={Style.configContent}>
                  <View style={Style.dateStyle}>
                    <Text
                      allowFontScaling={false}
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{
                        ...Style.configName,
                        color: theme.lightTextColor,
                      }}>
                      Created At:
                    </Text>
                    <Text
                      allowFontScaling={false}
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{
                        ...Style.configName,
                        color: Colors.primary,
                        marginLeft: 5,
                      }}>
                      {config.dateSaved}
                    </Text>
                  </View>
                  <TextButton
                    label={'Config Details'}
                    onPress={() => handleViewConfig(config)}
                    labelStyle={{
                      ...Style.labelStyle,
                      color: Colors.primary,
                      fontSize: responsiveFontSize(2),
                      textDecorationLine: 'underline',
                    }}
                    buttonContainerStyle={{
                      ...Style.buttonContainerStyle,
                      alignSelf: 'flex-end',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      backgroundColor: null,
                      elevation: 0,
                      padding: 0,
                      margin: 0,
                    }}
                  />
                </View>
              </View>
            ))
          ) : (
            <View style={Style.configMessage}>
              <Text
                allowFontScaling={false}
                style={{
                  ...Style.message,
                  fontSize: responsiveFontSize(2.5),
                  marginVertical: 0,
                }}>
                No configurations created yet!
              </Text>
            </View>
          )
        ) : null}

        <View style={Style.sectionHeader}>
          <Text
            allowFontScaling={false}
            style={{...Style.header, color: theme.textColor}}>
            Edit GPA Configuration
          </Text>
          <Switch
            trackColor={{
              false: Colors.primaryTransparent,
              true: Colors.primary,
            }}
            thumbColor={isGpaExpanded ? Colors.white : Colors.placeholder}
            value={isGpaExpanded}
            onValueChange={setIsGpaExpanded}
          />
        </View>

        {isGpaExpanded &&
          localGpaConfig.map((item, index) => (
            <View key={index} style={Style.inputContainer}>
              <View
                style={{
                  ...Style.pickerStyle,
                  backgroundColor: theme.backgroundColor,
                }}>
                <Picker
                  selectedValue={item.letterGrade}
                  onValueChange={value =>
                    handleInputChange(value, index, 'letterGrade')
                  }
                  mode="dropdown"
                  dropdownIconColor={Colors.primary}
                  style={{
                    ...Style.pickerStyle,
                    color: theme.textColor,
                    width: responsiveWidth(31),
                  }}>
                  {letterGrades.map((grade, gradeIndex) => (
                    <Picker.Item
                      key={gradeIndex}
                      label={grade}
                      value={grade}
                      color={theme.textColor}
                      style={{backgroundColor: theme.backgroundColor}}
                    />
                  ))}
                </Picker>
              </View>
              <TextInput
                style={{...Style.input, color: theme.textColor}}
                value={item.marksRange}
                allowFontScaling={false}
                onChangeText={text =>
                  handleInputChange(text, index, 'marksRange')
                }
                keyboardType="phone-pad"
              />
              <TextInput
                style={{...Style.input, color: theme.textColor}}
                value={item.gpa.toString()}
                onChangeText={text => handleInputChange(text, index, 'gpa')}
                // keyboardType="decimal-pad"
                keyboardType="phone-pad"
                allowFontScaling={false}
              />
              <Entypo
                allowFontScaling={false}
                name="trash"
                color={Colors.redColor}
                size={18}
                onPress={() => handleParticularDeleteConfig(index)}
                style={Style.trashIconStyle}
              />
            </View>
          ))}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CreateCustomScale;
