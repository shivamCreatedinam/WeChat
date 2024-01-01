'use strict';
import { Platform, Dimensions, StatusBar, Alert, PixelRatio } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import appsFlyer from 'react-native-appsflyer';

const MapAPIKey = 'AIzaSyBdR-ro5cVTRIihxT_upuFy9qzw7P2OXrQ';
const myWidth =
  Dimensions.get('window').width > 410 ? 410 : Dimensions.get('window').width;
const myHeight =
  Dimensions.get('window').height > 812 ? 812 : Dimensions.get('window').height;
const isPlatformIOS = Platform.OS == 'ios';
const standardWidth = 375.0;
const standardHeight = 767.0;
//const razorpayKeyId = 'rzp_live_qHdkNZaUW7tkuR'; // Live Key
const razorpayKeyId = 'rzp_test_dw32j6ggDS3ktY'; // Test Key

export const isLive = () => {
  if (BASE_URL === 'https://cityfurnish.com') {
    return true;
  }
  return false;
};

export const getRazorpayKey = () => {
  if (isLive()) {
    return 'rzp_live_qHdkNZaUW7tkuR';
  } else {
    return 'rzp_test_dw32j6ggDS3ktY';
  }
};

export const HandleAppsFlyer = (eventName, eventValues) => {
  try {
    appsFlyer.logEvent(
      eventName,
      eventValues,
      res => {
        logOnConsole('appsflyer success response----', res);
      },
      err => {
        logOnConsole('appsflyer error response----', err);
      },
    );
  } catch (error) {
    logOnConsole('Appsflyer failed to log event !!!');
  }
};

export const myOS = Platform.OS;
export function widthScale(dimension) {
  return (dimension / standardWidth) * myWidth;
}
export function heightScale(dimension) {
  return (dimension / standardHeight) * myHeight;
}

export const logOnConsole = (...arg) => {
  if (isLive()) {
    console.log(arg);
  }
};
export function isIphone11orAboveDevice() {
  // with Device Name
  return (
    (Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTV &&
      DeviceInfo.getModel() === 'iPhone X') ||
    (DeviceInfo.getModel() === 'iPhone 11' ||
      DeviceInfo.getModel() === 'iPhone 11 Pro' ||
      DeviceInfo.getModel() === 'iPhone 11 Pro Max') ||
    (DeviceInfo.getModel() === 'iPhone 12' ||
      DeviceInfo.getModel() === 'iPhone 12 Pro' ||
      DeviceInfo.getModel() === 'iPhone 12 Pro Max') ||
    (DeviceInfo.getModel() === 'iPhone 13' ||
      DeviceInfo.getModel() === 'iPhone 13 Pro' ||
      DeviceInfo.getModel() === 'iPhone 13 Pro Max')
  );
}
export function isIphone11orAbove() {
  // With resolution
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}
var validateEmail = email => {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

var validateMobileNumber = phone => {
  let regex = /^[0-9]{10}$/;
  return regex.test(phone);
};
var validatePanCard = pan => {
  let regex = /^[0-9]{10}$/;
  return regex.test(pan);
};
var validatePostal = postalCode => {
  let regex = /^[0-9]{6}$/;
  return regex.test(postalCode);
};
var validatePassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export function focusTo(ref) {
  if (ref && ref.current) {
    ref.current.focus();
  }
}
const shadow = (depth, color = 'rgba(0, 0, 0, 0.5)') => ({
  elevation: depth,
  shadowOffset: { width: depth, height: depth },
  shadowColor: color,
  shadowOpacity: 1,
  shadowRadius: depth,
});

const isiPhoneX = isPlatformIOS && myHeight > 800;
const statusBarHeight = (() => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight || 20;
    // return 30;
  }
  if (isiPhoneX) {
    return 45;
  }
  return 20;
})();
const topHeight = (() => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight || 20;
  }
  if (isiPhoneX) {
    return 45;
  }
  return 20;
})();

