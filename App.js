import React, { Component, useEffect, useRef } from 'react';
import AppNavigation from './app/src/appnavigation/AppNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageContaints from './app/src//utility/AsyncStorageConstants';
import Geolocation from '@react-native-community/geolocation';
import { Provider } from 'react-redux';
import Store from './app/src/redux/store/Store';
import RNOtpVerify from 'react-native-otp-verify';
import FlashMessage from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
import { logOnConsole } from './app/src/utility/Utils';
import { init } from '@amplitude/analytics-react-native';
import { SafeAreaView, StatusBar } from 'react-native';
import AudioRecord from 'react-native-audio-record';

console.disableYellowBox = true;

const options = {
  sampleRate: 16000,  // default 44100
  channels: 1,        // 1 or 2, default 1
  bitsPerSample: 16,  // 8 or 16, default 16
  audioSource: 6,     // android only (see below)
  wavFile: 'test.wav' // default 'audio.wav'
};

const App = () => {

  const myLocalFlashMessage = useRef();
  useEffect(() => {
    checkPermission();
    try {
      AudioRecord.init(options);
    } catch (error) {
      logOnConsole('Failed to initialise appsflyer !!')
    }
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

  Geolocation.getCurrentPosition(
    (position) => {
      //getting the Longitude from the location json
      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Latitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
      //Setting the state
      saveLocationForFutureUse(currentLatitude, currentLongitude);
    },
    (error) => {
      // See error code and message
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  );

  const saveLocationForFutureUse = async (lat, long) => {
    AsyncStorage.setItem(AsyncStorageContaints.surveyLatitude, lat + '');
    AsyncStorage.setItem(AsyncStorageContaints.surveyLongitude, long + '');
    // console.log('saveLocationForFutureUse');
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 0 }}>
      <Provider store={Store}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <AppNavigation />
        <FlashMessage style={{ marginBottom: 0 }} position={'bottom'} ref={myLocalFlashMessage} />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
