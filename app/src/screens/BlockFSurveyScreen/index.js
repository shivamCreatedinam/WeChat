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


    // 
    const [SpecificInformation, setSpecificInformation] = React.useState(null);
    const [comfortableConducting, setComfortableConducting] = React.useState(null);
    const [grievanceRelated, setGrievanceRelated] = React.useState(null);

    // gender setDifferently
    const data = [
        {
            label: 'Yes'
        },
        {
            label: 'No'
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
        },
        {
            label: 'Can’t say/ Never approached'
        },
        {
            label: 'NA (do not use agent point)'
        }
    ];

    const possessnecessary = [
        { id: 1, lable: 'Yes, I know it all ' },
        { id: 2, lable: 'Yes, but I want to know more' },
        { id: 3, lable: 'No, I want to know' },
    ];

    const languagewhich = [
        { id: 1, lable: 'Hindi' },
        { id: 2, lable: 'English' },
        { id: 3, lable: 'Local Language/Dialect' },
    ];

    const informationsharing = [
        { id: 1, lable: ' Pamphlets/ Brochures/ Public Hoardings' },
        { id: 2, lable: 'Newspaper Advertisements' },
        { id: 3, lable: 'Television/Radio Advertisements' },
        { id: 4, lable: 'School Syllabus' },
        { id: 5, lable: 'Email/SMS' },
        { id: 6, lable: 'Small Group Meetings' },
        { id: 7, lable: 'Visit Designated Centers' },
    ]

    const financialliteracy = [
        { id: 1, lable: 'At the Designated Centre (bank Branches/BC Point etc.' },
        { id: 2, lable: 'At Schools/Colleges' },
        { id: 3, lable: 'At Anganwadi Kendra' },
        { id: 4, lable: 'At Village Panchayat' },
        { id: 5, lable: 'At Bus Stands/ Railway Stations' },
        { id: 6, lable: 'At Public Events/ Mela, etc.' },
        { id: 7, lable: 'At Market Places' },
    ]

    const Informationrelating = [
        { id: 1, lable: 'Savings/Deposit' },
        { id: 2, lable: 'Remittances/ Fund Transfer' },
        { id: 3, lable: 'Credit (Loans)' },
        { id: 4, lable: 'Investments (MF, etc.)' },
        { id: 5, lable: 'Insurance (Life & Non-Life)' },
        { id: 6, lable: 'Pension' },
        { id: 7, lable: 'Grievance Redressal' },
    ]

    const financialtransactions = [
        { id: 1, lable: 'Misuse of Documents (ID, Address, etc.)' },
        { id: 2, lable: 'Breach of PIN, OTP, or Passwords' },
        { id: 3, lable: 'Unauthorized withdrawals from the Account ' },
        { id: 4, lable: 'Inability to distinguish between phone calls made by bank officials and fraudsters' },
        { id: 5, lable: 'Charges levied by banks/BCs' },
        { id: 6, lable: 'Trust on Business Correspondents' },
        { id: 7, lable: 'Failure of banks' },
    ]

    const financialchallengingdifficult = [
        { id: 1, lable: 'Lodge complaints against financial service providers – banks/NBFCs/Insurance Co, etc' },
        { id: 2, lable: 'Follow up on the time-bound disposal of complaints' },
        { id: 3, lable: ' Queues/wait time at financial service providers' },
        { id: 4, lable: 'Clash of branch’s working timings with my work/business timings' },
        { id: 5, lable: 'Arranging the documentation requirements' },
        { id: 6, lable: 'Language barrier in digital transactions' },
        { id: 7, lable: 'Complex Interface for online services' },
        { id: 8, lable: 'Dependence on smartphone and internet connection' },
    ]

    const transactionsdigitally = [
        { id: 1, lable: 'Poor connectivity' },
        { id: 2, lable: 'Language barrier' },
        { id: 3, lable: 'Complex interface' },
        { id: 4, lable: 'No trust in Digital Platforms' },
    ]

    const digitalChannel = [
        { id: 1, lable: 'Money transfer' },
        { id: 2, lable: 'Bill Payment' },
        { id: 3, lable: 'Balance Enquiry/Statement' },
        { id: 4, lable: 'Merchant Payment' },
        { id: 5, lable: 'None' },
    ]

    const Digitalpreferred = [
        { id: 1, lable: 'UPI through Mobile App' },
        { id: 2, lable: 'Debit Card' },
        { id: 3, lable: 'Pre-paid Card' },
        { id: 4, lable: 'Mobile Wallets' },
    ]

    const lodgedcomplaintreasons = [
        { id: 1, lable: 'Not Resolved' },
        { id: 2, lable: 'Delayed Response ' },
        { id: 3, lable: 'Complaint not taken' },
        { id: 4, lable: 'Any other' },
    ]

    const bankingtransactionsresponse = [
        { id: 1, lable: 'Don’t trust' },
        { id: 2, lable: 'Fear of data breaches' },
        { id: 3, lable: 'Extra charges' },
        { id: 4, lable: 'Long Queues' },
        { id: 5, lable: 'Bad behaviour' },
    ]

    const addressedtimely = [
        { id: 1, lable: 'BC did not know what to do' },
        { id: 2, lable: 'Still pending with bank officials' },
        { id: 3, lable: 'Unaware of the progress in the case' },
        { id: 4, lable: 'Complaint was dismissed by bank official due to lack of information' },
        { id: 5, lable: 'Received response after one month' },
    ]

    const adults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const childern = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    useFocusEffect(
        React.useCallback(() => {
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
        // AudioRecord.start();
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
            {/* <Modal isVisible={false}>
                <View style={{ height: 200, width: Dimensions.get('screen').width - 50, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 5, padding: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Survey Instructions</Text>
                        <Text style={{ textAlign: 'center', paddingVertical: 15 }}>Once your start the survey, this will track your location, and also record your audio, by click on start button all the featurs enable and track your location and record your audio.</Text>
                        <TouchableOpacity onPress={() => startRecording()} style={{ paddingVertical: 10, paddingHorizontal: 50, backgroundColor: '#000', borderRadius: 5, elevation: 5, }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Start</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal> */}
            {/* <TouchableOpacity onPress={() => startRecording()}>
                <Text>Start Recording</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => stopRecording()}>
                <Text>Stop Recording</Text>
            </TouchableOpacity> */}
            <Text style={{ fontWeight: 'bold', paddingLeft: 20, paddingTop: 10 }}>F. QUALITY OF FINANCIAL SERVICES – FINANCIAL LITERACY, CUSTOMER SERVICE AND GRIEVANCE REDRESSAL</Text>
            {isLoading === false ?
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>32. Do you require specific information and better awareness about your savings, remittances, credit, investments, insurance, pension, digital banking, etc.?</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setSpecificInformation(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>33. If no, do you possess all the necessary information for your financial well-being?</Text>
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                // iconStyle={styles.iconStyle}
                                data={possessnecessary}
                                // search
                                maxHeight={300}
                                labelField="lable"
                                valueField="id"
                                placeholder={!isFocus ? 'Select State' : value}
                                // searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    console.log('______>', JSON.stringify(item))
                                    setValue(item?.id);
                                    setIsFocus(false);
                                }}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        {SpecificInformation?.label === 'Yes' ?
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>34 (a). In which language do you need the information?</Text>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={languagewhich}
                                    // search
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!isFocus ? 'Select Language information' : value}
                                    // searchPlaceholder="Search..."
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        console.log('______>', JSON.stringify(item))
                                        setValue(item?.id);
                                        setIsFocus(false);
                                    }}
                                />
                                <View style={{ padding: 10, }} />
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>34 (b). Which medium of information sharing do you prefer?</Text>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={informationsharing}
                                    // search
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!isFocus ? 'Select information sharing' : value}
                                    // searchPlaceholder="Search..."
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        console.log('______>', JSON.stringify(item))
                                        setValue(item?.id);
                                        setIsFocus(false);
                                    }}
                                />
                                <View style={{ padding: 10, }} />
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>34 (c). Where do you want such financial literacy information to be disseminated?</Text>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={financialliteracy}
                                    // search
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!isFocus ? 'Select Financial Literacy' : value}
                                    // searchPlaceholder="Search..."
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        console.log('______>', JSON.stringify(item))
                                        setValue(item?.id);
                                        setIsFocus(false);
                                    }}
                                />
                                <View style={{ padding: 10, }} />
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>34 (d). Information relating to which function is easy to obtain and understand?</Text>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={Informationrelating}
                                    // search
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!isFocus ? 'Select Financial Literacy' : value}
                                    // searchPlaceholder="Search..."
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        console.log('______>', JSON.stringify(item))
                                        setValue(item?.id);
                                        setIsFocus(false);
                                    }}
                                />
                                <View style={{ padding: 10, }} />
                            </View> : null}
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>35. Regarding your financial transactions, select the top three aspects which make you worry.</Text>
                            <MultiSelect
                                hideTags
                                items={occupations}
                                uniqueKey="id"
                                // ref={(component) => { this.multiSelect = component }}
                                onSelectedItemsChange={(items) => onSelectedOccupationsChange(items)}
                                selectedItems={financialtransactions}
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
                                displayKey="lable"
                                searchInputStyle={{ color: '#CCC', paddingLeft: 10 }}
                                submitButtonColor="#CCC"
                                submitButtonText="Submit"
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>36. In relation to your financial transactions, which of the following is challenging/difficult for you to handle?</Text>
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
                                displayKey="lable"
                                searchInputStyle={{ color: '#CCC', paddingLeft: 10 }}
                                submitButtonColor="#CCC"
                                submitButtonText="Submit"
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37. Digital Transaction</Text>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37 (a). Do you feel confident and comfortable doing digital transactions on your own?</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setSpecificInformation(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37 (b). do you carry out digital transactions on your own? transactions with someone’s help?</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setSpecificInformation(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <View>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37 (c).Do you face any hinderance in carrying out transactions digitally?</Text>
                                <RadioButtonRN
                                    data={data}
                                    selectedBtn={(e) => setSpecificInformation(e)}
                                />
                            </View>
                            <View>
                                <View style={{ padding: 10, }} />
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37 (d). If yes, please indicate top two reasons?</Text>
                                <MultiSelect
                                    hideTags
                                    items={areas}
                                    uniqueKey="id"
                                    // ref={(component) => { this.multiSelect = component }}
                                    onSelectedItemsChange={(items) => onSelectedItemsChange(items)}
                                    selectedItems={transactionsdigitally}
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
                            <View style={{ padding: 10, }} />
                            <View>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37 (e). Have you or anyone in your family lost money in digital payment fraud?</Text>
                                <RadioButtonRN
                                    data={data}
                                    selectedBtn={(e) => setSpecificInformation(e)}
                                />
                            </View>
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37 (f). After the incident, do you continue to use digital banking services?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e) => setDifferently(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>37 (g). Were you or your family member could recover the money lost in digital payment fraud?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e) => setDifferently(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ fontWeight: 'bold' }}>37 (h). Do you know about various precautions while using digital banking?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e) => setDifferently(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ fontWeight: 'bold' }}>38. Usage of Digital Medium for Transaction</Text>
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1, marginBottom: 5 }}>38 (a). Do you use any of the following services via a digital channel (app/internet) linked with this account?</Text>
                            <MultiSelect
                                hideTags
                                items={areas}
                                uniqueKey="id"
                                // ref={(component) => { this.multiSelect = component }}
                                onSelectedItemsChange={(items) => onSelectedItemsChange(items)}
                                selectedItems={digitalChannel}
                                selectText="Select Digital Channel"
                                // searchInputPlaceholderText="Search Items..."
                                // onChangeInput={(text) => console.log(text)}
                                altFontFamily="ProximaNova-Light"
                                tagRemoveIconColor="#CCC"
                                tagBorderColor="#CCC"
                                tagTextColor="#CCC"
                                selectedItemTextColor="#CCC"
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                displayKey="lable"
                                searchInputStyle={{ color: '#CCC', paddingLeft: 10 }}
                                submitButtonColor="#CCC"
                                submitButtonText="Submit"
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>38 (b). If Digital is your preferred mode of transaction, rate them in your order of preference?</Text>
                            <MultiSelect
                                hideTags
                                items={areas}
                                uniqueKey="id"
                                // ref={(component) => { this.multiSelect = component }}
                                onSelectedItemsChange={(items) => onSelectedItemsChange(items)}
                                selectedItems={Digitalpreferred}
                                selectText="Select Digital Preferred"
                                // searchInputPlaceholderText="Search Items..."
                                // onChangeInput={(text) => console.log(text)}
                                altFontFamily="ProximaNova-Light"
                                tagRemoveIconColor="#CCC"
                                tagBorderColor="#CCC"
                                tagTextColor="#CCC"
                                selectedItemTextColor="#CCC"
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                displayKey="lable"
                                searchInputStyle={{ color: '#CCC', paddingLeft: 10 }}
                                submitButtonColor="#CCC"
                                submitButtonText="Submit"
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39. Customer Service and Complaints</Text>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (a). As a bank customer, are you satisfied with the services?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setSmartphone(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (b). Do bank staff remain attentive and sensitive to your problems?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setSmartphone(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (c). If you have any complaints, do you know how to lodge a complaint?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setSmartphone(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (d). If you have ever lodged a complaint, are you satisfied with its resolution?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setSmartphone(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (e). If no, what could be the reasons?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setSmartphone(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (f). Do you know about the RBI Integrated Banking Ombudsman Scheme?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setSmartphone(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (g). Do you know about the complaint process regarding others such as Insurance, Pension, etc.?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setSmartphone(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40. Customer Service Quality at BC point</Text>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (a). Do you feel comfortable conducting banking transactions at an agent point (BC/BC Outlet) ?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setComfortableConducting(e)}
                            />
                            <View style={{ padding: 10, }} />
                            {comfortableConducting?.label === 'No' ? <><Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (b). Please indicate the reasons?</Text>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={bankingtransactionsresponse}
                                    // search
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!isFocus ? 'Select Indicate the reasons' : value}
                                    // searchPlaceholder="Search..."
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        console.log('______>', JSON.stringify(item))
                                        setValue(item?.id);
                                        setIsFocus(false);
                                    }}
                                /></> : null}
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (c). Is the BC agent able to offer the product or service that you require?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e) => setSmartphone(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (d). Does the BC agent satisfactorily respond to your queries?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e) => setSmartphone(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (e). Does your BC indicate the charges for the services offered upfront?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e) => setSmartphone(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (f). Do you know, how to lodge a complaint at the BC point?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e) => setSmartphone(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (g). Whether you raised any grievance related to service with BC?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e) => setGrievanceRelated(e)}
                            />
                            {grievanceRelated?.label === 'Yes' ? <>
                                <View style={{ padding: 10, }} />
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (h). If response to Q40(g) is Yes, whether your grievance was addressed timely (within one month)?</Text>
                                <RadioButtonRN
                                    data={smartphone}
                                    selectedBtn={(e) => setSmartphone(e)}
                                />
                            </> : <>
                                <View style={{ padding: 10, }} />
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (i). If response to Q40(g) is No, what were reasons provided by BC Agent?</Text>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={addressedtimely}
                                    // search
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!isFocus ? 'Select Reasons provided by BC' : value}
                                    // searchPlaceholder="Search..."
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        console.log('______>', JSON.stringify(item))
                                        setValue(item?.id);
                                        setIsFocus(false);
                                    }}
                                /></>}
                            <View style={{ padding: 10, }} />
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