import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  FlatList,
  PermissionsAndroid,
  Alert,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialInput from '../../genriccomponents/input/MaterialInput';
import styles from './styles';
import Button from '../../genriccomponents/button/Button';
import resource from '../../../res';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import RNOtpVerify from 'react-native-otp-verify';

import {
  validateMobileNumber,
  renderInputError,
  myWidth,
  logOnConsole,
  HandleAppsFlyer,
  getCodeFromText,
  isPlatformIOS,
} from '../../utility/Utils';
import { setUserId } from '@amplitude/analytics-react-native';
import { connect } from 'react-redux';
import APILoadingHOC from '../../genriccomponents/HOCS/APILoadingHOC';
import * as actions from '../../redux/actions/SigninAction';
import {
  hitSocialLoginApi,
  hitLinkedinApiToGetUser,
  hitDirectSocialLoginApi,
  hitFacebookApiToGetUser,
} from '../../redux/actions/SocialLoginAction';
import AppUser from '../../utility/AppUser';
import AsyncStorageContaints from '../../utility/AsyncStorageConstants';
import { hitSendOtpApi } from '../../redux/actions/OtpAction';
import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { MyStatusBar } from '../../genriccomponents/header/HeaderAndStatusBar';
import { updateFcmTokenToServer } from '../../redux/actions/LogoutAction';
import { onUpdateCartBadgeCount } from '../../redux/actions/CartAction';
import { onUpdateWishlistBadgeCount } from '../../redux/actions/WishListAction';
import AppToast from '../../genriccomponents/appToast/AppToast';
import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';
import DeviceInfo from 'react-native-device-info';
import { BASE_URL } from '../../apimanager/ApiEndpoint';
import WhatsAppLoginButton from '../../genriccomponents/WhatsappLoginButton/WhatsAppLoginButton';
import strings from '../../../res/constants/strings';
import { DoneReceiveOtpModal } from './DontReceiveOtpModal';
import resources from '../../../res';
import fonts from '../../../res/constants/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../res/colors';
import appsFlyer from 'react-native-appsflyer';
import { track } from '@amplitude/analytics-react-native';
import {
  amplitude_events,
  amplitude_property,
} from '../../utility/AfAndAmplitudeEvents';

import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import { hitGetAllCitiesApi } from '../../redux/actions/SelectCityAction';
import { useDispatch, useSelector } from 'react-redux';
import { storeAdminArea } from '../../redux/actions/cityNameAction';
import { TextInput } from 'react-native-gesture-handler';