var restrict = text => {
  return text.replace(/[:;,\n]/g, '');
};
var renderInputError = (key, error) => {
  if (!error) {
    return null;
  }
  const errorKeys = Object.keys(error);
  if (errorKeys == 0) {
    return null;
  }
  if (!errorKeys.includes(key)) {
    return null;
  }
  return error[key];
};
export function isNumber(str) {
  const temp = str.trim();
  const len = temp.length;
  let isNumCheck = true;
  for (let i = 0; i < len; i++) {
    const ch = temp.charAt(i);
    if (ch < '0' || ch > '9') {
      isNumCheck = false;
      break;
    }
  }
  return isNumCheck;
}

var convertJsonToFormData = json => {
  let form_data = new FormData();

  for (let key in json) {
    if (
      key.includes('pan_card') ||
      key.includes('delivery_address') ||
      key.includes('permanent_address') ||
      key.includes('financial_statement') ||
      key.includes('file') ||
      key.includes('files1') ||
      key.includes('files2') ||
      key.includes('files3')
    ) {
      if (checkIsImageType(json[key])) {
        form_data.append(key, {
          uri: json[key],
          type: 'image/jpeg',
          name:
            new Date().getTime().toString() +
            '_' +
            key +
            '.' +
            getExtensionForImage(json[key]),
        });
      } else {
        form_data.append(key, {
          uri: json[key],
          type: 'image/jpeg',
          name: new Date().getTime().toString() + '_' + key + '.pdf',
        });
      }
    } else {
      form_data.append(key, json[key]);
    }
  }
  // data.append('media', { uri: fileURI, type: 'image/jpeg', name: dtata + "_" + eventId });
  return form_data;
};

var navigationReference = null;

export function setNavigationReference(ref) {
  navigationReference = ref;
}

export function getNavigationReference() {
  return navigationReference;
}

export {
  validateEmail,
  validateMobileNumber,
  validatePassword,
  isPlatformIOS,
  MapAPIKey,
  shadow,
  statusBarHeight,
  restrict,
  renderInputError,
  convertJsonToFormData,
  isiPhoneX,
  topHeight,
  validatePostal,
  myWidth,
  myHeight,
  validatePanCard,
  razorpayKeyId,
};

import AppUser from './AppUser';
import Store from '../redux/store/Store';
import { updateRouteNameForSkipSignin } from '../redux/actions/SkipLoginAction';
import { StackActions } from '@react-navigation/native';
import { navigationRef } from '../appnavigation/RootNavigation';
import res from '../../res';

export function checkIfUserIsLoggedIn() {
  let appUser = AppUser.getInstance();
  let token = appUser.token;
  if (!token || token == '') {
    return false;
  }
  return true;
}

export function showSigninAlert(returnAfterLoginOnScreen) {
  Alert.alert(
    res.strings.APP_NAME,
    res.strings.youNeedLogin,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => redirectToSign(returnAfterLoginOnScreen) },
    ],
    { cancelable: false },
  );
}

export function redirectToSign(toRoute) {
  Store.dispatch(updateRouteNameForSkipSignin(toRoute));
  const pushAction = StackActions.push('SigninScreen');
  if (navigationRef) {
    navigationRef.current.dispatch(pushAction);
  }
}

function getExtension(url) {
  return url.split('/').pop();
}
export function checkIsImageOrPdfFileType(url) {
  var ext = getExtension(url);
  switch (ext) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'pdf':
      return true;
  }
  return false;
}

function getExtensionForImage(url) {
  return url.split('.').pop();
}
export function checkIsImageType(url) {
  var ext = getExtensionForImage(url);
  switch (ext) {
    case 'jpg':
    case 'jpeg':
    case 'png':
      return true;
  }
  return false;
}

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export function checkValidFileSize(size) {
  if (size <= MAX_SIZE) {
    return true;
  }
  return false;
}

export function getFormattedTime() {
  var today = new Date();
  var y = today.getFullYear();
  // JavaScript months are 0-based.
  var m = today.getMonth() + 1;
  var d = today.getDate();
  var h = today.getHours();
  var mi = today.getMinutes();
  var s = today.getSeconds();
  return y + '_' + m + '_' + d + '_' + h + ':' + mi + ':' + s;
}

export function getProductIdFromUrl(url) {
  let myregexp = /:\/\/.*?\/.*?\/(\d+)/;
  let match = myregexp.exec(url);
  if (match) {
    return match[1]; // product Id
  }
  return null;
}

