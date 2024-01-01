import React, {Component} from 'react';
import {Image, Linking} from 'react-native';
import resources from '../../../res';
import * as actions from '../../redux/actions/SelectCityAction';
import {connect} from 'react-redux';
import APILoadingHOC from '../../genriccomponents/HOCS/APILoadingHOC';
import {
  isiPhoneX,
  isPlatformIOS,
  checkIfUserIsLoggedIn,
  showSigninAlert,
  getProductIdFromUrl,
  getNavigateUrlCode,
  getCustomerFeedbackUrl,
  getCustomerPaymentParameters,
  logOnConsole,
} from '../../utility/Utils';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import {
  updateFcmTokenToServer,
  updateContactToServer,
} from '../../redux/actions/LogoutAction';
import {
  checkForAppUpdates,
  getCustomerPaymentUrl,
} from '../../redux/actions/HomeAction';

// import { ZohoSalesIQ } from 'react-native-zohosalesiq-mobilisten';

const Android_App_key =
  'BPK2YzzsJV8SqWcFenYpM3LiMt24mmp8iGMQHvfzyVgB8KSyE9w3q%2BppGWAU3Jd5Mq%2FjiKuw2v1lGn4j1pA4dA%3D%3D';
const android_access_key =
  'BiwZs%2F4HDO%2F6aHAaeCXX1Nljv9XCGoPmyx722%2Fylia%2FvVCCUIz8vDT5AkJW0RJME0PoUhBti0fdor7GzE8bLJhkeslO9obuAaGjxRcAZob9XOpx3gJzCax2RYRRDmlMaSYBv7afMKracv9lQtwghLRPCANC9LnQa';
const ios_app_key =
  'BPK2YzzsJV8SqWcFenYpM3LiMt24mmp8iGMQHvfzyVgB8KSyE9w3q%2BppGWAU3Jd5Mq%2FjiKuw2v1lGn4j1pA4dA%3D%3D';
const ios_access_key =
  'BiwZs%2F4HDO%2F6aHAaeCXX1Nljv9XCGoPmyx722%2Fylia%2FvVCCUIz8vDT5AkJW0RJME%2B73IDl9r0FLEeJ2VnwpICh%2Bv5uLJ8A%2BP8Ntn8PciS2BXOpx3gJzCax2RYRRDmlMaSYBv7afMKracv9lQtwghLRPCANC9LnQa';

import FCMServices from '../../utility/FCMServices';
import {NotificationsScreen} from '../../utility/FCMServices';
import {WishlistIconWithBadge} from '../../genriccomponents/badge/CartBadge';
import AppToast from '../../genriccomponents/appToast/AppToast';
import ProductPage from '../../genriccomponents/subCategory/category/Product';
import {
  HomeStack,
  ProductStack,
  ProfileStack,
} from '../../appnavigation/AppNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorageContaints from '../../utility/AsyncStorageConstants';
import {CommonActions} from '@react-navigation/native';
import WishListScreen from '../wishList/WishlistScreen';
const MessageStack = createStackNavigator();

const Tab = createBottomTabNavigator();

