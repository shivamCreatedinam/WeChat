import { Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity, StatusBar, useWindowDimensions, ActivityIndicator, TextInput, Alert, BackHandler, ScrollView, StyleSheet } from 'react-native'
import React, { Component, useCallback } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageContaints from '../../utility/AsyncStorageConstants';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import RadioButtonRN from 'radio-buttons-react-native';
import MultiSelect from 'react-native-multiple-select';
import database from '@react-native-firebase/database';
import AudioRecord from 'react-native-audio-record';
import Modal from 'react-native-modal';
import Axios from 'axios';
import { Children } from 'react';
// import fs from 'fs';

const BlockFSurveyScreen = () => {

    const navigation = useNavigation();
    const [name, setName] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [isRecording, setIsRecording] = React.useState(false);
    const [isInstruction, setSurveyInstruction] = React.useState(true);
    const [isLoading, setLoading] = React.useState(false);
    const [userSendToken, setUserSendToken] = React.useState('');
    const [audioPath, setAudioPath] = React.useState('');
    const [areas, setAreas] = React.useState([]);
    const [educations, setEducations] = React.useState([]);
    const [incomes, setIncomes] = React.useState([]);
    const [occupations, setOccupations] = React.useState([]);
    const [areasSelected, setSelectedAreas] = React.useState([]);
    const [state, setStateData] = React.useState([]);
    const [DistrictData, setDistrictData] = React.useState([]);

    // country dropdowns
    const [value, setValue] = React.useState(null);
    const [selectedState, setSelectedState] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);

    // select district
    const [valueDistrict, setDistrictValue] = React.useState(null);
    const [selectedDistrict, setSelectedDistrict] = React.useState(null);
    const [isDistrictFocus, setIsDistrictFocus] = React.useState(false);

    // lable fields. 
    const [surveryName, setSurveyName] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [age, setAgeNumber] = React.useState(0);
    const [adult, setAdults] = React.useState(0);
    const [children, setChildren] = React.useState(0);
    const [selectedEducation, setSelectedEducation] = React.useState([]);
    const [selectedOccupations, setSelectedOccupations] = React.useState([]);
    const [selectedIncomes, setSelectedIncomes] = React.useState([]);
    const [differentlyAble, setDifferently] = React.useState('');
    const [smartPhone, setSmartphone] = React.useState('');
    const [anyGroup, setAnyGroup] = React.useState('');

    // gender setDifferently
    const data = [
        {
            label: 'Male'
        },
        {
            label: 'Female'
        },
        {
            label: 'Prefer not to say'
        }
    ];

    // anyGroup
    const dataGroup = [
        {
            label: 'Yes'
        },
        {
            label: 'No'
        }
    ];

    const smartphone = [
        {
            label: 'Yes'
        },
        {
            label: 'No'
        }
    ];

    const differently = [
        {
            label: 'Yes'
        },
        {
            label: 'No'
        }
    ];

    const adults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const childern = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    useFocusEffect(
        React.useCallback(() => {
            getLoadingData();
            readMessages();
            return () => {
                // Useful for cleanup functions
            };
        }, [])
    );

    React.useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", askToCloseApp);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", askToCloseApp);
        };
    }, []);

    const readMessages = async () => {
        try {
            const userId = await AsyncStorage.getItem(AsyncStorageContaints.tempServerTokenId);
            const UserData = await AsyncStorage.getItem(AsyncStorageContaints.UserData);
            const UserToken = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
            //UserId
            setUserSendToken(UserToken);
            setUserName(UserData);
            setName(userId);
            console.log("error", userId)
        } catch (error) {
            console.log("error_", error)
        }
    }

    const getLoadingData = async () => {
        setLoading(true);
        const UserToken = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserToken}`
        }
        Axios.get(`https://createdinam.in/RBI-CBCD/public/api/get-demographic-details`, {
            headers: headers
        })
            .then((response) => {
                console.log('getLoadingData', JSON.stringify(response.data))
                if (response.data.status === true) {
                    setAreas(response.data?.areas);
                    setEducations(response.data?.educations);
                    setIncomes(response.data?.incomes);
                    setOccupations(response.data?.occupations);
                    getState(UserToken);
                } else {
                    setLoading(false);
                    showMessage({
                        message: "Something went wrong!",
                        description: "Something went wrong. Try again!",
                        type: "danger",
                    });
                }
            });
    }

    const getState = (token) => {
        let url = `https://createdinam.in/RBI-CBCD/public/api/get-states`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        Axios.get(url, {
            headers: headers
        })
            .then((response) => {
                console.log('getState', JSON.stringify(response?.data?.data))
                if (response.data.status === true) {
                    setLoading(false);
                    setStateData(response?.data?.data);
                } else {
                    setLoading(false);
                    showMessage({
                        message: "Something went wrong!",
                        description: "Something went wrong. Try again!",
                        type: "danger",
                    });
                }
            });
    }

    const loadDistrict = async (state) => {
        console.log('loadDistrict______', JSON.stringify(state))
        const UserToken = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
        let url = `https://createdinam.in/RBI-CBCD/public/api/get-city/${Number(state)}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserToken}`
        }
        Axios.get(url, {
            headers: headers,
        })
            .then((response) => {
                if (response.data.status === true) {
                    setDistrictData(response?.data?.data);
                } else {
                    setLoading(false);
                    showMessage({
                        message: "Something went wrong!",
                        description: "Something went wrong. Try again!",
                        type: "danger",
                    });
                }
            });
    }

    // AudioRecord.on('data', data => {
    //     // base64-encoded audio data chunks
    //     console.log('AudioRecord_>', JSON.stringify(data));
    // });

    const askToCloseApp = () => {
        Alert.alert(
            "Close Survey",
            "Are you sure, you want to Close survey, you lose all the data?",
            [
                { text: "No" },
                {
                    text: "Yes", onPress: () => {
                        navigation.goBack();
                        return true;
                    }
                },
            ]
        );
    }

    const renderCustomHeader = () => {
        const user = {
            _id: 1,
            name: name,
            avatar: 'https://electricallicenserenewal.com/app-assets/images/user/12.jpg',
            active: true,
        };
        // this.props?.route?.params?.item?.profile_image,
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, alignSelf: 'flex-start', marginTop: StatusBar.currentHeight, paddingHorizontal: 20, backgroundColor: '#fff', elevation: 5, width: '100%' }}>
                <TouchableOpacity onPress={() => askToCloseApp()} style={{ marginRight: 10, padding: 5 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../res/images/tab/goback.png')} />
                </TouchableOpacity>
                <Image
                    source={require('../../../res/images/appLogo/app_logo_main.png')}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={{ fontWeight: 'bold' }}>{userName} - {user.name}</Text>
                    {user.active && <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold' }}>Active Survey Token - <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'red' }}>Block F</Text> </Text>}
                </View>
                {isRecording === true ? <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: 'green' }} /> : <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: 'red' }} />}
            </View>
        );
    }

    const startRecording = async () => {
        setSurveyInstruction(false);
        setIsRecording(true);
        AudioRecord.start();
    };

    const stopRecording = async () => {
        // or to get the wav file path
        console.warn('startRecording')
        const audioFile = await AudioRecord.stop();
        console.warn(audioFile)
        setAudioPath(audioFile);
        submitSurvey(audioFile);
    };

    const validationCheck = () => {
        const pattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
        const AgeRegex = /^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$/
        if (pattern.test(surveryName)) {
            if (gender !== '') {
                if (AgeRegex.test(age)) {
                    if (selectedOccupations.length !== 0) {
                        if (selectedEducation.length !== 0) {
                            if (selectedIncomes.length !== 0) {
                                if (value !== null) {
                                    if (valueDistrict !== null) {
                                        if (areasSelected.length !== 0) {
                                            if (differentlyAble !== '') {
                                                if (adult !== '') {
                                                    if (children !== '') {
                                                        if (anyGroup !== '') {
                                                            if (smartPhone !== '') {
                                                                console.log('validationCheck', AgeRegex.test(age))
                                                                stopRecording();
                                                            } else {
                                                                showMessage({
                                                                    message: "Please Select SmartPhone Own!",
                                                                    description: "Please Select SmartPhone Own!",
                                                                    type: "danger",
                                                                });
                                                            }
                                                        } else {
                                                            showMessage({
                                                                message: "Please Select Any Group Part!",
                                                                description: "Please Select Any Group Part SHG/JLG!",
                                                                type: "danger",
                                                            });
                                                        }
                                                    } else {
                                                        showMessage({
                                                            message: "Please Select Children!",
                                                            description: "Please Select Number Of Children!",
                                                            type: "danger",
                                                        });
                                                    }
                                                } else {
                                                    showMessage({
                                                        message: "Please Select Adults!",
                                                        description: "Please Select Number Of Adults!",
                                                        type: "danger",
                                                    });
                                                }
                                            } else {
                                                showMessage({
                                                    message: "Please Select Differently!",
                                                    description: "Please Select Differently abled!",
                                                    type: "danger",
                                                });
                                            }
                                        } else {
                                            showMessage({
                                                message: "Please Select Area",
                                                description: "Please Select Area!",
                                                type: "danger",
                                            });
                                        }
                                    } else {
                                        showMessage({
                                            message: "Please Select District",
                                            description: "Please Select District!",
                                            type: "danger",
                                        });
                                    }
                                } else {
                                    showMessage({
                                        message: "Please Select State",
                                        description: "Please Select State!",
                                        type: "danger",
                                    });
                                }
                            } else {
                                showMessage({
                                    message: "Please Select Incomes",
                                    description: "Please Select Incomes!",
                                    type: "danger",
                                });
                            }
                        } else {
                            showMessage({
                                message: "Please Select Education",
                                description: "Please Select Education!",
                                type: "danger",
                            });
                        }
                    } else {
                        showMessage({
                            message: "Please Select Occupation",
                            description: "Please Select Occupation!",
                            type: "danger",
                        });
                    }
                } else {
                    showMessage({
                        message: "Please Enter Valid Age",
                        description: "Please Enter Valid Age!",
                        type: "danger",
                    });
                }
            } else {
                showMessage({
                    message: "Please Select Gender",
                    description: "Please Select Valid Gender!",
                    type: "danger",
                });
            }
        } else {
            showMessage({
                message: "Please Enter Name",
                description: "Please Enter Valid Name!",
                type: "danger",
            });
        }
    }

    const submitSurvey = async (file_urls) => {
        // https://createdinam.in/RBI-CBCD/public/api/create-survey-demographics
        const FormData = require('form-data');
        let data = new FormData();
        data.append('user_name', surveryName);
        data.append('survey_token', user.name);
        data.append('gender', gender);
        data.append('age_of_repons', age);
        data.append('city', value);
        data.append('state', valueDistrict);
        data.append('occupation_id', selectedOccupations);
        data.append('education_id', selectedEducation);
        data.append('income_id', selectedIncomes);
        data.append('area_id', areasSelected);
        data.append('diff_abled', differentlyAble);
        data.append('adults', adult);
        data.append('children', children);
        data.append('total', Number(adult) + Number(children));
        data.append('part_of_group', anyGroup);
        data.append('own_smartphone', smartPhone);
        data.append('latitude', '27.98878');
        data.append('longitude', '28.00000');
        data.append('other_occupation', '1');
        data.append('audio_file', file_urls);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://createdinam.in/RBI-CBCD/public/api/create-survey-demographics',
            headers: {
                'Authorization': 'Bearer ' + userSendToken,
                "Content-Type": "multipart/form-data",
            },
            data: data
        };

        Axios.request(config)
            .then((response) => {
                console.warn('startRecording', JSON.stringify(response.data))
                if (response.data.status === true) {
                    showMessage({
                        message: response.data.message + ', Submit By ' + response.data?.name,
                        description: response.data.message,
                        type: "success",
                    });
                } else {
                    showMessage({
                        message: "Something went wrong!",
                        description: "Someting went wrong, Please check Form Details!",
                        type: "danger",
                    });
                }
            });

    }

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedAreas(selectedItems);
    }

    const onSelectedEducationChange = (selectedItems) => {
        setSelectedEducation(selectedItems);
    }

    const onSelectedOccupationsChange = (selectedItems) => {
        setSelectedOccupations(selectedItems);
    }

    const onSelectedIncomesChange = (selectedItems) => {
        setSelectedIncomes(selectedItems);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8FF' }}>
            {renderCustomHeader()}
            <Modal isVisible={isInstruction}>
                <View style={{ height: 200, width: Dimensions.get('screen').width - 50, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 5, padding: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Survey Instructions</Text>
                        <Text style={{ textAlign: 'center', paddingVertical: 15 }}>Once your start the survey, this will track your location, and also record your audio, by click on start button all the featurs enable and track your location and record your audio.</Text>
                        <TouchableOpacity onPress={() => startRecording()} style={{ paddingVertical: 10, paddingHorizontal: 50, backgroundColor: '#000', borderRadius: 5, elevation: 5, }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Start</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* <TouchableOpacity onPress={() => startRecording()}>
                <Text>Start Recording</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => stopRecording()}>
                <Text>Stop Recording</Text>
            </TouchableOpacity> */}
            <Text style={{ fontWeight: 'bold', paddingLeft: 20, paddingTop: 10 }}>B. ACCESS and USAGE OF FINANCIAL SERVICES – BANK ACCOUNT</Text>
            {isLoading === false ?
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>1. Name</Text>
                            <TextInput onChangeText={(e) => setSurveyName(e)} style={{ backgroundColor: '#fff', paddingLeft: 15 }} placeholder='Enter Name' />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>2. Gender</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setGender(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>3. Age</Text>
                            <TextInput onChangeText={(e) => setAgeNumber(e)} style={{ backgroundColor: '#fff', paddingLeft: 15 }} placeholder='Age' keyboardType={'number-pad'} maxLength={2} />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>4. Occupation (In case of Overlap, report primary occupation)</Text>
                            <MultiSelect
                                hideTags
                                items={occupations}
                                uniqueKey="id"
                                // ref={(component) => { this.multiSelect = component }}
                                onSelectedItemsChange={(items) => onSelectedOccupationsChange(items)}
                                selectedItems={selectedOccupations}
                                selectText="Occupation"
                                // searchInputPlaceholderText="Search Items..."
                                // onChangeInput={(text) => console.log(text)}
                                altFontFamily="ProximaNova-Light"
                                tagRemoveIconColor="#CCC"
                                tagBorderColor="#CCC"
                                tagTextColor="#CCC"
                                selectedItemTextColor="#CCC"
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                displayKey="occupation_name"
                                searchInputStyle={{ color: '#CCC', paddingLeft: 10 }}
                                submitButtonColor="#CCC"
                                submitButtonText="Submit"
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>5. Education</Text>
                            <MultiSelect
                                hideTags
                                items={educations}
                                uniqueKey="id"
                                // ref={(component) => { this.multiSelect = component }}
                                onSelectedItemsChange={(items) => onSelectedEducationChange(items)}
                                selectedItems={selectedEducation}
                                selectText="Education"
                                // searchInputPlaceholderText="Search Items..."
                                // onChangeInput={(text) => console.log(text)}
                                altFontFamily="ProximaNova-Light"
                                tagRemoveIconColor="#CCC"
                                tagBorderColor="#CCC"
                                tagTextColor="#CCC"
                                selectedItemTextColor="#CCC"
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                displayKey="education_title"
                                searchInputStyle={{ color: '#CCC', paddingLeft: 10 }}
                                submitButtonColor="#CCC"
                                submitButtonText="Submit"
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>6. Annual Income (For non-earning respondents, the income of parents or spouse can be reported)</Text>
                            <MultiSelect
                                hideTags
                                items={incomes}
                                uniqueKey="id"
                                // ref={(component) => { this.multiSelect = component }}
                                onSelectedItemsChange={(items) => onSelectedIncomesChange(items)}
                                selectedItems={selectedIncomes}
                                selectText="Annual Income"
                                // searchInputPlaceholderText="Search Items..."
                                // onChangeInput={(text) => console.log(text)}
                                altFontFamily="ProximaNova-Light"
                                tagRemoveIconColor="#CCC"
                                tagBorderColor="#CCC"
                                tagTextColor="#CCC"
                                selectedItemTextColor="#CCC"
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                displayKey="icomes_title"
                                searchInputStyle={{ color: '#CCC', paddingLeft: 10 }}
                                submitButtonColor="#CCC"
                                submitButtonText="Submit"
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>7. Location</Text>
                            <View>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>State</Text>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={state}
                                    // search
                                    maxHeight={300}
                                    labelField="name"
                                    valueField="id"
                                    placeholder={!isFocus ? 'Select State' : value}
                                    // searchPlaceholder="Search..."
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        console.log('______>', JSON.stringify(item))
                                        setValue(item?.name);
                                        loadDistrict(item?.id);
                                        setIsFocus(false);
                                    }}
                                />
                            </View>
                            <View>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>District</Text>
                                <Dropdown
                                    style={[styles.dropdown, isDistrictFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={DistrictData}
                                    // search
                                    maxHeight={300}
                                    labelField="name"
                                    valueField="distic_code"
                                    placeholder={!isDistrictFocus ? 'Select District' : valueDistrict}
                                    // searchPlaceholder="Search..."
                                    value={valueDistrict}
                                    onFocus={() => setIsDistrictFocus(true)}
                                    onBlur={() => setIsDistrictFocus(false)}
                                    onChange={item => {
                                        console.log(JSON.stringify(item))
                                        setDistrictValue(item.name);
                                        setIsDistrictFocus(false);
                                    }}
                                />
                            </View>
                            <View>
                                <View style={{ padding: 10, }} />
                                <MultiSelect
                                    hideTags
                                    items={areas}
                                    uniqueKey="id"
                                    // ref={(component) => { this.multiSelect = component }}
                                    onSelectedItemsChange={(items) => onSelectedItemsChange(items)}
                                    selectedItems={areasSelected}
                                    selectText="Select Areas"
                                    // searchInputPlaceholderText="Search Items..."
                                    // onChangeInput={(text) => console.log(text)}
                                    altFontFamily="ProximaNova-Light"
                                    tagRemoveIconColor="#CCC"
                                    tagBorderColor="#CCC"
                                    tagTextColor="#CCC"
                                    selectedItemTextColor="#CCC"
                                    selectedItemIconColor="#CCC"
                                    itemTextColor="#000"
                                    displayKey="area_title"
                                    searchInputStyle={{ color: '#CCC', paddingLeft: 10 }}
                                    submitButtonColor="#CCC"
                                    submitButtonText="Submit"
                                />
                            </View>
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>8. Are you differently abled?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e) => setDifferently(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>9. Size of Household</Text>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold', marginRight: 10 }}>Total : {Number(adult) + Number(children)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Adults</Text>
                                    <SelectDropdown
                                        data={adults}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                            setAdults(selectedItem);
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            // text represented after item is selected
                                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            // text represented for each item in dropdown
                                            // if data array is an array of objects then return item.property to represent item in dropdown
                                            return item
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1, marginLeft: 5 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Children's</Text>
                                    <SelectDropdown
                                        data={childern}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index);
                                            setChildren(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            // text represented after item is selected
                                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            // text represented for each item in dropdown
                                            // if data array is an array of objects then return item.property to represent item in dropdown
                                            return item
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>10. Are you part of any group (SHG/JLG or formal group) ?</Text>
                            <RadioButtonRN
                                data={dataGroup}
                                selectedBtn={(e) => setAnyGroup(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>11. Do you own a smartphone ?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setSmartphone(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <TouchableOpacity onPress={() => navigation.replace('DashboardScreen')} style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#000', borderRadius: 10 }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Complete Survey</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView> : <ActivityIndicator style={{ alignItems: 'center', marginTop: Dimensions.get('screen').width }} color={'#000'} />}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default BlockFSurveyScreen;