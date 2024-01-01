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
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';
import MaterialInput from '../../genriccomponents/input/MaterialInput';
import styles from './styles';
// import auth from '@react-native-firebase/auth';
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
  const [updatePassword, set_updatePassword] = useState('');
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

  }, []);

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validatePassword = (email) => {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{4,20}$/;
    return re.test(email);
  }

  const validateLogin = async () => {
    if (validateEmail(updateEmail)) {
      if (validatePassword(updatePassword)) {
        console.warn('updatePasswordY', validateEmail(updatePassword));
        registerLogin(updateEmail, updatePassword);
      } else {
        showMessage({
          message: "Invalid Password",
          description: "Please enter valid password",
          type: "danger",
        });
        console.warn('updatePasswordYY', validateEmail(updatePassword));
      }
    } else {
      showMessage({
        message: "Invalid Email",
        description: "Please enter valid Email",
        type: "danger",
      });
      console.warn('updateEmailY', validateEmail(updateEmail));
    }
  }

  const registerLogin = (email, pass) => {
    showMessage({
      message: "Registration Successfully",
      description: "Registration Successfully!",
      type: "success",
    });
    // auth()
    //   .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
    //   .then(() => {
    //     console.log('User account created & signed in!');
        
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }

    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }

    //     console.error(error);
    //   });
  }

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
          <Image style={{ height: 200, width: 200, resizeMode: 'cover', alignSelf: "center", marginTop: 80 }} source={require('../../../res/images/appLogo/we_logo.png')} />
          <View style={{ flex: 1, marginTop: 50 }}>
            <TextInput value={updateEmail} onChangeText={(e) => set_updateEmail(e)} keyboardType={'email-address'} style={{ backgroundColor: '#fff', elevation: 5, marginBottom: 15, paddingLeft: 15 }} placeholder='Enter Email' />
            <TextInput value={updatePassword} onChangeText={(e) => set_updatePassword(e)} keyboardType={'default'} secureTextEntry={true} style={{ backgroundColor: '#fff', elevation: 5, marginBottom: 5, paddingLeft: 15 }} placeholder='Password' />
            <TouchableOpacity onPress={() => validateLogin()} style={{ backgroundColor: '#000', marginTop: 10, paddingVertical: 15, paddingHorizontal: 15, elevation: 5, borderRadius: 5 }}>
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
