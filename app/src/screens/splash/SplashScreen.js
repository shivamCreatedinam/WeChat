import React, {Component} from 'react';
import {Platform, View, Image, ImageBackground, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {eventEmitter, initialMode} from 'react-native-dark-mode';

import styles from './styles';
import {darkThemeColor, lightThemeColor} from '../../utility/AppThemeColor';
import resource from '../../../res';
import {appThemeAction} from '../../redux/actions/AppThemeAction';
import AppUser from '../../utility/AppUser';
import AsyncStorageContaints from '../../utility/AsyncStorageConstants';
import {onUpdateCartBadgeCount} from '../../redux/actions/CartAction';
import {onUpdateWishlistBadgeCount} from '../../redux/actions/WishListAction';
import {isPlatformIOS} from '../../utility/Utils';

import RNOtpVerify from 'react-native-otp-verify';


class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeView: '',
    };
  }

  componentDidMount = async () => {
    if (Platform.OS == 'ios') {
      this.setAppTheme(initialMode);
      eventEmitter.on('currentModeChanged', newMode => {
        this.setAppTheme(newMode);
      });
    }
    let isLoggedIn = false;
    let values = [];
    try {
      const userId = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
      if (userId !== null && userId != '') {
        values = await AsyncStorage.multiGet([
          AsyncStorageContaints.UserToken,
          AsyncStorageContaints.UserId,
          AsyncStorageContaints.UserData,
          AsyncStorageContaints.SelectedCity,
          AsyncStorageContaints.cartBadgeCount,
          AsyncStorageContaints.wishlistBadgeCount,
        ]);
        let appUsrObj = AppUser.getInstance();
        appUsrObj.token = values[0][1];
        appUsrObj.userId = values[1][1];
        appUsrObj.userDetails = JSON.parse(values[2][1]);
        let count = JSON.parse(values[4][1]);

        appUsrObj.itemsIncartCount = count && count != '' ? parseInt(count) : 0;
        this.props.onUpdateCartBadgeCount(appUsrObj.itemsIncartCount);

        let wishlistcount = JSON.parse(values[5][1]);
        appUsrObj.wishlistCount =
          wishlistcount && wishlistcount != '' ? wishlistcount : 0;
        this.props.onUpdateWishlistBadgeCount(appUsrObj.wishlistCount);

        let data = JSON.parse(values[3][1]);
        if (data) {
          appUsrObj.selectedCityId = data.id;
          appUsrObj.selectedCityName = data.list_value;
        }
        isLoggedIn = true;
      } else {
        isLoggedIn = false;
      }
    } catch (error) {
      console.log('Error fetching user id', error);
    }
    if (!isPlatformIOS) {
      this.getHash();
    }


    console.log({value});

    if (value !== 'true') {
      this.setState({
        changeView: 'OnBoard',
      });
    }
  
  };

  getHash = () => {
    RNOtpVerify.getHash()
      .then(hash => {
        let appUsrObj = AppUser.getInstance();
        appUsrObj.smsHash = hash;
      })
      .catch(e => {
        console.log('getHash error', e);
      });
  };

  /*
   * Set app theme color.
   */
  setAppTheme = appMode => {
    let payload = {};
    if (appMode == 'dark') {
      payload = {
        isDarkMode: true,
        themeBackgroundColor: darkThemeColor.themeBackgroundColor,
      };
    } else {
      payload = {
        isDarkMode: false,
        themeBackgroundColor: lightThemeColor.themeBackgroundColor,
      };
    }
    this.props.appThemeAction(payload);
  };

  render() {
    const {changeView} = this.state;
    return (
      <View style={styles.mainContainer}>

        <ImageBackground
          source={resource.images.splash_background}
          style={styles.backgroundImage}>
          <Image source={resource.images.img_new_logo} />
        </ImageBackground>
  
      </View>
    );
    
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      appThemeAction,
      onUpdateCartBadgeCount,
      onUpdateWishlistBadgeCount,
    },
    dispatch,
  );
};
function mapStateToProps(state) {
  return {
    appThemeReducer: state.appThemeReducer,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);
