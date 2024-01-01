/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { firebase } from '@react-native-firebase/database';
// console.disableYellowBox = true;


let config = {
    apiKey: 'AIzaSyBszzCYr-e9_3GpRi_CdXZLl6pi5kDrs8g',
    appId: '1:702822731342:android:c60fc871ad8775babafd1f',
    messagingSenderId: '702822731342',
    databaseURL: 'https://weconnect-bb841-default-rtdb.firebaseio.com/',
    projectId: 'weconnect-bb841',
};

firebase.initializeApp(config);

AppRegistry.registerComponent(appName, () => App);