class DashboardScreen extends Component {
  static ROUTE_NAME = 'DashboardScreen';
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  getInitialURLAndRedirectAccordingly = async () => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        if (url) {
          // this.props.navigation.navigate('CustomerPayment');

          this.navigateToDeepLink(url);
        }
      });
    }
    Linking.addEventListener('url', this.handleOpenURL);
  };
  handleOpenURL = event => {
    this.navigateToDeepLink(event.url);
  };
  navigateToDeepLink = async url => {
    let urlArr = url.split('/');
    logOnConsole('urlarray====', urlArr);
    if (url) {
      let id = getProductIdFromUrl(url);
      let new_navigate_url = url.split('/')[3];
      if (
        id &&
        new_navigate_url !== 'upfront_tenure_extension' &&
        new_navigate_url !== 'city_shield'
      ) {
        this.props.navigation.navigate('ProductDetailScreen', {
          productId: id,
        });
        console.log(new_navigate_url, 'new');
      } else {
        let navigate_url = url.split('/')[3];
        if (navigate_url === 'upfront_tenure_extension') {
          this.props.navigation.navigate('TenureExtensionScreen', {id});
        } else if (navigate_url === 'city_shield') {
          this.props.navigation.navigate('CityShieldExtension', {id});
        } else if (navigate_url === 'customerpayment') {
          let code = getNavigateUrlCode('q', url);
          this.customerPaymentRedirect(url, code);
        } else if (navigate_url === 'purchases') {
          this.props.navigation.navigate('MyOrder');
        } else if (navigate_url === 'auto-pay' || navigate_url === 'autopay') {
          this.props.navigation.navigate('EazyPaymentScreen');
        } else if (navigate_url === 'documentation') {
          this.props.navigation.navigate('DocumentationScreen');
        } else {
          navigate_url = getCustomerFeedbackUrl(url);
          let urlArr = url.split('/');
          if (navigate_url === 'fb' || navigate_url === 'feedback') {
            this.props.navigation.navigate('FeedbackScreen', {
              feedbackURL: url,
            });
          }
          if (url.includes('terms-of-use') || url.includes('privacy-policy')) {
            this.props.navigation.navigate('MiscellaneousScreen', {
              title:
                urlArr[4] === 'privacy-policy'
                  ? 'Privacy Policy'
                  : 'Terms and Condition',
              key: urlArr[4],
            });
          }
        }
      }
    }
  };

  customerPaymentRedirect = async (url, code) => {
    try {
      this.props
        .getCustomerPaymentUrl(code)
        .then(async resp => {
          let paramsData = getCustomerPaymentParameters(
            resp.full_url && resp.full_url != null ? resp.full_url : url,
          );
          for (var key of Object.keys(paramsData)) {
            'email' in paramsData
              ? await AsyncStorage.setItem(
                  '@CUSTOMER_EMAIL',
                  paramsData['email'],
                )
              : '';
            'invoice_number' in paramsData
              ? await AsyncStorage.setItem(
                  '@CUSTOMER_INVOICE_NUMBER',
                  paramsData['invoice_number'],
                )
              : '';
            'amount' in paramsData
              ? await AsyncStorage.setItem(
                  '@CUSTOMER_AMOUNT',
                  paramsData['amount'],
                )
              : '';
            'name' in paramsData
              ? await AsyncStorage.setItem('@CUSTOMER_NAME', paramsData['name'])
              : '';
            'customer_id' in paramsData
              ? await AsyncStorage.setItem(
                  '@CUSTOMER_CUSTOMER_ID',
                  paramsData['customer_id'],
                )
              : '';
            console.log(key + ' => ' + paramsData[key]);
          }
        })
        .catch(err => {
          console.log('Error while customer payment', err);
        });
    } catch (err) {
      console.log('Getting Error to fetch URL', err);
    } finally {
      this.props.navigation.navigate('CustomerPayment', {
        fromRoute: 'DashboardScreen',
      });
    }
  };

  checkForLoggedIn = async () => {
    const userId = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
    if (userId === null || userId === '') {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{name: 'SigninScreen'}],
      });
      this.props.navigation.dispatch(resetAction);
    }
  };

  componentDidMount() {
    this.getInitialURLAndRedirectAccordingly();
    let obj = FCMServices.getInstance(this.FCMServiceCallback);
    obj.register(this.onRegister, this.onNotification, this.onOpenNotification);

  }

  updateFCMToken = fcmToken => {
    this.props
      .updateFcmTokenToServer(fcmToken)
      .then(resp => {
        console.log(resp.message);
      })
      .catch(err => {
        AppToast(err);
        console.log('Error while updating FCM token', err);
      });
  };
  onRegister = fcmToken => {
    if (checkIfUserIsLoggedIn()) {
      this.updateFCMToken(fcmToken);
    }
  };
  onNotification = notification => {
    //FOREGROUND  Notification
    // console.log("FCM  onNotification", notification)

    // comment on 7 Jun in trigger automatically
    this.handleNotificationsClick(notification);
  };
  onOpenNotification = notification => {
    //Background Notification
    // console.log("FCM  onOpenNotification", notification)

    this.handleNotificationsClick(notification);
  };

  MessageStackScreen() {
    return (
      <MessageStack.Navigator>
        <MessageStack.Screen
          name={'ProductPage'}
          component={ProductPage}
          options={{headerShown: false}}
        />
        {/* <MessageStack.Screen
        name={"Products"}
        component={CategoryScreen}
        options={{headerShown: false}}
      /> */}

        {/* <MessageStack.Screen name={"FrpCategoryScreen"} component={FrpCategoryScreen} /> */}
      </MessageStack.Navigator>
    );
  }

  render() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? resources.images.icn_home_selected
                : resources.images.icn_home;
            } else if (route.name === 'Calls') {
              iconName = focused
                ? resources.images.icn_category_select
                : resources.images.icn_category;
            } else if (route.name === 'Search') {
              iconName = focused
                ? resources.images.icn_search_Selected
                : resources.images.icn_search;
            } else if (route.name === 'Favorite') {
              return (
                <WishlistIconWithBadge
                  name={
                    focused
                      ? resources.images.icn_wishlist_Select
                      : resources.images.icn_wishlist
                  }
                  tintColor={color}
                />
              );
            } else if (route.name === 'Profile') {
              iconName = focused
                ? resources.images.icn_profile_setting
                : resources.images.icn_profile_setting;
            }
            return (
              <Image
                source={iconName}
                resizeMode={'contain'}
                style={{
                  width: isPlatformIOS ? 25 : 25,
                  height: isPlatformIOS ? 25 : 25,
                  borderWidth: 0,
                  tintColor: color,
                }}
              />
            );
          },
        })}
        tabBarOptions={{
          style: {height: isiPhoneX ? 85 : 57, paddingVertical: 5},
          tabStyle: {height: isiPhoneX ? 55 : 45, backgroundColor: 'white'},
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
          labelStyle: {fontFamily: resources.fonts.medium, fontSize: 12},
        }}>
        <Tab.Screen
          name="Home"
          listeners={({navigation, route}) => ({
            tabPress: e => {
              navigation.navigate('Home');
              // Do something with the `navigation` object
              //navigation.navigate('AnotherPlace');
              checkForAppUpdates();
             
            },
          })}
          component={HomeStack}
        />
        {/* <Tab.Screen name="Products" component={CategoryScreen} /> */}
        <Tab.Screen
          name="Calls"
          component={ProductStack}
          listeners={({navigation, route}) => ({
         
          })}
        />
        {/* <Tab.Screen name="Search" component={SearchScreen} /> */}
        <Tab.Screen
          name="Favorite"
          component={WishListScreen}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              if (!checkIfUserIsLoggedIn()) {
                // Prevent default action
                e.preventDefault();
                showSigninAlert('Wishlist');
              }
              // Do something with the `navigation` object
              //navigation.navigate('AnotherPlace');
            },
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          listeners={({navigation, route}) => ({
          
          })}
        />
      </Tab.Navigator>
    );
  }

  checkUpdatesFromPushNotification = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
        this.props.navigation.navigate('Home');
      }
    });
  };

  handleNotificationsClick = notification => {
    if (!notification.data) {
      return;
    }
    console.log('Bipass', notification.data);
    let type = notification.data.type;
    let screen_name = notification.data.screen_name;
    if (type == 1 || type == '1') {
      let screen_url = '';
      if (screen_name === 'UpdateApp') {
        if (isPlatformIOS) {
          screen_url = 'https://apps.apple.com/us/app/cityfurnish/id1526271477';
          this.checkUpdatesFromPushNotification(screen_url);
        } else {
          screen_url = 'market://details?id=com.cityfurnish';
          this.checkUpdatesFromPushNotification(screen_url);
        }
      } else {
        screen_url = notification.data.screen_url;
        this.checkUpdatesFromPushNotification(screen_url);
      }
    } else if (
      (type == 0 || type == '0') &&
      NotificationsScreen.includes(screen_name)
    ) {
      if (
        'product_id' in notification.data &&
        notification.data.product_id !== ''
      ) {
        let id = notification.data.product_id;
        this.props.navigation.navigate(screen_name, {productId: id});
      } else {
        this.props.navigation.navigate(screen_name);
      }
    } else {
      this.props.navigation.navigate('Home');
    }
    // switch (type) {
    //     case NotificationsConstant.HOME_SCREEN:

    //         break;
    //     case NotificationsConstant.MY_PURCHASE_ORDER_SCREEN:
    //         this.props.navigation.navigate("MyOrder")
    //         break;
    //     case NotificationsConstant.MY_SERVICE_REQUEST_LISTING:
    //         this.props.navigation.navigate("MyServiceRequests")
    //         break;
    //     case NotificationsConstant.PRODUCT_DETAIL_SCREEN:
    //         let id = notification.data.product_id
    //         this.props.navigation.navigate("ProductDetailScreen",
    //             { productId: id })
    //         break;
    //     case NotificationsConstant.OFFER_SCREEN:
    //         this.props.navigation.navigate("OfferScreen")
    //         break;
    //     case NotificationsConstant.CART_SCREEN:
    //         this.props.navigation.navigate("Cart")
    //         break;
    //     case NotificationsConstant.CF_COIN_SCREEN:
    //         this.props.navigation.navigate("CfCoinsScreen")
    //         break;
    //     case NotificationsConstant.INVOICE_SCREEN:
    //         this.props.navigation.navigate("InvoiceScreen")
    //         break;
    //     default:
    //         console.log("Unknown screen type", type)
    // }
  };
}
const mapStateToProps = state => {
  return {};
};
let container = connect(
  mapStateToProps,
  {
    ...actions,
    updateFcmTokenToServer,
    updateContactToServer,
    checkForAppUpdates,
    getCustomerPaymentUrl,
  },
)(DashboardScreen);
let loader = APILoadingHOC(container);

loader.getIntent = () => {
  return {
    routeName: DashboardScreen.ROUTE_NAME,
  };
};

export default loader;
