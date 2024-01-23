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
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import Modal from 'react-native-modal';
import Axios from 'axios';
import { Children } from 'react';
// import fs from 'fs';

const BlockBSurveyScreen = () => {

    const OsVer = Platform.constants['Release'];
    const navigation = useNavigation();
    const [name, setName] = React.useState('');
    const [gender, setGender] = React.useState('');
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
    const [bank, setBank] = React.useState(null);
    const [age, setAgeNumber] = React.useState(0);
    const [adult, setAdults] = React.useState(0);
    const [children, setChildren] = React.useState(0);
    const [selectedEducation, setSelectedEducation] = React.useState([]);
    const [selectedOccupations, setSelectedOccupations] = React.useState([]);
    const [selectedIncomes, setSelectedIncomes] = React.useState([]);
    const [selectCashReceipt, setSelectCashReceipt] = React.useState([]);
    const [SelectedSaveMoney, setSelectSaveMoney] = React.useState([]);
    const [differentlyAble, setDifferently] = React.useState('');
    const [smartPhone, setSmartphone] = React.useState('');
    const [anyGroup, setAnyGroup] = React.useState('');

    // blockB    
    const [isAccountTypeFocus, setAccountTypeFocus] = React.useState(false);
    const [AccountTypeValue, setAccountTypeValue] = React.useState(null);
    const [transaction, sTransaction] = React.useState(null);
    const [istransactionFocus, setIsTransactionFocus] = React.useState(false);
    const [subsidy, setSubsidy] = React.useState(null);
    const [subsidyFocus, setSubsidyFocus] = React.useState(false);
    const multiSelectRef = useRef(null);



    // anyGroup

    const Nodata = [
        { id: 1, lable: 'No nearby bank branch or BC' },
        { id: 2, lable: 'Bank timings are not suitable' },
        { id: 3, lable: 'Don’t have documents' },
        { id: 4, lable: 'Don’t know the process' },
    ]

    // multi select 
    const [selectedDigitalpreferred, setSelectedDigitalpreferred] = React.useState([]);

    const onSelectedDigitalpreferredChange = (selectedItems) => {
        setSelectedDigitalpreferred(selectedItems);
    }

    const SelectedDigitalpreferredLabels = selectedDigitalpreferred.map((selectedId) => {
        const selectedReason = Nodata.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const lackdocumentsdata = [
        { id: 1, lable: 'Lack of ID proof' },
        { id: 2, lable: 'Lack of Address Proof' },
        { id: 3, lable: 'Both' },
        { id: 4, lable: 'Any other' },
    ]

    // multi select 
    const [selectedlackdocuments, setSelectedlackdocuments] = React.useState([]);

    const onSelectedlackdocumentsChange = (selectedItems) => {
        setSelectedlackdocuments(selectedItems);
    }

    const SelectedlackdocumentsLabels = selectedlackdocuments.map((selectedId) => {
        const selectedReason = lackdocumentsdata.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const bankAccountsdata = [
        { id: 1, lable: 'No source of deposit to bank account' },
        { id: 2, lable: 'Prefer Cash' },
        { id: 3, lable: 'No knowledge' },
        { id: 4, lable: 'No trust – happy to keep money with myself' },
        { id: 5, lable: 'Fee and Charges' },
        { id: 6, lable: 'Family Members have an account' },
        { id: 7, lable: 'My acquaintances have had bad experience with bank account' },
    ]

    // multi select 
    const [selectedbankAccounts, setSelectedbankAccounts] = React.useState([]);

    const onSelectedbankAccountsChange = (selectedItems) => {
        setSelectedbankAccounts(selectedItems);
    }

    const SelectedbankAccountsLabels = selectedbankAccounts.map((selectedId) => {
        const selectedReason = bankAccountsdata.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const [DepositInsurance, setSetDepositInsurance] = React.useState([]);
    const [ZeroBalance, setZeroBalance] = React.useState([]);
    const [DirectBenefit, setDirectBenefit] = React.useState([]);
    const [visitBranch, setVisitBranch] = React.useState('');
    const [EnvironmentBranch, setEnvironmentBranch] = React.useState('');
    const [EnvironmentOutlet, setEnvironmentOutlet] = React.useState('');
    const [SupportiveBranch, setSupportiveBranch] = React.useState('');
    const [SupportiveOutlet, setSupportiveOutlet] = React.useState('');
    const [AmenitiesBranch, setAmenitiesBranch] = React.useState('');
    const [AmenitiesOutlet, setAmenitiesOutlet] = React.useState('');
    const [LongBranch, setLongBranch] = React.useState('');
    const [LongOutlet, setLongOutlet] = React.useState('');
    const [WithoutVisiting, setWithoutVisiting] = React.useState('');
    const [AccountOpened, setAccountOpened] = React.useState('');
    const [AccountNumber, setAccountNumber] = React.useState('');

    const whatPurposesdata = [
        { id: 1, lable: 'Receive Salary/ Money' },
        { id: 2, lable: 'Pay Money/ Make Purchases' },
        { id: 3, lable: 'Save / Invest Money' },
        { id: 4, lable: 'For Business' },
        { id: 5, lable: 'Transfer/Remittance' },
        { id: 6, lable: 'Do not use' },
    ]

    // multi select 
    const [selectedwhatPurposes, setSelectedwhatPurposes] = React.useState([]);

    const onSelectedwhatPurposesChange = (selectedItems) => {
        setSelectedwhatPurposes(selectedItems);
    }

    const SelectedwhatPurposesLabels = selectedwhatPurposes.map((selectedId) => {
        const selectedReason = whatPurposesdata.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const AccountType = [
        { id: 1, lable: 'Savings Account' },
        { id: 2, lable: 'PMJDY Account' },
        { id: 3, lable: 'Current Account' },
        { id: 4, lable: 'FD/RD Account Credit (Loan) Account' }
    ];

    const frequentlyBank = [
        { id: 1, lable: 'At least once in a month.' },
        { id: 2, lable: 'At least once in 3 months' },
        { id: 3, lable: 'At least once in a half year' },
        { id: 4, lable: 'At least once in a year' },
        { id: 5, lable: 'Not used in a year' },
        { id: 6, lable: 'Not used for more than a year' },
        { id: 7, lable: 'Not used for more than two years' }
    ];

    const reasons = [
        { id: 1, lable: 'No source of deposit to bank account.' },
        { id: 2, lable: 'Receive and pay only in cash.' },
        { id: 3, lable: 'Fee and Charges.' },
        { id: 4, lable: 'Family Members have an account.' },
        { id: 5, lable: 'Have more than one account.' },

    ];

    const mostTransact = [
        { id: 1, lable: 'Branch.' },
        { id: 2, lable: 'ATM.' },
        { id: 3, lable: 'BC Outlet.' },
        { id: 4, lable: 'Digital.' },

    ];

    const subsidyTimes = [
        { id: 1, lable: 'Up to 4 times' },
        { id: 2, lable: '4 to 8 times' },
        { id: 3, lable: '9 to 12 times' },
        { id: 4, lable: 'More than 12 times' },

    ];

    const Incomedata = [
        { id: 1, lable: 'Cash' },
        { id: 2, lable: 'Direct Credit to Bank Account ' },
        { id: 3, lable: 'QR-Based/Inward UPI' },
        { id: 4, lable: 'Debit Card Swipe' },
        { id: 5, lable: 'Credit Card Swipe' },
    ];

    const cashReceipt = [
        { id: 1, lable: 'Easy' },
        { id: 2, lable: 'No Cost involved' },
        { id: 3, lable: 'QR-Based/Inward UPI' },
        { id: 4, lable: 'Pay only in Cash' },
        { id: 5, lable: 'Any other reason' },
    ];

    const saveMoney = [
        { id: 1, lable: 'Bank Account' },
        { id: 2, lable: 'NBFC' },
        { id: 3, lable: 'Chit Fund' },
        { id: 4, lable: 'Monthly Kitty' },
        { id: 5, lable: 'Daily Deposit in Credit Society' },
        { id: 6, lable: 'Mutual Fund' },
        { id: 7, lable: 'With Relatives' },
        { id: 8, lable: 'Any other' },
        { id: 9, lable: 'Not able to save' },
        { id: 10, lable: 'Do not wish to save' },
    ];

    // gender setDifferently
    const data = [
        {
            label: 'Yes'
        },
        {
            label: 'No'
        }
    ];

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
                    {user.active && <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold' }}>Active Survey Token - <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'red' }}>Block B</Text> </Text>}
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
        // const audioFile = await AudioRecord.stop();
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

        const response = [
            {
                'section_no': "B",
                'q_no': "1",
                'q_type': "SELF",
                'sub_q_no': "",
                'sub_q_title': "",
                'sub_q_type': "",
                'account_no': '',
                'response': `${bank?.label}`
            },
            {
                'section_no': "B",
                'q_no': "2",
                'q_type': "CHILD",
                'sub_q_no': "a",
                'sub_q_title': "In case you are not able to open a bank account, please, indicate the reason(s)",
                'sub_q_type': "MULTICHECK",
                'account_no': '',
                'response': `${selectedDigitalpreferred}`
            },
            {
                'section_no': "B",
                'q_no': "2",
                'q_type': "CHILD",
                'sub_q_no': "b",
                'sub_q_title': "If it is due to a lack of documents, what is it?",
                'sub_q_type': "MULTICHECK",
                'account_no': '',
                'response': `${selectedDigitalpreferred}`
            },
            {
                'section_no': "B",
                'q_no': "2",
                'q_type': "CHILD",
                'sub_q_no': "c",
                'sub_q_title': "If you don’t want a bank account, what could be the reasons?",
                'sub_q_type': "MULTICHECK",
                'account_no': '',
                'response': `${selectedDigitalpreferred}`
            },
            {
                'section_no': "B",
                'q_no': "3",
                'q_type': "SELF",
                'sub_q_no': "",
                'sub_q_title': "",
                'sub_q_type': "",
                'account_no': '',
                'response': `${DepositInsurance?.label}`
            },
            {
                'section_no': "B",
                'q_no': "4",
                'q_type': "SELF",
                'sub_q_no': "",
                'sub_q_title': "",
                'sub_q_type': "",
                'account_no': '',
                'response': `${ZeroBalance?.label}`
            },
            {
                'section_no': "B",
                'q_no': "5",
                'q_type': "SELF",
                'sub_q_no': "",
                'sub_q_title': "",
                'sub_q_type': "",
                'account_no': '',
                'response': `${DirectBenefit?.label}`
            }, {
                'section_no': "B",
                'q_no': "6",
                'q_type': "SELF",
                'sub_q_no': "",
                'sub_q_title': "",
                'sub_q_type': "",
                'account_no': '',
                'response': `${visitBranch?.label}`
            }, {
                'section_no': "B",
                'q_no': "7",
                'q_type': "CHILD",
                'sub_q_no': "a",
                'sub_q_title': "Helpful and Easy-to-Understand Processes",
                'sub_q_type': "SINGLECHECK",
                'account_no': '',
                'response2': `${EnvironmentOutlet?.label}`,
                'response': `${EnvironmentBranch?.label}`
            }, {
                'section_no': "B",
                'q_no': "7",
                'q_type': "CHILD",
                'sub_q_no': "b",
                'sub_q_title': "Supportive and Welcome Attitude of Staff",
                'sub_q_type': "SINGLECHECK",
                'account_no': '',
                'response2': `${SupportiveOutlet?.label}`,
                'response': `${SupportiveBranch?.label}`
            }, {
                'section_no': "B",
                'q_no': "7",
                'q_type': "CHILD",
                'sub_q_no': "c",
                'sub_q_title': "Basic Amenities (seating/water/ washroom/ information)",
                'sub_q_type': "SINGLECHECK",
                'account_no': '',
                'response2': `${AmenitiesOutlet?.label}`,
                'response': `${AmenitiesBranch?.label}`
            }, {
                'section_no': "B",
                'q_no': "7",
                'q_type': "CHILD",
                'sub_q_no': "d",
                'sub_q_title': "Long Wait Time (more than one hour)/ Long Queues",
                'sub_q_type': "SINGLECHECK",
                'account_no': '',
                'response2': `${LongOutlet?.label}`,
                'response': `${LongBranch?.label}`
            }, {
                'section_no': "B",
                'q_no': "7",
                'q_type': "CHILD",
                'sub_q_no': "d",
                'sub_q_title': "Long Wait Time (more than one hour)/ Long Queues",
                'sub_q_type': "SINGLECHECK",
                'account_no': '',
                'response2': `${LongOutlet?.label}`,
                'response': `${LongBranch?.label}`
            }, {
                'section_no': "B",
                'q_no': "8",
                'q_type': "SELF",
                'sub_q_no': "",
                'sub_q_title': "",
                'sub_q_type': "",
                'account_no': '',
                'response': `${WithoutVisiting?.label}`
            }, {
                'section_no': "B",
                'q_no': "9",
                'q_type': "SELF",
                'sub_q_no': "",
                'sub_q_title': "",
                'sub_q_type': "",
                'account_no': '',
                'response': `${AccountOpened?.label}`
            }, {
                'section_no': "B",
                'q_no': "10",
                'q_type': "SELF",
                'sub_q_no': "",
                'sub_q_title': "",
                'sub_q_type': "",
                'account_no': `${AccountNumber}`,
                'response': `${AccountTypeValue}`
            }, {
                'section_no': "B",
                'q_no': "11",
                'q_type': "SELF",
                'sub_q_no': "",
                'sub_q_title': "",
                'sub_q_type': "",
                'account_no': '',
                'response': `${selectedwhatPurposes}`
            }, {
                'section_no': "B",
                'q_no': "12",
                'q_type': "SELF",
                'sub_q_no': "",
                'sub_q_title': "",
                'sub_q_type': "",
                'account_no': '',
                'response': `${AccountTypeValue}`
            },{
                'section_no': "B",
                'q_no': "13",
                'q_type': "SELF",
                'sub_q_no': "",
                'sub_q_title': "",
                'sub_q_type': "",
                'account_no': '',
                'response': `${selectedOccupations}`
            },{
                'section_no': "B",
                'q_no': "14",
                'q_type': "SELF",
                'sub_q_no': "",
                'sub_q_title': "",
                'sub_q_type': "",
                'account_no': '',
                'response': `${transaction}`
            },{
                'section_no': "B",
                'q_no': "15",
                'q_type': "SELF",
                'sub_q_no': "",
                'sub_q_title': "",
                'sub_q_type': "",
                'account_no': '',
                'response': `${subsidy}`
            },
        ];
        
        const FormData = require('form-data');
        let data = new FormData();
        data.append('data', response);
        data.append('survey_token', name);
        data.append('latitude', '27.98878');
        data.append('longitude', '28.00000');
        data.append("audio_file", file_urls, "recording_block_a.wav");

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

    const selectedLabels = selectedOccupations.map((selectedId) => {
        const selectedReason = reasons.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const selectedIncomeLabels = selectedIncomes.map((selectedId) => {
        const selectedReason = reasons.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const selectedCashReceiptLabels = selectCashReceipt.map((selectedId) => {
        const selectedReason = reasons.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const selectedSaveMoneyLabels = SelectedSaveMoney.map((selectedId) => {
        const selectedReason = reasons.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const onSelectedOccupationsChange = (selectedItems) => {
        setSelectedOccupations(selectedItems);
    }

    const onSelectedCashReceipt = (selectedItems) => {
        setSelectCashReceipt(selectedItems);
    }

    const onSelectedSaveMoney = (selectedItems) => {
        setSelectSaveMoney(selectedItems);
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
            <Text style={{ fontWeight: 'bold', paddingLeft: 20, paddingTop: 10 }}>B. ACCESS and USAGE OF FINANCIAL SERVICES – BANK ACCOUNT {gender?.label}</Text>
            {isLoading === false ?
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>1. Do you have a bank account? </Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setBank(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        {bank?.label === 'No' ?
                            <View style={{ flex: 1 }}>
                                <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>2 (a). In case you are not able to open a bank account, please, indicate the reason(s)</Text>
                                    <MultiSelect
                                        hideTags
                                        items={Nodata}
                                        uniqueKey="id"
                                        ref={multiSelectRef}
                                        onSelectedItemsChange={(items) =>
                                            onSelectedDigitalpreferredChange(items)
                                        }
                                        selectedItems={selectedDigitalpreferred}
                                        selectText="Select open a bank account"
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
                                        {SelectedDigitalpreferredLabels.map((label, index) => (
                                            <View style={{ margin: 5 }}>
                                                <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                                <View style={{ padding: 10, }} />
                                <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>2 (b). If it is due to a lack of documents, what is it?</Text>
                                    <MultiSelect
                                        hideTags
                                        items={lackdocumentsdata}
                                        uniqueKey="id"
                                        ref={multiSelectRef}
                                        onSelectedItemsChange={(items) =>
                                            onSelectedlackdocumentsChange(items)
                                        }
                                        selectedItems={selectedlackdocuments}
                                        selectText="Select lack of documents"
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
                                        {SelectedlackdocumentsLabels.map((label, index) => (
                                            <View style={{ margin: 5 }}>
                                                <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                                <View style={{ padding: 10, }} />
                                <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>2 (C). If you don’t want a bank account, what could be the reasons?</Text>
                                    <MultiSelect
                                        hideTags
                                        items={bankAccountsdata}
                                        uniqueKey="id"
                                        ref={multiSelectRef}
                                        onSelectedItemsChange={(items) =>
                                            onSelectedbankAccountsChange(items)
                                        }
                                        selectedItems={selectedbankAccounts}
                                        selectText="Select bank account reasons"
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
                                        {SelectedbankAccountsLabels.map((label, index) => (
                                            <View style={{ margin: 5 }}>
                                                <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                            :
                            <View />
                        }
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>3. Do you know about deposit insurance up to Rs 5 lakh?</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setSetDepositInsurance(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>4. Do you know that a zero-balance bank account can be opened (PM Jan-Dhan Account or BSBDA) without any charges?</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setZeroBalance(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>5. Do you know that subsidies/benefits (Direct Benefit Transfer) under different Government schemes can be received by respective eligible beneficiaries in their Jan-Dhan accounts?</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setDirectBenefit(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>6. Have you ever visited a bank branch or BC outlet to open a savings bank account</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setVisitBranch(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        {visitBranch?.label === 'Yes' ?
                            <View style={{ flex: 1 }}>
                                <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                    <Text>7. How do you find the environment in the branch/ BC Outlet?</Text>
                                    <View style={{ padding: 10, }} />
                                    <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>7 (a). Helpful and Easy-to-Understand Processes</Text>
                                        <Text>Branch</Text>
                                        <RadioButtonRN
                                            data={data}
                                            selectedBtn={(e) => setEnvironmentBranch(e)}
                                        />
                                        <View style={{ padding: 10, }} />
                                        <Text>BC Outlet</Text>
                                        <RadioButtonRN
                                            data={data}
                                            selectedBtn={(e) => setEnvironmentOutlet(e)}
                                        />
                                    </View>
                                    <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>7 (b). Supportive and Welcome Attitude of Staff</Text>
                                        <Text>Branch</Text>
                                        <RadioButtonRN
                                            data={data}
                                            selectedBtn={(e) => setSupportiveBranch(e)}
                                        />
                                        <View style={{ padding: 10, }} />
                                        <Text>BC Outlet</Text>
                                        <RadioButtonRN
                                            data={data}
                                            selectedBtn={(e) => setSupportiveOutlet(e)}
                                        />
                                    </View>
                                    <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>7 (c). Basic Amenities (seating/water/ washroom/ information)</Text>
                                        <Text>Branch</Text>
                                        <RadioButtonRN
                                            data={data}
                                            selectedBtn={(e) => setAmenitiesBranch(e)}
                                        />
                                        <View style={{ padding: 10, }} />
                                        <Text>BC Outlet</Text>
                                        <RadioButtonRN
                                            data={data}
                                            selectedBtn={(e) => setAmenitiesOutlet(e)}
                                        />
                                    </View>
                                    <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>7 (d). Long Wait Time (more than one hour)/ Long Queues</Text>
                                        <Text>Branch</Text>
                                        <RadioButtonRN
                                            data={data}
                                            selectedBtn={(e) => setLongBranch(e)}
                                        />
                                        <View style={{ padding: 10, }} />
                                        <Text>BC Outlet</Text>
                                        <RadioButtonRN
                                            data={data}
                                            selectedBtn={(e) => setLongOutlet(e)}
                                        />
                                    </View>
                                </View>
                            </View> :
                            <View />}
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>8. Do you know that a bank account can be opened without visiting a branch or BC Outlet?</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setWithoutVisiting(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>9. Have you opened an account without visiting a branch or BC through online channel?</Text>
                            <View>
                                <RadioButtonRN
                                    data={data}
                                    selectedBtn={(e) => setAccountOpened(e)}
                                />
                            </View>
                            <View style={{ padding: 10, }} />
                            <View>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>10. How many bank accounts do you have?</Text>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Type of account</Text>
                                <Dropdown
                                    style={[styles.dropdown, isAccountTypeFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={AccountType}
                                    // search
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!isAccountTypeFocus ? 'Select Type of account' : AccountTypeValue}
                                    // searchPlaceholder="Search..."
                                    value={AccountTypeValue}
                                    onFocus={() => setAccountTypeFocus(true)}
                                    onBlur={() => setAccountTypeFocus(false)}
                                    onChange={item => {
                                        console.log(JSON.stringify(item))
                                        setAccountTypeValue(item.id);
                                        setAccountTypeFocus(false);
                                    }}
                                />
                                <View style={{ padding: 10, }} />
                                {AccountTypeValue !== null ? <TextInput onChangeText={(e) => setAccountNumber(e)} maxLength={2} style={{ backgroundColor: '#fff', paddingLeft: 15, elevation: 5, borderRadius: 5 }} keyboardType={'number-pad'} placeholder='Numbers' /> : null}
                            </View>
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>11. For what purpose, do you use the bank account.</Text>
                            <View>
                                <MultiSelect
                                    hideTags
                                    items={whatPurposesdata}
                                    uniqueKey="id"
                                    ref={multiSelectRef}
                                    onSelectedItemsChange={(items) =>
                                        onSelectedwhatPurposesChange(items)
                                    }
                                    hideSubmitButton={true}
                                    selectedItems={selectedwhatPurposes}
                                    selectText="Select open a bank account"
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
                                    {SelectedwhatPurposesLabels.map((label, index) => (
                                        <View style={{ margin: 5 }}>
                                            <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>12. How frequently you use bank account?</Text>
                            <Dropdown
                                style={[styles.dropdown, isAccountTypeFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                // iconStyle={styles.iconStyle}
                                // data={AccountType}
                                data={frequentlyBank}
                                // search
                                maxHeight={300}
                                labelField="lable"
                                valueField="id"
                                placeholder={!isAccountTypeFocus ? 'Select Type of account' : AccountTypeValue}
                                // searchPlaceholder="Search..."
                                value={AccountTypeValue}
                                onFocus={() => setAccountTypeFocus(true)}
                                onBlur={() => setAccountTypeFocus(false)}
                                onChange={item => {
                                    console.log(JSON.stringify(item))
                                    setAccountTypeValue(item.id);
                                    setAccountTypeFocus(false);
                                }}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>13. If you are not using your bank account, please indicate reasons?</Text>
                            <MultiSelect
                                hideTags
                                items={reasons}
                                uniqueKey="id"
                                ref={multiSelectRef}
                                onSelectedItemsChange={(items) =>
                                    onSelectedOccupationsChange(items)
                                }
                                selectedItems={selectedOccupations}
                                selectText="Select Reasons"
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
                            <View>
                                {selectedLabels.map((label, index) => (
                                    <View style={{ padding: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>14. How do you mostly transact (receive and pay money) in your bank account?</Text>
                            <Dropdown
                                style={[styles.dropdown, istransactionFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                // iconStyle={styles.iconStyle}
                                // data={AccountType}
                                data={mostTransact}
                                // search
                                maxHeight={300}
                                labelField="lable"
                                valueField="id"
                                placeholder={!istransactionFocus ? 'Select Type of account' : transaction}
                                // searchPlaceholder="Search..."
                                value={transaction}
                                onFocus={() => setIsTransactionFocus(true)}
                                onBlur={() => setIsTransactionFocus(false)}
                                onChange={item => {
                                    console.log(JSON.stringify(item))
                                    sTransaction(item.id);
                                    setIsTransactionFocus(false);
                                }}
                            />
                        </View>

                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>15. If you receive a subsidy/govt benefit in your account, how many times do you get it in a year?</Text>
                            <Dropdown
                                style={[styles.dropdown, subsidyFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                // iconStyle={styles.iconStyle}
                                // data={AccountType}
                                data={subsidyTimes}
                                // search
                                maxHeight={300}
                                labelField="lable"
                                valueField="id"
                                placeholder={!subsidyFocus ? 'Select Type of account' : subsidy}
                                // searchPlaceholder="Search..."
                                value={subsidy}
                                onFocus={() => setSubsidyFocus(true)}
                                onBlur={() => setSubsidyFocus(false)}
                                onChange={item => {
                                    console.log(JSON.stringify(item))
                                    setSubsidy(item.id);
                                    setSubsidyFocus(false);
                                }}
                            />
                        </View>

                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>16. If you are not using your bank account, please indicate reasons?</Text>


                            <MultiSelect
                                hideTags
                                items={Incomedata}
                                uniqueKey="id"
                                ref={multiSelectRef}
                                onSelectedItemsChange={(items) =>
                                    onSelectedIncomesChange(items)
                                }
                                selectedItems={selectedIncomes}
                                selectText="Select Income Stream"
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
                            <View>
                                {selectedIncomeLabels.map((label, index) => (
                                    <View style={{ padding: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>17. In case you prefer cash receipts, please indicate the reason?</Text>


                            <MultiSelect
                                hideTags
                                items={cashReceipt}
                                uniqueKey="id"
                                ref={multiSelectRef}
                                onSelectedItemsChange={(items) =>
                                    onSelectedCashReceipt(items)
                                }
                                selectedItems={selectCashReceipt}
                                selectText="Select reason"
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
                            <View>
                                {selectedCashReceiptLabels.map((label, index) => (
                                    <View style={{ padding: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>18. How do you save money?</Text>


                            <MultiSelect
                                hideTags
                                items={saveMoney}
                                uniqueKey="id"
                                ref={multiSelectRef}
                                onSelectedItemsChange={(items) =>
                                    onSelectedSaveMoney(items)
                                }
                                selectedItems={SelectedSaveMoney}
                                selectText="Select reason"
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
                            <View>
                                {selectedSaveMoneyLabels.map((label, index) => (
                                    <View style={{ padding: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>11. Do you own a smartphone ?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setSmartphone(e)}
                            />
                        </View> */}
                        <View style={{ padding: 10, }} />
                        <TouchableOpacity onPress={() => navigation.replace('BlockCSurveyScreen')} style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#000', borderRadius: 10 }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Next Block C</Text>
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

export default BlockBSurveyScreen;