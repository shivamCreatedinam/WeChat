import { Text, View, TouchableOpacity, Image, PermissionsAndroid, BackHandler, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";
import React, { Component } from 'react';

export default class PermissionScreenMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cameraPermission: false,
            locationPermission: false,
            locationBackgroundPermission: false,
            filePermission: false,
            notificationPermission: false,
        }
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackClick);
        this.props.navigation.addListener('focus', () => {
            this.componentDidFocus()
        });
    }

    onBackClick() {
        console.log("You can use the camera");
    }

    componentDidFocus = async () => {
        try {
            const value = await AsyncStorage.getItem('@permissioncheck');
            if (value === 'true') {
                this.props.navigation.replace('SplashScreen');
            }
        } catch (error) {
            console.error('componentDidFocus', JSON.stringify(error))
        }
    };


    requestLocationBackgroundPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
                {
                    title: 'Survey App',
                    message: 'Survey App needs to access your Location',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'Okay',
                },
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission GRANTED');
                this.setState({ locationBackgroundPermission: true });
            } else {
                console.log('Location permission denied');
                this.setState({ locationBackgroundPermission: false });
            }
        } catch (error) {
            console.error('Error in location permission:', error);
        }
    };

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Survey App',
                    message: 'Survey App needs to access your Location',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'Okay',
                },
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission GRANTED');
                this.setState({ locationPermission: true });
            } else {
                console.log('Location permission denied');
                this.setState({ locationPermission: false });
            }
        } catch (error) {
            console.error('Error in location permission:', error);
        }
    };

    async CameraPermission(params) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
                this.setState({ cameraPermission: true });
            } else {
                console.log("Camera permission denied")
                this.setState({ cameraPermission: false });
            }
        } catch (err) {
            console.warn(err)
        }
    }

    async FilePermission(params) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the file")
                this.setState({ filePermission: true });
            } else {
                console.log("file permission denied")
                this.setState({ filePermission: false });
            }
        } catch (err) {
            console.warn(err)
        }
    }

    // async PushNotification() {
    //     try {
    //         await notifee.requestPermission();
    //         console.log('Notification permissions granted');
    //         this.setState({ notificationPermission: true });
    //     } catch (error) {
    //         console.log('POST_NOTIFICATIONS permission denied', error);
    //         this.setState({ notificationPermission: false });
    //     }
    // }

    async micPermission() {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Permissions for record audio',
                        message: 'Give permission to your device to record audio',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('permission granted');
                    this.setState({ notificationPermission: true });
                } else {
                    console.log('permission denied');
                    this.setState({ notificationPermission: false });
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
    }

    async checkAllPermission() {
        if (this.state.cameraPermission === true && this.state.locationPermission === true && this.state.notificationPermission === true) {
            AsyncStorage.setItem('@permissioncheck', 'true');
            this.props.navigation.replace('SigninScreen');
            console.warn('saved')
        } else {
            showMessage({
                message: 'Required Permissions!',
                description: 'Please Accept All The Permission!',
                type: "danger",
            });
        }
    }

    render() {
        return (
            <View style={{ padding: 30, backgroundColor: '#FFFFFF', flex: 1, }}>
                <Text style={{ color: '#000', marginTop: 50, fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>App Permission</Text>
                <View style={{ flex: 1 }}>
                    <View style={{ marginBottom: 20 }}>
                        <Image style={{ height: 250, width: 250, resizeMode: 'contain', alignSelf: 'center' }} source={require('../../../res/images/appLogo/app_logo_main.png')} />
                    </View>
                    <TouchableOpacity onPress={() => this.requestLocationPermission()} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                        <Text style={{ fontSize: 14, color: '#000', flex: 1 }}>Location Permission</Text>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain', alignSelf: 'center', tintColor: this.state.locationPermission === true ? null : 'red' }} source={require('../../../res/images/appLogo/circle_green.png')} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => this.requestLocationBackgroundPermission()} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                        <Text style={{ fontSize: 14, color: '#fff', flex: 1 }}>Location Background Permission</Text>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain', alignSelf: 'center', tintColor: this.state.locationBackgroundPermission === true ? null : 'red' }} source={require('../../assets/circle_green.png')} />
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => this.CameraPermission()} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                        <Text style={{ fontSize: 14, color: '#000', flex: 1 }}>Camera Permission {this.state.cameraPermission}</Text>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain', alignSelf: 'center', tintColor: this.state.cameraPermission === true ? null : 'red' }} source={require('../../../res/images/appLogo/circle_green.png')} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => this.FilePermission()} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                        <Text style={{ fontSize: 14, color: '#fff', flex: 1 }}>File Permission</Text>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain', alignSelf: 'center', tintColor: this.state.filePermission === true ? null : 'red' }} source={require('../../assets/circle_green.png')} />
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => this.micPermission()} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                        <Text style={{ fontSize: 14, color: '#000', flex: 1 }}>Mic Permission</Text>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain', alignSelf: 'center', tintColor: this.state.notificationPermission === true ? null : 'red' }} source={require('../../../res/images/appLogo/circle_green.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.checkAllPermission()} style={{ paddingHorizontal: 20, paddingVertical: 15, elevation: 5, borderRadius: 10, backgroundColor: '#000' }}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>Continue </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}