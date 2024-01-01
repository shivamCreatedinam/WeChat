import React, { Component, useEffect, useRef } from 'react';
import AppNavigation from './app/src/appnavigation/AppNavigation';
import { Provider } from 'react-redux';
import Store from './app/src/redux/store/Store';
import RNOtpVerify from 'react-native-otp-verify';
import FlashMessage from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
import appsFlyer from 'react-native-appsflyer';
import {
  AMPLITUDE_DEV_KEY,
  APPSFLYER_DEV_KEY,
} from './app/src/apimanager/ApiEndpoint';
import { logOnConsole } from './app/src/utility/Utils';
import { init } from '@amplitude/analytics-react-native';
import { SafeAreaView, StatusBar } from 'react-native';

console.disableYellowBox = true;

const App = () => {

  const myLocalFlashMessage = useRef();
  useEffect(() => {
    checkPermission();
    RNOtpVerify.getHash()
      .then(console.log)
      .catch(console.log);
    try {
      // appsFlyer.initSdk(
      //   {
      //     devKey: APPSFLYER_DEV_KEY,
      //     isDebug: false,
      //     appId: '1526271477',
      //     onInstallConversionDataListener: true,
      //     onDeepLinkListener: true,
      //     timeToWaitForATTUserAuthorization: 10,
      //   },
      //   result => {
      //     logOnConsole(result, 'from appsflyer');
      //   },
      //   error => {
      //     logOnConsole(error);
      //   },
      // );
    } catch (error) {
      logOnConsole('Failed to initialise appsflyer !!')
    }
    // init(AMPLITUDE_DEV_KEY);
  }, []);

  const checkPermission = async () => {
    const enabled = await messaging().requestPermission();
    if (enabled) {
    } else {
      try {
        await messaging().requestPermission();
      } catch (error) { }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1,marginTop:20 }}>
      <Provider store={Store}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <AppNavigation />
        <FlashMessage position="top" ref={myLocalFlashMessage} />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
