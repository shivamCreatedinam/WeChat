import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageContaints from '../../utility/AsyncStorageConstants';
import axios from "axios";
import styles from './styles';

// import auth from '@react-native-firebase/auth';
import resource from '../../../res';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import APILoadingHOC from '../../genriccomponents/HOCS/APILoadingHOC';
import * as actions from '../../redux/actions/SigninAction';
import {
  hitSocialLoginApi,
  hitLinkedinApiToGetUser,
  hitDirectSocialLoginApi,
  hitFacebookApiToGetUser,
} from '../../redux/actions/SocialLoginAction';
import { hitSendOtpApi } from '../../redux/actions/OtpAction';
import {
  useNavigation,
} from '@react-navigation/native';
import { MyStatusBar } from '../../genriccomponents/header/HeaderAndStatusBar';
import { updateFcmTokenToServer } from '../../redux/actions/LogoutAction';
import { onUpdateCartBadgeCount } from '../../redux/actions/CartAction';
import { onUpdateWishlistBadgeCount } from '../../redux/actions/WishListAction';
import { hitGetAllCitiesApi } from '../../redux/actions/SelectCityAction';
import { useDispatch, useSelector } from 'react-redux';
import { storeAdminArea } from '../../redux/actions/cityNameAction';
import { TextInput } from 'react-native-gesture-handler';


const SigninScreen = props => {

  const navigation = useNavigation();
  const [emailOrMobile, set_emailOrMobile] = useState('');
  const [fromOtpless, set_fromOtpless] = useState(false);
  const [isLoading, setLoading] = useState(false);
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
    var re = /(?=.*[0-9])/;
    return re.test(email);
  }

  const validateLogin = async () => {
    if (validateEmail(updateEmail)) {
      if (validatePassword(updatePassword)) {
        registerLogin(updateEmail, updatePassword);
      } else {
        showMessage({
          message: "Invalid Password",
          description: "Please enter valid password",
          type: "danger",
        });
      }
    } else {
      showMessage({
        message: "Invalid Email",
        description: "Please enter valid Email",
        type: "danger",
      });
    }
  }

  const registerLogin = (email, pass) => {
    setLoading(true);
    let self = this;
    const resource = {
      email: email,
      password: pass,
    }
    axios
      .post(`https://createdinam.in/RBI-CBCD/public/api/login`, resource)
      .then((res) => {
        console.log(res);
        if (res.data.status === true) {
          let token = res?.data?.token;
          let user = res?.data?.user;
          AsyncStorage.setItem(AsyncStorageContaints.UserId, token);
          AsyncStorage.setItem(AsyncStorageContaints.UserData, user);
          showMessage({
            message: "Successfully Login",
            description: "Please successfully login!",
            type: "success",
          });
          setLoading(false);
          navigation.replace('DashboardScreen');
        } else {
          showMessage({
            message: "User Not Found",
            description: "Please check your login Details!",
            type: "danger",
          });
          setLoading(false);
        }
      });
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
          <Image style={{ height: 180, width: 180, resizeMode: 'contain', alignSelf: "center", marginTop: 80 }} source={require('../../../res/images/appLogo/app_logo_main.png')} />
          <View style={{ flex: 1, marginTop: 50 }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>RBI Survey</Text>
            <TextInput value={updateEmail} onChangeText={(e) => set_updateEmail(e.toLocaleLowerCase())} keyboardType={'email-address'} style={{ backgroundColor: '#fff', elevation: 5, marginBottom: 15, paddingLeft: 15 }} placeholder='Enter Email' />
            <TextInput value={updatePassword} onChangeText={(e) => set_updatePassword(e)} keyboardType={'default'} secureTextEntry={true} style={{ backgroundColor: '#fff', elevation: 5, marginBottom: 5, paddingLeft: 15 }} placeholder='Password' />
            <TouchableOpacity onPress={() => validateLogin()} style={{ backgroundColor: '#000', marginTop: 10, paddingVertical: 15, paddingHorizontal: 15, elevation: 5, borderRadius: 5 }}>
              {isLoading === true ? <ActivityIndicator style={{ alignItems: 'center', }} color={'#fff'} /> : <Text style={{ textAlign: 'center', color: '#fff', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 'bold' }}>Login</Text>}
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
