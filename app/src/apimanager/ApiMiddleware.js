import {API} from './types';
import {apiError, apiStart, apiEnd} from './APIAction';
import {LINKEDIN_USER_API, FACEBOOK_USER_API} from './ApiEndpoint';
import {convertJsonToFormData, checkIfUserIsLoggedIn} from '../utility/Utils';
import {POST, GET} from '../apimanager/RequestMethods';
import AsyncStorage from '@react-native-community/async-storage';
import AppUser from '../utility/AppUser';
import AsyncStorageConstants from '../utility/AsyncStorageConstants';
import Store from '../redux/store/Store';
import {
  onUserLogout,
  updateFcmTokenToServer,
} from '../redux/actions/LogoutAction';
import {CommonActions} from '@react-navigation/native';
import {navigationRef, push} from '../appnavigation/RootNavigation';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorageContaints from '../utility/AsyncStorageConstants';
import AppToast from '../genriccomponents/appToast/AppToast';
//--------------- API MIDDLEWARE ------------------//

//1. Set up the middleware
const ApiMiddleware = ({dispatch, getState}) => next => action => {
  next(action); // Dont comment this.

  //2. ONLY DO FOR type='API' actions, Dismiss irrelevant action types
  if (action.type !== API) return;
  //3. Extract imp. variables from the action payload
  const {
    url,
    method,
    data,
    accessToken,
    headersOverride,
    onSuccess,
    onFailure,
    label,
  } = action.payload;

  // let state = await NetInfo.fetch()
  // if (!state.isConnected) {
  //     return
  // }

  NetInfo.fetch().then(state => {
    if (!state.isConnected) {
      if (label) {
        // send apiEnd action
        onFailure('No internet connection');
        dispatch(apiEnd(label));
      }
      return;
    }

    // console.log(`ApiMiddleware: ->\n ${method}  ${url}`, label);
    if (data) null;
    if (headersOverride)
      if (label) {
        //6.Handle loading states
        dispatch(apiStart(label)); // send apiStart action
      }
    // converting json object into Form data:
    // console.log('convertJson');
    let params = convertJsonToFormData(data);
    if (
      method == GET &&
      (label == LINKEDIN_USER_API || label == FACEBOOK_USER_API)
    ) {
      fetch(url, {
        method: method,
        headers: {
          ...(headersOverride ? headersOverride : {}),
        },
      })
        .then(response => response.json())
        .then(data => {
          //   console.log('Get API SUCCESS =>', data);
          let action = onSuccess(data);
          if (action) {
            dispatch(action);
          }
        })
        .catch(error => {
          //   console.log('Get API ERROR =>', error);
          // if(error.includes("Network request failed")){
          //     alert("No Internet Connection.Please try again later")
          // }
          if (error.response) {
            dispatch(apiError(label, error));
          } else if (error.request) {
            dispatch(apiError(label, error.request));
          }
        })
        .finally(() => {
          if (label) {
            dispatch(apiEnd(label));
          }
        });
    } else if (method == GET) {
      let defaultHeader = {};
      if (headersOverride) {
        headersOverride['Cache-Control'] = 'no-cache';
        // headersOverride['Accept'] = 'application/json'
        // headersOverride['Content-Type'] = 'application/json'
      } else {
        defaultHeader['Cache-Control'] = 'no-cache';
        // defaultHeader['Accept'] = 'application/json'
        // defaultHeader['Content-Type'] = 'application/json'
      }
      // console.log(
      //   `headersOverride: ->\n ${JSON.stringify(
      //     headersOverride ? headersOverride : defaultHeader,
      //   )}`,
      // );
      fetch(url, {
        method: method,
        headers: {
          ...(headersOverride ? headersOverride : defaultHeader),
        },
      })
        .then(response => response.json())
        .then(data => {
          //   console.log('Get API SUCCESS =>', data);
          if (data.status_code == 200) {
            let action = onSuccess(data);
            if (action) {
              dispatch(action);
            }
          } else if (data.status_code == 401) {
            logoutOfAppp();
          } else {
            onFailure(data.message);
          }
        })
        .catch(error => {
          //   console.log('Get API ERROR =>', error);
          // if(error.includes("Network request failed")){
          //     alert("No Internet Connection.Please try again later")
          // }
          if (error.response) {
            dispatch(apiError(label, error));
          } else if (error.request) {
            dispatch(apiError(label, error.request));
          }
        })
        .finally(() => {
          if (label) {
            // send apiEnd action
            dispatch(apiEnd(label));
          }
        });
    } else if (method == POST) {
      let defaultHeader = {};
      if (headersOverride) {
        headersOverride['Cache-Control'] = 'no-cache';
      } else {
        defaultHeader['Cache-Control'] = 'no-cache';
      }
      //   console.log(
      //     `headersOverride:== ->\n ${JSON.stringify(
      //       headersOverride ? headersOverride : defaultHeader,
      //     )}`,
      //   );
      //   console.log('params', params);
      fetch(url, {
        body: params,
        method: method,
        headers: {
          ...(headersOverride ? headersOverride : defaultHeader),
        },
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log('POST API SUCCESS =>', data);
          if (data.status_code == 200) {
            let action = onSuccess(data);
            if (action) {
              dispatch(action);
            }
          } else if (data.status_code == 401) {
            logoutOfAppp();
          } else {
            onFailure(data.message);
          }
        })
        .catch(error => {
          // console.log('POST API ERROR =>', error);
          // if(error.includes("Network request failed")){
          //     alert("No Internet Connection.Please try again later")
          // }
          if (error.response) {
            dispatch(apiError(label, error));
          } else if (error.request) {
            dispatch(apiError(label, error.request));
          }
        })
        .finally(() => {
          if (label) {
            // send apiEnd action
            dispatch(apiEnd(label));
          }
        });
    }
  });
};

async function logoutOfAppp() {
  // if (checkIfUserIsLoggedIn()) {
  //     Store.dispatch(updateFcmTokenToServer("0"))
  // }
  try {
    try {
      AsyncStorage.getAllKeys()
        .then(keys => {
          let filteredKeys = keys.filter(item => {
            return item !== 'onBoardingScreen';
          });
          if (keys != '@temp_user_id') AsyncStorage.multiRemove(filteredKeys);
        })
        .then(() => console.log('logout success !!!'));
    } catch (e) {
      //   console.log('Error removing data from async storage.', e);
    }

    let appUsrObj = AppUser.getInstance();
    appUsrObj.token = undefined;
    appUsrObj.userId = undefined;
    appUsrObj.userDetails = undefined;
    appUsrObj.selectedCityId = undefined;
    appUsrObj.selectedCityName = undefined;
    appUsrObj.itemsIncartCount = undefined;
    Store.dispatch(onUserLogout());
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: 'SigninScreen'}],
    });

    if (navigationRef) {
      AppToast('Session expired');
      navigationRef.current.dispatch(resetAction);
    }
  } catch (error) {
    // console.log('Error while logging out', error);
  }
}

export default ApiMiddleware;