export function getCustomerFeedbackUrl(url) {
  let splitArr = url.split('/');
  let match = splitArr[splitArr.length - 2]; // splitArr[3]
  if (match) {
    return match; // customer feedback url
  }
  return null;
}

export function getNavigateUrl(url) {
  let match = url.substring(url.lastIndexOf('/') + 1);
  let payment_url = match.split('?');
  let customer_payment_url = payment_url[0];
  if (customer_payment_url) {
    return customer_payment_url; // customer payment url
  }
  return null;
}

export function getNavigateUrlCode(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  let results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function getCustomerPaymentParameters(url) {
  let urlString = url;
  var obj = {};
  if (urlString.includes('?')) {
    let paramString = urlString.split('?')[1];
    let params_arr = paramString.split('&');
    for (let i = 0; i < params_arr.length; i++) {
      let pair = params_arr[i].split('=');
      obj[pair[0]] = pair[0] == 'amount' ? pair[1].substring(3) : pair[1];
    }
  }
  return obj;
}

import resources from '../../res';
import { BASE_URL } from '../apimanager/ApiEndpoint';

export const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 6,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: resources.colors.stepIndicatorGreen,
  separatorFinishedColor: resources.colors.stepIndicatorGreen,
  separatorUnFinishedColor: resources.colors.greyLight,
  stepIndicatorFinishedColor: resources.colors.stepIndicatorGreen,
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: 'transparent',
  stepIndicatorLabelCurrentColor: resources.colors.stepIndicatorGreen,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: resources.colors.greyLight,
};

export function getOtpFromText(msg) {
  var numb = msg.match(/\d/g);
  return numb?.slice(0, 5);
}

export function getCodeFromText(msg) {
  var numb = msg.match(/\d/g);
  var stringNumber = numb?.slice(0, 5).toString();
  return stringNumber?.replace(/,/g, '');
}

export const enumDocumentModalType = {
  document: 'document',
  terms_and_condition: 'terms_and_condition',
};

export const enumOrderActionType = {
  cancellation: 'cancellation',
  full_extension: 'full_extension',
  request_pickup: 'request_pickup',
  repair: 'repair',
  upgrade: 'upgrade',
  installation: 'installation',
  relocation: 'relocation',
  buy: 'buy',
  change_bill_cycle: 'change_bill_cycle',
  cancel_mandate: 'cancel_mandate',
  transfer_ownership: 'ownership',
  new_transfer_ownership: 'new_ownership',
  swap: "swap",
  select_Swap_Product: "select_Swap_Product",
  pickup_Reasons: "pickup_reasons",
  pickup_detailed_reason: "pickup_detailed_reason",
  create_new_request: "create_new_request"
};
export const enumCartActionType = {
  address_list: 'address_list',
  add_address: 'add_address',
  cityshield: 'cityshield',
  confirm_address: 'confirm_address',
  transfer_owner_address: 'transfer_owner_address',
  saved_address: 'saved_address'
};

export const enumCityFurnishCoinsType = {
  coins_history: 'coins_history'
}

export const checkNotch = () => {
  if (Platform.OS === 'ios') {
    return !Platform.isPad && !Platform.isTVOS && myHeight >= 812;
  } else {
    return StatusBar.currentHeight > 24;
  }
};

///Responsive Layout
export const wp = widthPercent => {
  if (widthPercent === 0) return 0;
  widthPercent = (widthPercent - 0.5) / 4;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((myWidth * elemWidth) / 100);
};

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @return {number}              The calculated dp depending on current device's screen width.
 */
export const widthPercentageToDP = widthPercent => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((myWidth * elemWidth) / 100);
};

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover
 *                                along with the percentage symbol (%).
 * @return {number}               The calculated dp depending on current device's screen height.
 */
export const heightPercentageToDP = heightPercent => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((myHeight * elemHeight) / 100);
};

export const enumOrderStatus = {
  kyc_pending: 'kyc_pending',
  payment_fail: 'payment_fail',
};

export const enumPickUploadOption = {
  document: 'document',
  image: 'image',
  camera: 'camera',
};
