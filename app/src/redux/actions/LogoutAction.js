import {USER_LOGOUT} from '../Type';
import DeviceInfo from 'react-native-device-info';
import ApiEndpoints, {
  UPDATE_FCM_DEVICE_TOKEN_API,
  UPDATE_CONTACT_API,
} from '../../apimanager/ApiEndpoint';
import ApiSingleton from '../../apimanager/ApiSingleton';
import {POST} from '../../apimanager/RequestMethods';
import AppUser from '../../utility/AppUser';

export const onUserLogout = () => {
  return {
    type: USER_LOGOUT,
    data: {},
  };
};

export const updateFcmTokenToServer = fcmToken => dispatch => {
  return new Promise((resolve, reject) => {
    let appVersion = DeviceInfo.getVersion();
    // console.log("appVersion",appVersion)
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      device_token: fcmToken,
      user_id: Userid,
      app_version: appVersion,
    };
    const Url = ApiEndpoints(UPDATE_FCM_DEVICE_TOKEN_API);
    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: POST,
        headersOverride: {
          'Content-Type': 'multipart/form-data',
          authtoken: token,
          userid: Userid,
        },
        onSuccess: async data => {
          resolve(data);
        },
        onFailure: error => {
          reject(error);
        },
        label: UPDATE_FCM_DEVICE_TOKEN_API,
        data: parameters,
      }),
    );
  });
};

export const updateContactToServer = userContacts => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      contacts: userContacts,
      customer_id: Userid,
      user_id: Userid,
    };
    const Url = ApiEndpoints(UPDATE_CONTACT_API);
    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: POST,
        headersOverride: {
          'Content-Type': 'multipart/form-data',
          authtoken: token,
          userid: Userid,
        },
        onSuccess: async data => {
          resolve(data);
        },
        onFailure: error => {
          reject(error);
        },
        label: UPDATE_CONTACT_API,
        data: parameters,
      }),
    );
  });
};
