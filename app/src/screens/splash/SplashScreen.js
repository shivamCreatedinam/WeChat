import React, { Component } from 'react';
import { Platform, View, Image, ImageBackground, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { eventEmitter, initialMode } from 'react-native-dark-mode';
import styles from './styles';
import { darkThemeColor, lightThemeColor } from '../../utility/AppThemeColor';
import resource from '../../../res';
import { appThemeAction } from '../../redux/actions/AppThemeAction';
import AppUser from '../../utility/AppUser';
import AsyncStorageContaints from '../../utility/AsyncStorageConstants';
import { onUpdateCartBadgeCount } from '../../redux/actions/CartAction';
import { onUpdateWishlistBadgeCount } from '../../redux/actions/WishListAction';

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
    try {
      const userId = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
      if (userId !== null && userId != '') {
        console.log('componentDidMount--->', userId);
        this.props.navigation.replace('DashboardScreen');
        isLoggedIn = true;
      } else {
        this.props.navigation.replace('SigninScreen');
        isLoggedIn = false;
      }
    } catch (error) {
      console.log('Error fetching user id', error);
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
    const { changeView } = this.state;
    return (
      <View style={styles.mainContainer}>
        <Image source={resource.images.splash_background} />
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
