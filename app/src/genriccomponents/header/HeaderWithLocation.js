import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {statusBarHeight, widthScale} from '../../utility/Utils';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  NativeModules,
} from 'react-native';
import res from '../../../res';
import {Badge} from 'native-base';
import resources from '../../../res';
import {CartIconWithBadge} from '../badge/CartBadge';
import {isPlatformIOS} from '../../utility/Utils';
import AsyncStorage from '@react-native-community/async-storage';

const HeaderWithLocation = props => {
  const {
    isBackIconVisible,
    customStyle,
    appLogoVisible,
    styleHeaderContainer,
    statusBarColor,
    headerColor,
    isLogoutVisible,
    navigateProps,
    onClickLogout,
    isProfileIconVisible,
    onClickLocation,
    isSearch,
  } = props;

  const searchVisible = isSearch || false;

  const [homePageData, setHomePageData] = useState([]);

  useEffect(() => {
    fetchHomePageData();
  }, []);

  const fetchHomePageData = async () => {
    try {
      AsyncStorage.getItem('HomePageData').then(data => {
        let dataSet = JSON.parse(data);
        setHomePageData(dataSet);
      });
    } catch (err) {
      console.log(err);
    }

    // if (value !== null) {
    //   let dataSet = JSON.parse(value);
    //   setHomePageData(dataSet);
    // }
  };

  const renderBackIcon = () => {
    if (isBackIconVisible) {
      return (
        <TouchableOpacity
          onPress={props.onBackClick}
          style={styles.backBtnCont}
          hitSlop={{top: 10, left: 20, right: 20, bottom: 10}}>
          <Image
            style={styles.backIconStyle}
            source={res.images.icn_back}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      );
    }
  };
  const renderAppLogo = () => {
    if (appLogoVisible) {
      return (
        <TouchableOpacity
          onPress={props.onAppLogoClick}
          style={[styles.backBtnCont]}
          hitSlop={{top: 10, left: 20, right: 20, bottom: 10}}>
          <Image
            style={styles.backIconStyle}
            source={res.images.inc_appLogo_header}
            resizeMode={'contain'}
            width={70}
          />
        </TouchableOpacity>
      );
    }
  };
  const renderLogoutText = () => {
    if (isLogoutVisible) {
      return (
        <TouchableOpacity
          onPress={onClickLogout}
          style={styles.logoutBtnCont}
          hitSlop={{top: 10, left: 20, right: 20, bottom: 10}}>
          <Image source={res.images.icn_logout} resizeMode={'contain'} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      );
    }
  };
  const renderLeftEmptyViewToBalanceFlex = () => {
    if (!isBackIconVisible && !appLogoVisible) {
      return <View style={{width: 20, height: 20}} />;
    }
  };
  const renderRightEmptyViewToBalanceFlex = () => {
    return <View style={{width: 40, height: 20}} />;
  };

  return (
    <View style={styleHeaderContainer ? styleHeaderContainer : {}}>
      {isPlatformIOS ? null : (
        <MyStatusBar
          backgroundColor={
            statusBarColor ? statusBarColor : res.colors.appColor
          }
          barStyle="dark-content"
        />
      )}

      <View style={[styles.headerContainer, headerColor]}>
        {/* {renderBackIcon()} */}
        {/* {renderAppLogo()} */}
        {renderLeftEmptyViewToBalanceFlex()}
        <TouchableOpacity
          onPress={() => onClickLocation()}
          style={{flexDirection: 'row'}}>
          <View style={{justifyContent: 'center'}}>
            <Image
              style={{width: 18, height: 18}}
              source={require('../../../res/images/Image/location.png')}
            />
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {props.headerTitle}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {isSearch ? (
            <TouchableOpacity
              onPress={() =>
                props.navigateProps.push('SearchScreen', {data: homePageData})
              }
              style={{marginRight: 15}}>
              <Image
                style={{height: 24, width: 24}}
                source={resources.images.icn_searchPage}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => props.navigateProps.push('CartScreen')}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../../../res/images/Image/cart.png')}
            />
            <View style={{position: 'absolute', top: -10}}>
              <CartIconWithBadge />
            </View>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.titleView}>
          <Text style={styles.txtYourLocation}>Your Location</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={onClickLocation}>
            <Image
              style={styles.navigationIconStyle}
              source={res.images.navigation_icn}
              resizeMode={'contain'}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[styles.textHeaderStyle, customStyle ? customStyle : {}]}>
              {props.headerTitle}
            </Text>
            <Image
              style={styles.downlwardArrowIconStyle}
              source={res.images.inc_right_arrow}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View> */}
        {/* {!isLogoutVisible ? (
          isProfileIconVisible ? (
            <TouchableOpacity
              onPress={() => {
                navigateProps.navigate('MyAccountScreen');
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={res.images.img_avtar} style={styles.avtarStyle} />
              <Image source={res.images.icn_menu} />
            </TouchableOpacity>
          ) : (
            renderRightEmptyViewToBalanceFlex()
          )
        ) : (
          renderLogoutText()
        )} */}
      </View>
    </View>
  );
};

export const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={'white'} {...props} />
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: res.colors.white,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 1,
    borderWidth: 0,
  },
  backIconStyle: {
    justifyContent: 'flex-start',
    tintColor: res.colors.white,
  },
  titleView: {
    borderWidth: 0,
    marginLeft: 20,
  },
  txtYourLocation: {
    // flex: 1,
    borderWidth: 0,
    color: res.colors.black,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: res.fonts.regular,
  },
  textHeaderStyle: {
    // flex: 1,
    borderWidth: 0,
    color: res.colors.white,
    fontSize: 16,
    fontFamily: res.fonts.regular,
    marginHorizontal: 4,
  },
  textRightOptionStyle: {
    borderWidth: 0,
    color: res.colors.white,
    textAlign: 'center',
    fontSize: 16,
  },
  backBtnCont: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  navigationCont: {
    alignSelf: 'center',
    marginRight: widthScale(9),
  },
  statusBar: {
    height: statusBarHeight,
  },
  resetStyle: {
    justifyContent: 'flex-start',
    color: res.colors.blueText,
    fontSize: widthScale(16),
  },
  resetCont: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossIconStyle: {
    justifyContent: 'flex-start',
    width: widthScale(19),
    height: widthScale(19),
  },
  navigationIconStyle: {
    width: 12,
    height: 14,
    tintColor: 'white',
  },
  downlwardArrowIconStyle: {
    width: 10,
    height: 13,
    borderWidth: 0,
    tintColor: 'white',
    transform: [{rotate: '90deg'}],
  },
  avtarStyle: {
    height: 30,
    width: 30,
    marginRight: widthScale(4),
    backgroundColor: res.colors.white,
    borderRadius: 30,
  },
  logoutText: {
    fontFamily: res.fonts.bold,
    fontSize: 12,
    color: res.colors.white,
    marginLeft: 5,
  },
  logoutBtnCont: {
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

HeaderWithLocation.propTypes = {
  isBackIconVisible: PropTypes.bool,
  isProfileIconVisible: PropTypes.bool,
  isLogoutVisible: PropTypes.bool,
};

HeaderWithLocation.defaultProps = {
  isBackIconVisible: true,
  isProfileIconVisible: true,
  isLogoutVisible: false,
};

export default HeaderWithLocation;
