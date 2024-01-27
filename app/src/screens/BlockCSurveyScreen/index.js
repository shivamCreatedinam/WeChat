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

const BlockCSurveyScreen = () => {

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
    const [loan, setLoan] = React.useState(null);
    const [selectedLoantype, setSelectedLoanType] = React.useState([]);
    const [loanEnroll, setLoanEnroll] = React.useState(null);
    const [loanEnrollFocus, setLoanEnrollFocus] = React.useState(false);
    const [amount, setAmount] = React.useState(null);
    const [amountFocus, setAmountFocus] = React.useState(false);
    const [credFacility, setCredFacility] = React.useState(null);
    const [repay, setRepay] = React.useState(null);
    const [repayFocus, setRepayFocus] = React.useState(false);
    const [selectedReason, setSelectedReason] = React.useState([]);
    const [overDraft, setOverDraft] = React.useState(null);
    const [ReceivedOverDraft, setReceivedOverDraft] = React.useState(null);
    const [bank, setbank] = React.useState(null);
    const [refuse, setRefuse] = React.useState(null);
    const [selectedRefuseReason, setSelectedRefuseReason] = React.useState([]);
    const [freeLoan, setFreeLoan] = React.useState(null);
    const [freeLoanReceived, setFreeLoanReceived] = React.useState(null);
    const [loanRefuseByYou, setLoanrefuseByYou] = React.useState(null);
    const [selectedFreeLoanRefuseReason, setSelectedFreeLoanRefuseReason] = React.useState([]);
    const [privateLend, setPrivateLend] = React.useState(null);
    const [privateBorrowing, setprivateBorrowing] = React.useState(null);
    const [privateBorrowingFocus, setPrivateBorrowingFocus] = React.useState(null);
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

    const loanType = [
        { id: 1, lable: 'Personal loan' },
        { id: 2, lable: 'Education loan' },
        { id: 3, lable: 'Home Loan' },
        { id: 4, lable: 'Vehicle Loan' },
        { id: 5, lable: 'Business Loan' },
        { id: 6, lable: 'KCC' },
        { id: 7, lable: 'Any other' }
    ]

    const enrollLoan = [
        { id: 1, lable: 'Bank Branch' },
        { id: 2, lable: 'NBFC' },
        { id: 3, lable: 'NBFC-MFI' },
        { id: 4, lable: 'BC Agent' },
        { id: 5, lable: 'Digital App' },
    ]

    const outstandingAmount = [
        { id: 1, lable: 'Up to 20 thousand' },
        { id: 2, lable: 'Up to 50 thousand' },
        { id: 3, lable: 'More than 50 thousand upto 1 lakh' },
        { id: 4, lable: 'More than 1 lakh upto 5 lakhs' },
        { id: 5, lable: 'More than 5 lakhs' },
    ]

    const repayment = [
        { id: 1, lable: 'Cash Deposit' },
        { id: 2, lable: 'Mobile App' },
        { id: 3, lable: 'Direct Debit to bank a/c' },
        { id: 4, lable: 'Any other Digital mode' },
    ]

    const reason = [
        { id: 1, lable: 'Don’t need' },
        { id: 2, lable: 'Don’t know the process' },
        { id: 3, lable: 'No nearby branch/BC' },
        { id: 4, lable: 'Lack of awareness' },
        { id: 5, lable: 'Lack of / insufficient collateral' },
        { id: 6, lable: 'High Rate of Interest/Cost' },
        { id: 7, lable: 'Fear of harassment by the recovery agent' },
    ]

    const refuseReason = [
        { id: 1, lable: 'Documentation' },
        { id: 2, lable: 'Purpose' },
        { id: 3, lable: 'Repayment Capacity' },
        { id: 4, lable: 'Any other reason' },
    ]

    const freeLoanRefuse = [
        { id: 1, lable: 'Documentation' },
        { id: 2, lable: 'Purpose' },
        { id: 3, lable: 'Repayment Capacity' },
        { id: 4, lable: 'Lack of collateral' },
        { id: 5, lable: 'Any other reason' },
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
                    {user.active && <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold' }}>Active Survey Token - <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'red' }}>Block C</Text> </Text>}
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

   
    const valiadte = () => {
        if (loan === null) {
            showMessage({
                message: "Please Specify Need For Loan",
                description: "Please Specify Need For Loan!",
                type: "danger",
            });
        }
        else if (loan?.label === "Yes" && credFacility === null) {
            showMessage({
                message: "Please Select Credit Facility",
                description: "Please Select Credit Facility!",
                type: "danger",
            });
        }
        else if (loan?.label === "Yes" && selectedLoantype?.length === 0) {
            showMessage({
                message: "Please Select Loan Type",
                description: "Please Select Loan Type!",
                type: "danger",
            });
        }
        else if (loan?.label === "Yes" && loanEnroll === null) {
            showMessage({
                message: "Please Select Place For Loan Enroll",
                description: "Please Select Place For Loan Enroll!",
                type: "danger",
            });
        }
        else if (loan?.label === "Yes" && amount === null) {
            showMessage({
                message: "Please Select Total Borrowings",
                description: "Please Select Total Borrowings!",
                type: "danger",
            });
        }
        else if (loan?.label === "Yes" && repay === null) {
            showMessage({
                message: "Please Select Repayment Mode",
                description: "Please Select Repayment Mode!",
                type: "danger",
            });
        }
        else if (loan?.label === "No" && selectedReason?.length === 0) {
            showMessage({
                message: "Please Select Appropriate Reason",
                description: "Please Select Appropriate Reason!",
                type: "danger",
            });
        }
        else if (overDraft === null) {
            showMessage({
                message: "Please Select OverDraft in PMJDY",
                description: "Please Select OverDraft in PMJDY!",
                type: "danger",
            });
        }
        else if (ReceivedOverDraft === null) {
            showMessage({
                message: "Please Select OverDraft Received",
                description: "Please Select OverDraft Received!",
                type: "danger",
            });
        }
        else if (bank === null) {
            showMessage({
                message: "Please Select Bank Approach",
                description: "Please Select Bank Approach!",
                type: "danger",
            });
        }
        else if (bank === null) {
            showMessage({
                message: "Please Select Bank Approach",
                description: "Please Select Bank Approach!",
                type: "danger",
            });
        }
        else if (refuse === null) {
            showMessage({
                message: "Please Select Refusal Reason",
                description: "Please Select Refusal Reason!",
                type: "danger",
            });
        }
        else if (selectedRefuseReason?.length === 0) {
            showMessage({
                message: "Please Select Refusal Reason Cited",
                description: "Please Select Refusal Reason Cited!",
                type: "danger",
            });
        }
        else if (freeLoan === null) {
            showMessage({
                message: "Please Select Awareness under Free Loans",
                description: "Please Select Awareness under Free Loans!",
                type: "danger",
            });
        }
        else if (freeLoan?.label === 'Yes' && freeLoanReceived === null) {
            showMessage({
                message: "Please Select Loan Received By You",
                description: "Please Select Loan Received By You!",
                type: "danger",
            });
        }
        else if (loanRefuseByYou === null) {
            showMessage({
                message: "Please Select Reason For Loan Refused By You",
                description: "Please Select Reason For Loan Refused By You!",
                type: "danger",
            });
        }
        else if (loanRefuseByYou === null) {
            showMessage({
                message: "Please Select Reason For Loan Refused By You",
                description: "Please Select Reason For Loan Refused By You!",
                type: "danger",
            });
        }
        else if (loanRefuseByYou?.label === "Yes" && selectedFreeLoanRefuseReason?.length === 0) {
            showMessage({
                message: "Please Select Reason",
                description: "Please Select Reason!",
                type: "danger",
            });
        }
        else if (privateLend === null) {
            showMessage({
                message: "Please Select Your Private Borrowings",
                description: "Please Select Your Private Borrowings!",
                type: "danger",
            });
        }
        else if (privateBorrowing === null) {
            showMessage({
                message: "Please Select Your Amount",
                description: "Please Select Your Private Amount!",
                type: "danger",
            });
        }
        else {
            navigation.replace('BlockDSurveyScreen')
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
    const onSelectedLoanType = (selectedItems) => {
        setSelectedLoanType(selectedItems);
    }

    const onSelectedReason = (selectedItems) => {
        setSelectedReason(selectedItems);
    }

    const onSelecteRefusedReason = (selectedItems) => {
        setSelectedRefuseReason(selectedItems);
    }

    const onSelecteFreeLoanRefusedReason = (selectedItems) => {
        setSelectedFreeLoanRefuseReason(selectedItems);
    }

    const SelectedLoanTypeLabels = selectedLoantype.map((selectedId) => {
        const selectedReason = loanType.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const SelectedReasonTypeLabels = selectedReason.map((selectedId) => {
        const selectedReason = loanType.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });
    const SelectedRefuseReasonTypeLabels = selectedRefuseReason.map((selectedId) => {
        const selectedReason = refuseReason.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const SelectedFreeLoanReasonTypeLabels = selectedFreeLoanRefuseReason.map((selectedId) => {
        const selectedReason = freeLoanRefuse.find((reason) => reason.id === selectedId);
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
                        <TouchableOpacity
                            onPress={() => startRecording()}
                            style={{ paddingVertical: 10, paddingHorizontal: 50, backgroundColor: '#000', borderRadius: 5, elevation: 5, }}>
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
            <Text style={{ fontWeight: 'bold', paddingLeft: 20, paddingTop: 10 }}>C. ACCESS and USAGE OF FINANCIAL SERVICES – CREDIT FACILITIES</Text>
            {isLoading === false ?
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold', paddingBottom: 8 }}>19. Credit- Need and Challenges</Text>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>19(a). Do you have any need for loan?</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setLoan(e)}
                                />
                            </View>
                            {loan?.label === 'Yes' ?
                                <>
                                    <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>19(b). If yes, do you have any credit facility/loan from bank/NBFC/NBFC- MFI?</Text>
                                        <RadioButtonRN
                                            data={dataGroup}
                                            selectedBtn={(e) => setCredFacility(e)}
                                        />
                                    </View>

                                    <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>19(c). What type of loan do you have?</Text>


                                        <MultiSelect
                                            hideTags
                                            items={loanType}
                                            uniqueKey="id"
                                            ref={multiSelectRef}
                                            onSelectedItemsChange={(items) =>
                                                onSelectedLoanType(items)
                                            }
                                            selectedItems={selectedLoantype}
                                            selectText="Select Loan type"
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
                                            {SelectedLoanTypeLabels.map((label, index) => (
                                                <View style={{ margin: 5 }}>
                                                    <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>

                                    {/* <View style={{ padding: 10, }} /> */}
                                    <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>19(d). Where did you enrol for the credit (loan) product?</Text>
                                        <Dropdown
                                            style={[styles.dropdown, loanEnrollFocus && { borderColor: 'blue' }]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            // iconStyle={styles.iconStyle}
                                            // data={AccountType}
                                            data={enrollLoan}
                                            // search
                                            maxHeight={300}
                                            labelField="lable"
                                            valueField="id"
                                            placeholder={!loanEnrollFocus ? 'Select Type of account' : loanEnroll}
                                            // searchPlaceholder="Search..."
                                            value={loanEnroll}
                                            onFocus={() => setLoanEnrollFocus(true)}
                                            onBlur={() => setLoanEnrollFocus(false)}
                                            onChange={item => {
                                                console.log(JSON.stringify(item))
                                                setLoanEnroll(item.id);
                                                setLoanEnrollFocus(false);
                                            }}
                                        />
                                    </View>

                                    {/* <View style={{ padding: 10, }} /> */}
                                    <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>19(e). How much is your total borrowing (amount outstanding) from banks/NBFCs/ NBFC-MFI?</Text>
                                        <Dropdown
                                            style={[styles.dropdown, amountFocus && { borderColor: 'blue' }]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            // iconStyle={styles.iconStyle}
                                            // data={AccountType}
                                            data={outstandingAmount}
                                            // search
                                            maxHeight={300}
                                            labelField="lable"
                                            valueField="id"
                                            placeholder={!amountFocus ? 'Select Type of account' : amount}
                                            // searchPlaceholder="Search..."
                                            value={amount}
                                            onFocus={() => setAmountFocus(true)}
                                            onBlur={() => setAmountFocus(false)}
                                            onChange={item => {
                                                console.log(JSON.stringify(item))
                                                setAmount(item.id);
                                                setAmountFocus(false);
                                            }}
                                        />
                                    </View>

                                    <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>19(f). How do you make your repayment of loan?</Text>
                                        <Dropdown
                                            style={[styles.dropdown, repayFocus && { borderColor: 'blue' }]}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            // iconStyle={styles.iconStyle}
                                            // data={AccountType}
                                            data={repayment}
                                            // search
                                            maxHeight={300}
                                            labelField="lable"
                                            valueField="id"
                                            placeholder={!repayFocus ? 'Select Repayment Mode' : repay}
                                            // searchPlaceholder="Search..."
                                            value={repay}
                                            onFocus={() => setRepayFocus(true)}
                                            onBlur={() => setRepayFocus(false)}
                                            onChange={item => {
                                                console.log(JSON.stringify(item))
                                                setRepay(item.id);
                                                setRepayFocus(false);
                                            }}
                                        />
                                    </View>
                                </> :
                                <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>19(g). why don’t you seek a loan from banks/NBFCs/ NBFC-MFIs?</Text>


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
                                </View>
                            }

                        </View>
                        {/* <View style={{ padding: 10, }} /> */}

                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>20. OD Facility in PMJDY</Text>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>20(a). Are you aware of Overdraft facility in PMJDY account?</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setOverDraft(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>20(b). If you have a PM Jan Dhan Account, have you received an overdraft limit?</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setReceivedOverDraft(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>20(c). Have you approached your bank for it?</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setbank(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>20(d). When the bank was approached, have the branch officials refused it?</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setRefuse(e)}
                                />
                            </View>

                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>20(e). If refused, what was the reason cited?</Text>


                                <MultiSelect
                                    hideTags
                                    items={refuseReason}
                                    uniqueKey="id"
                                    ref={multiSelectRef}
                                    onSelectedItemsChange={(items) =>
                                        onSelecteRefusedReason(items)
                                    }
                                    selectedItems={selectedRefuseReason}
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
                                    {SelectedRefuseReasonTypeLabels.map((label, index) => (
                                        <View style={{ margin: 5 }}>
                                            <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>

                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>21. Collateral-free loans under PM Mudra Yojana</Text>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>21(a). Are you aware of Collateral-free loans under PM Mudra Yojana (PMMY)?</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setFreeLoan(e)}
                                />
                            </View>
                            {freeLoan?.label === 'Yes' ? <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>21(b). If yes, have you received a loan under this collateral-free scheme?</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setFreeLoanReceived(e)}
                                />
                            </View> : null}
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>21(c). Have you been refused loan under PMMY?</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setLoanrefuseByYou(e)}
                                />
                            </View>
                            {loanRefuseByYou?.label === "Yes" ?
                                <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>21(d). If yes, what was the reason for refusal.</Text>


                                    <MultiSelect
                                        hideTags
                                        items={freeLoanRefuse}
                                        uniqueKey="id"
                                        ref={multiSelectRef}
                                        onSelectedItemsChange={(items) =>
                                            onSelecteFreeLoanRefusedReason(items)
                                        }
                                        selectedItems={selectedFreeLoanRefuseReason}
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
                                        {SelectedFreeLoanReasonTypeLabels.map((label, index) => (
                                            <View style={{ margin: 5 }}>
                                                <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                                : null}
                        </View>

                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>22. Informal Sources of Credit</Text>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>22(a). Do you have borrowings from private money lenders/ informal sources?</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setPrivateLend(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>22(b). How much is your total borrowing (amount outstanding) from Private Money Lenders/ Informal sources?</Text>
                                <Dropdown
                                    style={[styles.dropdown, privateBorrowingFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    // data={AccountType}
                                    data={outstandingAmount}
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
                        </View>

                        <View style={{ padding: 10, }} />
                        <TouchableOpacity onPress={() => {
                            valiadte();

                        }} style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#000', borderRadius: 10 }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Next Block D</Text>
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

export default BlockCSurveyScreen;