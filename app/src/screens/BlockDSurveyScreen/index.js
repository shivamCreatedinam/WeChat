import { Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity, StatusBar, useWindowDimensions, ActivityIndicator, TextInput, Alert, BackHandler, ScrollView, StyleSheet } from 'react-native'
import React, { Component, useCallback, useRef } from 'react'
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

const BlockDSurveyScreen = () => {

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
    const [life, setLife] = React.useState(null);
    const [nonLife, setNonLife] = React.useState(null);
    const [getInsurance, setGetInsurance] = React.useState(null);
    const [selectedReason, setSelectedReason] = React.useState([]);
    const [awareA, setAwareA] = React.useState(null);
    const [enrollA, setEnrollA] = React.useState(null);
    const [renewalA, setRenewalA] = React.useState(null);
    const [inactiveA, setInactiveA] = React.useState(null);
    const [awareB, setAwareB] = React.useState(null);
    const [enrollB, setEnrollB] = React.useState(null);
    const [renewalB, setRenewalB] = React.useState(null);
    const [inactiveB, setInactiveB] = React.useState(null);
    const [awareC, setAwareC] = React.useState(null);
    const [enrollC, setEnrollC] = React.useState(null);
    const [renewalC, setRenewalC] = React.useState(null);
    const [inactiveC, setInactiveC] = React.useState(null);
    const [awareD, setAwareD] = React.useState(null);
    const [enrollD, setEnrollD] = React.useState(null);
    const [renewalD, setRenewalD] = React.useState(null);
    const [inactiveD, setInactiveD] = React.useState(null);
    const [privateBorrowing, setprivateBorrowing] = React.useState(null);
    const [privateBorrowingFocus, setPrivateBorrowingFocus] = React.useState(null);
    const [reasonForEnroll, setReasonForEnroll] = React.useState([]);
    const [enrolledOtherInsurance, setEnrolledOtherInsurance] = React.useState(null);
    const [rupayCover, setRupayCover] = React.useState(null);
    const [PMJJBY, setPMJJBY] = React.useState(null);
    const [PMFBY, setPMFBY] = React.useState(null);
    const [other, setOther] = React.useState(null);
    const [insuranceInactive, setInsuranceInactive] = React.useState([]);
    const multiSelectRef = useRef(null);
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

    const reason = [
        { id: 1, lable: 'Don’t need it' },
        { id: 2, lable: 'Don’t trust' },
        { id: 3, lable: 'No money to pay premium' },
        { id: 4, lable: 'Any other reason' },
    ]

    const enrolPlace = [
        { id: 1, lable: 'Bank Branch ' },
        { id: 2, lable: 'BC Agent' },
        { id: 3, lable: 'Digital App' },
        { id: 4, lable: 'Insurance Agent ' },
    ]
    const enrolReason = [
        { id: 1, lable: 'Needed the product ' },
        { id: 2, lable: 'Liked the benefits' },
        { id: 3, lable: 'Enrolled by the bank on its own' },
        { id: 4, lable: 'Convinced by Family/Friends' },
    ]

    const InsuranceInactiveReason = [
        { id: 1, lable: 'Lack of Funds' },
        { id: 2, lable: 'No Trust' },
        { id: 3, lable: 'No intimation received' },
        { id: 4, lable: 'Don’t like the service/support' },
    ]

    const adults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const childern = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    useFocusEffect(
        React.useCallback(() => {
            // getLoadingData();
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
                    {user.active && <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold' }}>Active Survey Token - <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'red' }}>Block D</Text> </Text>}
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

    // const validationCheck = () => {
    //     const pattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    //     const AgeRegex = /^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$/
    //     if (pattern.test(surveryName)) {
    //         if (gender !== '') {
    //             if (AgeRegex.test(age)) {
    //                 if (selectedOccupations.length !== 0) {
    //                     if (selectedEducation.length !== 0) {
    //                         if (selectedIncomes.length !== 0) {
    //                             if (value !== null) {
    //                                 if (valueDistrict !== null) {
    //                                     if (areasSelected.length !== 0) {
    //                                         if (differentlyAble !== '') {
    //                                             if (adult !== '') {
    //                                                 if (children !== '') {
    //                                                     if (anyGroup !== '') {
    //                                                         if (smartPhone !== '') {
    //                                                             console.log('validationCheck', AgeRegex.test(age))
    //                                                             stopRecording();
    //                                                         } else {
    //                                                             showMessage({
    //                                                                 message: "Please Select SmartPhone Own!",
    //                                                                 description: "Please Select SmartPhone Own!",
    //                                                                 type: "danger",
    //                                                             });
    //                                                         }
    //                                                     } else {
    //                                                         showMessage({
    //                                                             message: "Please Select Any Group Part!",
    //                                                             description: "Please Select Any Group Part SHG/JLG!",
    //                                                             type: "danger",
    //                                                         });
    //                                                     }
    //                                                 } else {
    //                                                     showMessage({
    //                                                         message: "Please Select Children!",
    //                                                         description: "Please Select Number Of Children!",
    //                                                         type: "danger",
    //                                                     });
    //                                                 }
    //                                             } else {
    //                                                 showMessage({
    //                                                     message: "Please Select Adults!",
    //                                                     description: "Please Select Number Of Adults!",
    //                                                     type: "danger",
    //                                                 });
    //                                             }
    //                                         } else {
    //                                             showMessage({
    //                                                 message: "Please Select Differently!",
    //                                                 description: "Please Select Differently abled!",
    //                                                 type: "danger",
    //                                             });
    //                                         }
    //                                     } else {
    //                                         showMessage({
    //                                             message: "Please Select Area",
    //                                             description: "Please Select Area!",
    //                                             type: "danger",
    //                                         });
    //                                     }
    //                                 } else {
    //                                     showMessage({
    //                                         message: "Please Select District",
    //                                         description: "Please Select District!",
    //                                         type: "danger",
    //                                     });
    //                                 }
    //                             } else {
    //                                 showMessage({
    //                                     message: "Please Select State",
    //                                     description: "Please Select State!",
    //                                     type: "danger",
    //                                 });
    //                             }
    //                         } else {
    //                             showMessage({
    //                                 message: "Please Select Incomes",
    //                                 description: "Please Select Incomes!",
    //                                 type: "danger",
    //                             });
    //                         }
    //                     } else {
    //                         showMessage({
    //                             message: "Please Select Education",
    //                             description: "Please Select Education!",
    //                             type: "danger",
    //                         });
    //                     }
    //                 } else {
    //                     showMessage({
    //                         message: "Please Select Occupation",
    //                         description: "Please Select Occupation!",
    //                         type: "danger",
    //                     });
    //                 }
    //             } else {
    //                 showMessage({
    //                     message: "Please Enter Valid Age",
    //                     description: "Please Enter Valid Age!",
    //                     type: "danger",
    //                 });
    //             }
    //         } else {
    //             showMessage({
    //                 message: "Please Select Gender",
    //                 description: "Please Select Valid Gender!",
    //                 type: "danger",
    //             });
    //         }
    //     } else {
    //         showMessage({
    //             message: "Please Enter Name",
    //             description: "Please Enter Valid Name!",
    //             type: "danger",
    //         });
    //     }
    // }

    const validate = () => {
        if (life === null) {
            showMessage({
                message: "Please Select Insurance Facility!",
                description: "Please Select Insurance Facility!",
                type: "danger",
            });

        }
        else if (nonLife === null) {
            showMessage({
                message: "Please Select Insurance Facility!",
                description: "Please Select Insurance Facility!",
                type: "danger",
            });
        }
        else if (nonLife?.label === "No" && getInsurance === null) {
            showMessage({
                message: "Please Select Inusrance Reason!",
                description: "Please Select Inusrance Reason!",
                type: "danger",
            });
        }
        else if (awareA === null) {
            showMessage({
                message: "Please Select IF Awareness A",
                description: "Please Select IF Awareness A!",
                type: "danger",
            });
        }
        else if (enrollA === null) {
            showMessage({
                message: "Please Select IF Enroll A",
                description: "Please Select IF Enroll A!",
                type: "danger",
            });
        }
        else if (renewalA === null) {
            showMessage({
                message: "Please Select IF renewal A",
                description: "Please Select IF renewal A!",
                type: "danger",
            });
        }
        else if (inactiveA === null) {
            showMessage({
                message: "Please Select IF inactive A",
                description: "Please Select IF inactive A!",
                type: "danger",
            });
        }
        else if (enrollB === null) {
            showMessage({
                message: "Please Select IF Enroll B",
                description: "Please Select IF Enroll B!",
                type: "danger",
            });
        }

        else if (renewalB === null) {
            showMessage({
                message: "Please Select IF renewal B",
                description: "Please Select IF renewal B!",
                type: "danger",
            });
        }
        else if (inactiveB === null) {
            showMessage({
                message: "Please Select IF inactive B",
                description: "Please Select IF inactive B!",
                type: "danger",
            });
        }
        else if (awareC === null) {
            showMessage({
                message: "Please Select IF Awareness C",
                description: "Please Select IF Awareness C!",
                type: "danger",
            });
        }
        else if (enrollC === null) {
            showMessage({
                message: "Please Select IF Enroll C",
                description: "Please Select IF Enroll A!",
                type: "danger",
            });
        }
        else if (renewalC === null) {
            showMessage({
                message: "Please Select IF renewal C",
                description: "Please Select IF renewal C!",
                type: "danger",
            });
        }
        else if (inactiveC === null) {
            showMessage({
                message: "Please Select IF inactive C",
                description: "Please Select IF inactive C!",
                type: "danger",
            });
        }
        else if (awareD === null) {
            showMessage({
                message: "Please Select IF Awareness D",
                description: "Please Select IF Awareness D!",
                type: "danger",
            });
        }
        else if (enrollD === null) {
            showMessage({
                message: "Please Select IF Enroll D",
                description: "Please Select IF Enroll D!",
                type: "danger",
            });
        }
        else if (renewalD === null) {
            showMessage({
                message: "Please Select IF renewal D",
                description: "Please Select IF renewal D!",
                type: "danger",
            });
        }
        else if (inactiveD === null) {
            showMessage({
                message: "Please Select IF inactive D",
                description: "Please Select IF inactive D!",
                type: "danger",
            });
        }
        else if (privateBorrowing === null) {
            showMessage({
                message: "Please Select  Place Of Enroll",
                description: "Please Select  Place Of Enroll!",
                type: "danger",
            });
        }
        else if (reasonForEnroll?.length === 0) {
            showMessage({
                message: "Please Select Reason For Enroll",
                description: "Please Select Reason For Enroll!",
                type: "danger",
            });
        }
        else if (enrolledOtherInsurance === null) {
            showMessage({
                message: "Please Select Other Enroll",
                description: "Please Select Other Enroll!",
                type: "danger",
            });
        }
        else if (rupayCover === null) {
            showMessage({
                message: "Please Select Rupay Accident Cover",
                description: "Please Select Rupay Accident Cover!",
                type: "danger",
            });
        }
        else if (PMJJBY === null) {
            showMessage({
                message: "Please Select PMJJBY",
                description: "Please Select PMJJBY!",
                type: "danger",
            });
        }
        else if (PMFBY === null) {
            showMessage({
                message: "Please Select PMSBY",
                description: "Please Select PMSBY!",
                type: "danger",
            });
        }
        else if (other === null) {
            showMessage({
                message: "Please Select Any Other",
                description: "Please Select Any Othe!",
                type: "danger",
            });
        }
        else if (insuranceInactive?.length === 0) {
            showMessage({
                message: "Please Select Insurance Inactive Resaon",
                description: "Please Select Insurance Inactive Resaon!",
                type: "danger",
            });
        }
        else {
            navigation.replace('BlockESurveyScreen')
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

    const onSelectedReason = (selectedItems) => {
        setReasonForEnroll(selectedItems);
    }

    const onSelectedInsuranceInactiveReason = (selectedItems) => {
        setInsuranceInactive(selectedItems);
    }

    const onSelectedOccupationsChange = (selectedItems) => {
        setSelectedOccupations(selectedItems);
    }

    const onSelectedIncomesChange = (selectedItems) => {
        setSelectedIncomes(selectedItems);
    }

    const SelectedReasonForEnrolLabels = reasonForEnroll.map((selectedId) => {
        const selectedReason = enrolReason.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const SelectedInsuranceInactiveLabels = insuranceInactive.map((selectedId) => {
        const selectedReason = InsuranceInactiveReason.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8FF' }}>
            {renderCustomHeader()}
            {/* <Modal isVisible={isInstruction}>
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
            <Text style={{ fontWeight: 'bold', paddingLeft: 20, paddingTop: 10 }}>D. ACCESS and USAGE OF FINANCIAL SERVICES – INSURANCE FACILITIES</Text>
            {isLoading === false ?
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>23. Do you have any insurance facility?</Text>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>23(a). Life</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setLife(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>23(b). Non-Life</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setNonLife(e)}
                                />
                            </View>
                            {nonLife?.label === "No" ? <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>23(c). If not, do you want to get any insurance facilities?</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => { console.log("RRRRR", e); setGetInsurance(e) }}
                                />
                            </View> : null}
                            {getInsurance?.label === "No" ? <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>23(d). If not interested in any insurance facility, what could be the reasons?</Text>


                                <MultiSelect
                                    hideTags
                                    items={reason}
                                    uniqueKey="id"
                                    ref={multiSelectRef}
                                    onSelectedItemsChange={(items) =>
                                        onSelectedReason(items)
                                    }
                                    selectedItems={selectedReason}
                                    selectText="Select Reason"
                                    onChangeInput={(text) => console.log(text)}
                                    altFontFamily="ProximaNova-Light"
                                    tagRemoveIconColor="#000"
                                    tagBorderColor="#000"
                                    tagTextColor="#000"
                                    selectedItemTextColor="#000"
                                    selectedItemIconColor="#000"
                                    itemTextColor="#000"
                                    displayKey="lable"
                                    searchInputStyle={{ color: '#000', paddingLeft: 10 }}
                                    submitButtonColor="#000"
                                    submitButtonText="Submit"
                                    itemBackground="#000"
                                    styleTextDropdownSelected={{ color: '#000', paddingLeft: 8, fontSize: 16 }}
                                />
                                <View style={{ padding: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {SelectedReasonTypeLabels.map((label, index) => (
                                        <View style={{ margin: 5 }}>
                                            <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View> : null}

                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>24. Specific Insurance Facility/Scheme</Text>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>24(a). In-built Insurance Accident Cover on RuPay card holders under PM Jan Dhan Account [Accidental]</Text>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Awareness</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setAwareA(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Enrolled (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setEnrollA(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Received intimation of renewal/ premium payment (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setRenewalA(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Insurance is inactive due to non-payment of premium (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setInactiveA(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>24(b). Pradhan Mantri Suraksha Bima Yojana (PMSBY) having an annual premium of ₹ 20- per year</Text>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Awareness</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setAwareB(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Enrolled (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setEnrollB(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Received intimation of renewal/ premium payment (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setRenewalB(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Insurance is inactive due to non-payment of premium (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setInactiveB(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>24(c). Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)</Text>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Awareness</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setAwareC(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Enrolled (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setEnrollC(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Received intimation of renewal/ premium payment (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setRenewalC(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Insurance is inactive due to non-payment of premium (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setInactiveC(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>24(d). PM Fasal Bima Yojana [PMFBY]</Text>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Awareness</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setAwareD(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Enrolled (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setEnrollD(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Received intimation of renewal/ premium payment (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setRenewalD(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Insurance is inactive due to non-payment of premium (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setInactiveD(e)}
                                />
                            </View>
                        </View>

                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>25. Where did you enrol for any of the above insurance product?</Text>
                            <Dropdown
                                style={[styles.dropdown, privateBorrowingFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                // iconStyle={styles.iconStyle}
                                // data={AccountType}
                                data={enrolPlace}
                                // search
                                maxHeight={300}
                                labelField="lable"
                                valueField="id"
                                placeholder={!privateBorrowingFocus ? 'Select' : privateBorrowing}
                                // searchPlaceholder="Search..."
                                value={privateBorrowing}
                                onFocus={() => setPrivateBorrowingFocus(true)}
                                onBlur={() => setPrivateBorrowingFocus(false)}
                                onChange={item => {
                                    console.log(JSON.stringify(item))
                                    setprivateBorrowing(item.id);
                                    setPrivateBorrowingFocus(false);
                                }}
                            />
                        </View>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>26 . Why did you enrol in this product?</Text>


                            <MultiSelect
                                hideTags
                                items={enrolReason}
                                uniqueKey="id"
                                ref={multiSelectRef}
                                onSelectedItemsChange={(items) =>
                                    onSelectedReason(items)
                                }
                                selectedItems={reasonForEnroll}
                                selectText="Select Reason"
                                onChangeInput={(text) => console.log(text)}
                                altFontFamily="ProximaNova-Light"
                                tagRemoveIconColor="#000"
                                tagBorderColor="#000"
                                tagTextColor="#000"
                                selectedItemTextColor="#000"
                                selectedItemIconColor="#000"
                                itemTextColor="#000"
                                displayKey="lable"
                                searchInputStyle={{ color: '#000', paddingLeft: 10 }}
                                submitButtonColor="#000"
                                submitButtonText="Submit"
                                itemBackground="#000"
                                styleTextDropdownSelected={{ color: '#000', paddingLeft: 8, fontSize: 16 }}
                            />
                            <View style={{ padding: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                                {SelectedReasonForEnrolLabels.map((label, index) => (
                                    <View style={{ margin: 5 }}>
                                        <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>27. Are you enrolled in any other life insurance (other than above)?</Text>
                            <RadioButtonRN
                                data={dataGroup}
                                selectedBtn={(e) => setEnrolledOtherInsurance(e)}
                            />
                        </View>

                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>28. Do you know anybody, who has received an insurance claim from banks or other insurance agency for the following schemes</Text>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>

                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Rupay Accidental Cover</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setRupayCover(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>PMJJBY</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setPMJJBY(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>PMSBY</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setPMFBY(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Any Other</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setOther(e)}
                                />
                            </View>
                        </View>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>29 . If your insurance has become inactive, please indicate the reasons?</Text>


                            <MultiSelect
                                hideTags
                                items={InsuranceInactiveReason}
                                uniqueKey="id"
                                ref={multiSelectRef}
                                onSelectedItemsChange={(items) =>
                                    onSelectedInsuranceInactiveReason(items)
                                }
                                selectedItems={insuranceInactive}
                                selectText="Select Reason"
                                onChangeInput={(text) => console.log(text)}
                                altFontFamily="ProximaNova-Light"
                                tagRemoveIconColor="#000"
                                tagBorderColor="#000"
                                tagTextColor="#000"
                                selectedItemTextColor="#000"
                                selectedItemIconColor="#000"
                                itemTextColor="#000"
                                displayKey="lable"
                                searchInputStyle={{ color: '#000', paddingLeft: 10 }}
                                submitButtonColor="#000"
                                submitButtonText="Submit"
                                itemBackground="#000"
                                styleTextDropdownSelected={{ color: '#000', paddingLeft: 8, fontSize: 16 }}
                            />
                            <View style={{ padding: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                                {SelectedInsuranceInactiveLabels.map((label, index) => (
                                    <View style={{ margin: 5 }}>
                                        <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={{ padding: 10, }} />
                        <TouchableOpacity onPress={() => validate()}
                            style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#000', borderRadius: 10 }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Next Block E</Text>
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

export default BlockDSurveyScreen;