const SigninScreen = props => {
  const navigation = useNavigation();
  const [emailOrMobile, set_emailOrMobile] = useState('');
  const [fromOtpless, set_fromOtpless] = useState(false);
  const [isOtpLess, setIsOtpLess] = useState(false);
  const [updateEmail, set_updateEmail] = useState('');
  const [countDown, set_countDown] = useState(30);
  const [otp, set_otp] = useState('');
  const [isMobileLogin, set_isMobileLogin] = useState(false);
  const [isOtpInputFIeldVisible, set_isOtpInputFIeldVisible] = useState(false);
  const [isGetOtpTextVisible, set_isGetOtpTextVisible] = useState(true);
  const [error, set_error] = useState({});
  const [isOtpSent, set_isOtpSent] = useState(false);
  const [emailFieldVisible, set_emailFieldVisible] = useState(false);
  const [isTimeVisible, set_isTimeVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isEmailView, setIsEmailView] = useState(false);
  const [isRefferalCodeScreen, setIsRefferalCodeScreen] = useState(false);
  const [saveResultData, setSaveResultData] = useState(null);
  const [emailList, setEmailList] = useState([]);
  const emailRef = useRef();
  const passwordRef = useRef();
  const intervalRef = useRef(null);
  const [skipCity, setSkipCity] = useState(false);
  const [cityName, setCityName] = useState(null);
  const [permissionAttempts, setPermissionAttempts] = useState(0);
  const dispatch = useDispatch();
  const [showPermissionRequest, setShowPermissionRequest] = useState(true);


  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'CityFurnish App',
          message: 'CityFurnish App needs to access your Location',
          buttonNegative: 'Cancel',
          buttonPositive: 'Okay',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            console.log('position coords', position.coords);
            const { latitude, longitude } = position.coords;
            console.log('lat and long', latitude, longitude);
            getGeoLocation(latitude, longitude);
            setShowPermissionRequest(false);
          },
          error => {
            console.log('Error getting location:', error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
        setSkipCity(false);

      } else {
        setShowPermissionRequest(true);
        console.log('Location permission denied');

      }
    } catch (error) {
      console.error('Error in location permission:', error);
    }
  };



  const adminArea = useSelector(state => state?.cityNameAction?.storeAdminArea);
  console.log(adminArea);

  useEffect(() => {
    dispatch(storeAdminArea(cityName));
  }, []);

  const getGeoLocation = (latitude, longitude) => {
    const location = {
      lat: latitude,
      lng: longitude,
    };

    Geocoder.geocodePosition(location)
      .then(result => {
        // console.log('Geocoding Result:', result);
        if (result.length > 0) {
          if (result.length > 0) {
            const adminArea = result[0].adminArea;
            console.log('Admin Area:', adminArea);

            const cityId = getCityIdByAdminArea(adminArea);
            console.log('cityId:', cityId);
            // Use the cityId as needed
          } else {
            console.warn('No address found for the given coordinates.');
          }
        } else {
          console.warn('No address found for the given coordinates.');
        }
      })
      .catch(error => console.warn('Geocoding Error:', error));
  };

  const getCityIdByAdminArea = adminArea => {
    try {
      props
        .hitGetAllCitiesApi()
        .then(async data => {
          console.log('data', data);
          await AsyncStorage.setItem('CityList', JSON.stringify(data.data));
          const matchingCity = data?.data.find(
            city => city.list_value.toLowerCase() === adminArea.toLowerCase(),
          );
          // console.log("matchingCity", matchingCity)
          if (matchingCity) {
            const cityFilter = matchingCity.list_value;
            const CityId = matchingCity?.id;
            console.log(`City ID  ${CityId} for ${adminArea}: ${cityFilter}`);
            AsyncStorage.setItem('@location', adminArea);
            // setCityName(adminArea);
            setCityName(adminArea);
            dispatch(storeAdminArea(cityName));
            return adminArea;
          } else {
            console.warn(`City ID not found for ${adminArea}`);
            return null;
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    } catch (error) {
      console.log('Error loading city data:', error);
    }
  };

  useEffect(() => {
    const linkingEvent = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({ url });
      }
    });
    return () => null;
  }, [handleDeepLink]);

  // using methods
  useEffect(() => {
    if (!isPlatformIOS) {
      RNOtpVerify.getOtp()
        .then(p => RNOtpVerify.addListener(otpHandler))
        .catch(p => console.log('err', p));
    }
    return () => RNOtpVerify.removeListener(otpHandler);
  }, []);

  const otpHandler = message => {
    console.log('SMS :: ', message);
    let detectedCode = getCodeFromText(message);
    set_otp(detectedCode);
  };

  const handleDeepLink = async url => {
    const newUrl = url.url;
    const waId = newUrl.slice(newUrl.indexOf('=') + 1);

    var myHeaders = new Headers();
    myHeaders.append('clientId', strings.clientId);
    myHeaders.append('clientSecret', strings.clientSecret);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      waId,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch('https://cityfurnish.authlink.me', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 'SUCCESS') {
          console.log('result.user.waNumber:-', result.user.waNumber);
          setIsOtpLess(true);
          return result.user.waNumber;
        } else {
        }
      })
      .then(number => {
        set_emailOrMobile(number.slice(2));
        setIsOtpLess(true);
        var formdata = new FormData();
        formdata.append('mobile_number', number?.slice(2));

        console.log({ formdata });

        var requestOptions = {
          method: 'POST',
          // headers: myHeaders,
          body: formdata,
          // redirect: 'follow',
        };

        fetch(`${BASE_URL}/v1/user/otpless_login`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('OTP less ::', result);
            if (result.status_code == 200) {
              // const obj = new SigninScreen();
              // obj.saveFromAsynAndNavigate(result);
              saveFromAsynAndNavigate(result);
            } else if (result.data.status_code == '100') {
              setSaveResultData(result);
              setEmailList(result?.data?.data);
              //saveFromAsynAndNavigate(result);
              setIsEmailView(true);
              set_isOtpSent(false);
              //set_fromOtpless(true);
            } else {
              AppToast('Something went wrong');
            }
          })
          .catch(error => console.log('error', error));
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    if (countDown < 1) {
      clearInterval(intervalRef.current);
      set_countDown(30);
      set_isTimeVisible(false);
    }
  }, [countDown]);

  const callbackToRemoveError = key => {
    if (error.hasOwnProperty(key)) {
      error[key] = '';

      set_error(error);
    }
  };

  const otplessEmailUpdate = email => {
    var formdata = new FormData();
    formdata.append('mobile_number', emailOrMobile);
    formdata.append('email', email);

    var requestOptions = {
      method: 'POST',
      // headers: myHeaders,
      body: formdata,
      // redirect: 'follow',
    };
    fetch(`${BASE_URL}/v1/user/otpless_login`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status_code == 200) {
          saveFromAsynAndNavigate(result);
        } else if (result.data.status_code == '100') {
          // console.log(result);
          set_emailOrMobile(emailOrMobile);
          const eventProperty = {
            [amplitude_property.phone_number]: emailOrMobile,
          };
          track(amplitude_events.whatsapp_added, eventProperty);
          set_emailFieldVisible(true);
          set_fromOtpless(true);
        } else {
          AppToast('Something went wrong');
        }
      })
      .catch(error => console.log('error', error));
  };

  const onChangeEmail = text => {
    if (text.length >= 10) {
      if (validateMobileNumber(text)) {
        // this.setState({isMobileLogin: true, emailOrMobile: text});
        set_isMobileLogin(true);
        set_emailOrMobile(text);
      } else {
        set_isMobileLogin(false);
        set_emailOrMobile(text);
        set_isGetOtpTextVisible(false);
        set_isGetOtpTextVisible(true);
        set_otp('');
      }
    } else {
      set_isMobileLogin(false);
      set_emailOrMobile(text);
      set_isOtpInputFIeldVisible(false);
      set_isGetOtpTextVisible(true);
      set_otp('');
    }
  };

  const onPressGetOtp = () => {
    // const {emailOrMobile} = this.state;
    if (emailOrMobile.trim() != '' && emailOrMobile.trim().length == 10) {
      var formdata = new FormData();
      formdata.append('mobile_number', emailOrMobile);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${BASE_URL}/v1/user/sendotp_new`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status_code == '200') set_isOtpSent(true);
          startCountDown();
        })
        .catch(error => console.log('error', error));
    } else {
      AppToast('Please fill your Mobile number properly');
    }
  };

  const focusToNext = () => {
    if (isMobileLogin) {
      // focusTo(this.otpRef)
    } else {
      focusToNext(passwordRef);
    }
  };

  const saveFromAsynAndNavigate = async data => {
    const { toScreenName } = props;
    let appUsrObj = AppUser.getInstance();
    appUsrObj.token = data.data.access_token;
    appUsrObj.userId = data.data.id.toString();
    appUsrObj.userDetails = data.data;

    const eventName = 'af_login';
    const eventValues = {
      'Phone Number': emailOrMobile,
      'Email Id': appUsrObj.userDetails.email,
      'Full Name': appUsrObj.userDetails.full_name,
      'User ID': appUsrObj.userId,
    };

    // HandleAppsFlyer(eventName, eventValues);

    if (appUsrObj.userDetails) {
      appUsrObj.itemsIncartCount = parseInt(
        appUsrObj.userDetails.itemsIncartCount,
      );
      props.onUpdateCartBadgeCount(appUsrObj.itemsIncartCount);
      appUsrObj.wishlistCount = parseInt(
        appUsrObj.userDetails.WishlistItemsCount,
      );
      props.onUpdateWishlistBadgeCount(appUsrObj.wishlistCount);
    }

    const userToken = [AsyncStorageContaints.UserToken, data.data.access_token];
    const userId = [AsyncStorageContaints.UserId, data.data.id.toString()];

    const userDetails = [
      AsyncStorageContaints.UserData,
      JSON.stringify(data.data),
    ];
    const itemsIncartCount = [
      AsyncStorageContaints.cartBadgeCount,
      appUsrObj.userDetails.itemsIncartCount,
    ];
    const itemsInWishlistCount = [
      AsyncStorageContaints.wishlistBadgeCount,
      appUsrObj.userDetails.WishlistItemsCount.toString(),
    ];

    try {
      await AsyncStorage.multiSet([
        userToken,
        userId,
        userDetails,
        itemsIncartCount,
        itemsInWishlistCount,
      ]);
      await AsyncStorage.setItem('onBoardingScreen', 'true');
      if (toScreenName == '') {
        // oldest logic
        // const resetAction = CommonActions.reset({
        //   index: 0,
        //   routes: [{ name: 'SelectCityScreen' }],
        // });
        // props.navigation.dispatch(resetAction);
        if (skipCity) {
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'DashboardScreen' }],
          });
          props.navigation.dispatch(resetAction);
        } else {
          // alert('alert,')
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'SelectCityScreen' }],
          });
          props.navigation.dispatch(resetAction);
        }

        // older logi
        // const resetAction = CommonActions.reset({
        //   index: 0,
        //   type: 'tab',
        //   routes: [{name: 'Cart'}],
        // });
        // props.navigation.dispatch(resetAction);

        // my logic
        // navigation.navigate('DashboardScreen');
        // console.log(props.navigation);
        // navigation.navigate('Cart');
        console.log('zees worked');
      } else {
        let obj = AppUser.getInstance();
        let token = obj.fcmToken;
        if (token) {
          props.updateFcmTokenToServer(token);
        }
        if (navigation.canGoBack()) navigation.pop();

        if (toScreenName.includes('ProductDetailScreen')) {
          let arr = toScreenName.split('_');
          let id = parseInt(arr[1]);
          navigation.navigate('ProductDetailScreen', {
            productId: id,
          });
        } else {
          navigation.navigate(toScreenName);
        }
      }
      AppToast('Login Successfully.!');
      setUserId(data.data.id.toString());
    } catch (e) {
      console.log('Error saving user details', e);
    }
  };

  const onPressVerifyOtp = async () => {
    // const {emailOrMobile, otp} = this.state;
    if (emailOrMobile.trim() != '' && emailOrMobile.trim().length == 10) {
      var formdata = new FormData();
      formdata.append('mobile_number', emailOrMobile);
      formdata.append('otp', otp);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${BASE_URL}/v1/user/verifyotp_new`, requestOptions)
        .then(response => response.json())
        .then(async result => {
          console.log(result);
          if (result.status_code == '200') {
            AppToast(result.message);
            saveFromAsynAndNavigate(result);
          } else if (result.status_code == '400') {
            if (result.data.status_code == '100') {
              AppToast(result.data.message);
              // this.setState({
              //   emailFieldVisible: true,
              // });
              set_emailFieldVisible(true);
            } else AppToast(result.message);
            console.log(result.data.message);
          } else {
            AppToast(result.message);
          }
        })
        .catch(error => console.log('error', error));
    } else {
      AppToast('Please fill your Mobile number properly');
    }
  };

  const onSaveEmail = email => {
    console.log('onSaveEmail---', { emailOrMobile });
    // const {emailOrMobile, otp, updateEmail} = this.state;
    if (emailOrMobile.trim() != '' && emailOrMobile.trim().length == 10) {
      var formdata = new FormData();
      formdata.append('mobile_number', emailOrMobile);
      formdata.append('otp', otp);
      formdata.append('email', email ? email : updateEmail);

      console.log("FOrmData ::", formdata)
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      if (otp?.length == 5) {
        fetch(`${BASE_URL}/v1/user/verifyotp_new`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(' :: 123 heres the result ::', result);
            if (result.status_code == '200') {
              AppToast(result.message);
              saveFromAsynAndNavigate(result);
              setSaveResultData(result);
              setIsRefferalCodeScreen(true);
              set_isOtpSent(false);
              const eventProperties = {
                [amplitude_property.phone_number]: result?.data?.mobile_number,
              };
              track(amplitude_events.phone_number_added, eventProperties);
            } else if (result.status_code == '400') {
              if (result.data.status_code == '100') {
                // AppToast(result.data.message);
                // this.setState({
                //   emailFieldVisible: true,
                // });
                // set_emailFieldVisible(true);
                setSaveResultData(result);
                setEmailList(result?.data?.data);
                //saveFromAsynAndNavigate(result);
                setIsEmailView(true);
                set_isOtpSent(false);
              } else {
                setSaveResultData(result);
                console.log("Hellooo ::")
                AppToast(result.message);
                //saveFromAsynAndNavigate(result);
              }
            } else {
              setSaveResultData(result);
              //saveFromAsynAndNavigate(result);
              AppToast(result.message);
            }
          })
          .catch(error => console.log('error', error));
      }


    } else {
      AppToast('Please fill your Mobile number properly');
    }
  };

  const startCountDown = () => {
    // this.setState({
    //   isTimeVisible: true,
    // });
    set_isTimeVisible(true);
    intervalRef.current = setInterval(
      () => set_countDown(prevState => prevState - 1),
      1000,
    );
  };

  const gotoSelectCityAndReset = () => {
    const { toScreenName } = props;
    if (toScreenName == '') {
      props.navigation.navigate('SelectCityScreen');
    } else {
      props.navigation.pop();
    }
  };

  return (
    <View style={styles.fullScreen}>
      <MyStatusBar
        barStyle="dark-content"
        backgroundColor={resource.colors.white}
      />
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{ flex: 1, marginTop: Dimensions.get('screen').height / 2.5 }}>
            <TextInput keyboardType={'email-address'} style={{ backgroundColor: '#fff', elevation: 5, marginBottom: 15, paddingLeft: 15 }} placeholder='Enter Email' />
            <TextInput keyboardType={'default'} secureTextEntry={true} style={{ backgroundColor: '#fff', elevation: 5, marginBottom: 5, paddingLeft: 15 }} placeholder='Password' />
            <TouchableOpacity style={{ backgroundColor: '#000', marginTop: 10, paddingVertical: 15, paddingHorizontal: 15, elevation: 5, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', color: '#fff', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 'bold' }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  const { toScreenName } = state.skipLoginReducer;
  return { toScreenName: toScreenName };
};
let container = connect(
  mapStateToProps,
  {
    ...actions,
    hitSocialLoginApi,
    hitLinkedinApiToGetUser,
    hitDirectSocialLoginApi,
    hitFacebookApiToGetUser,
    hitSendOtpApi,
    updateFcmTokenToServer,
    onUpdateCartBadgeCount,
    onUpdateWishlistBadgeCount,
    hitGetAllCitiesApi,
    storeAdminArea,
  },
)(SigninScreen);
let loader = APILoadingHOC(container);

loader.getIntent = () => {
  return {
    routeName: 'SigninScreen',
  };
};

export default loader;
