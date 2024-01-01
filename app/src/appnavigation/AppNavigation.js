import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splash/SplashScreen';
import SignupScreen from '../screens/signup/SignupScreen';
import SigninScreen from '../screens/signin/SigninScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import OnboardingScreen from '../screens/OnBoarding/index';
import HomeScreen from '../screens/home/HomeScreen';
import AsyncStorage from '@react-native-community/async-storage';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

export const commonStack = () => {
  return (
    <>

    </>
  );
};
export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />

      {commonStack()}
    </Stack.Navigator>
  );
};

export const ProductStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Products"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'Products'} component={ProductPage} />

      {commonStack()}
    </Stack.Navigator>
  );
};

export const WishlistStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="WishlistScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />

      {commonStack()}
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyAccountScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
      {commonStack()}
    </Stack.Navigator>
  );
};

function AppNavigation() {
  const navigationRef = useRef();
  const routeNameRef = useRef();
  let isInitialRoute = '';
  let isRouteValue = true;
  useEffect(() => {
    getInitiatPage();
  }, []);

  const getInitiatPage = async () => {
    const value = await AsyncStorage.getItem('onBoardingScreen');
    if (value == 'true') {
      isRouteValue = false;
    }
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        const trackScreenView = async () => {
          // Your implementation of analytics goes here!

          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        };

        if (previousRouteName !== currentRouteName) {
          // Replace the line below to add the tracker from a mobile analytics SDK
          trackScreenView(currentRouteName);
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator
        initialRouteName={'SigninScreen'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'ChatScreen'} component={ChatScreen} />
        <Stack.Screen name={'OnboardingScreen'} component={OnboardingScreen} />
        <Stack.Screen name={'DashboardScreen'} component={DashboardScreen} />
        <Stack.Screen name={'SigninScreen'} component={SigninScreen} />

        {/* <Stack.Screen
          name={'AutoPaymentScreen'}
          component={AutoPaymentScreen}
        />
        <Stack.Screen
          name={'AutoPaymentNACHScreen'}
          component={AutoPaymentNACHScreen}
        />
        <Stack.Screen name={'MyPaymentScreen'} component={MyPaymentScreen} />
        <Stack.Screen
          name={'EazyPaymentScreen'}
          component={EazyPaymentScreen}
        />
        <Stack.Screen
          name={'EazyPaymentNACHScreen'}
          component={EazyPaymentNACHScreen}
        />
        <Stack.Screen
          name={'MyTransactionCredit'}
          component={MyTransactionCredit}
        />
        <Stack.Screen
          name={'MyTransactionDebit'}
          component={MyTransactionDebit}
        />
        <Stack.Screen
          name={'FrpProductSuggesionScreen'}
          component={FrpProductSuggesionScreen}
        />
        <Stack.Screen name={'CfCoinsScreen'} component={CfCoinsScreen} />
        <Stack.Screen name={'MyAccountScreen'} component={MyAccountScreen} />
        <Stack.Screen
          name={'ProductDetailScreen'}
          component={ProductDetailScreen}
        />
        <Stack.Screen
          name={'ReferralCodeScreen'}
          component={ReferralCodeScreen}
        />
        <Stack.Screen name={'DashboardScreen'} component={DashboardScreen} />
        <Stack.Screen name={'FilterScreen'} component={FilterScreen} />
        <Stack.Screen
          name={'ResetPasswordScreen'}
          component={ResetPasswordScreen}
        />
        <Stack.Screen
          name={'ProfileSettingScreen'}
          component={ProfileSettingScreen}
        />
        <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
        <Stack.Screen name={'SignupScreen'} component={SignupScreen} />
        <Stack.Screen name={'SigninScreen'} component={SigninScreen} />
        <Stack.Screen
          name={'ForgotPasswordScreen'}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name={'FeedbackScreen'} component={FeedbackScreen} />
        <Stack.Screen name={'SortScreen'} component={SortScreen} />
        <Stack.Screen name={'SelectCityScreen'} component={SelectCityScreen} />
        <Stack.Screen name={'OtpScreen'} component={OtpScreen} />
        <Stack.Screen name={'EmailScreen'} component={EmailScreen} />

        <Stack.Screen name={'Products'} component={ProductPage} />
        <Stack.Screen
          name={'FrpCategoryScreen'}
          component={FrpCategoryScreen}
        />
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen
          name={'InAppUpdateScreen'}
          component={InAppUpdateScreen}
        />
        <Stack.Screen name={'WishlistScreen'} component={WishlistScreen} />
        <Stack.Screen name={'CartScreen'} component={CartScreen} />
        <Stack.Screen name={'SearchScreen'} component={SearchScreen} />
        <Stack.Screen name={'AddressScreen'} component={AddressScreen} />
        <Stack.Screen name={'ListAddress'} component={ListAddress} />
        <Stack.Screen name={'AddAddressScreen'} component={AddAddressScreen} />
        <Stack.Screen name={'InvoiceScreen'} component={InvoiceScreen} />
        <Stack.Screen name={'CustomerPayment'} component={CustomerPayment} />
        <Stack.Screen name={'OneTimePayment'} component={OneTimePayment} />
        <Stack.Screen name={'SiOnCredit'} component={SiOnCredit} />
        <Stack.Screen
          name={'EditAddressScreen'}
          component={EditAddressScreen}
        />
        <Stack.Screen
          name={'ManageOrderScreen'}
          component={ManageOrderScreen}
        />
        <Stack.Screen
          name={'ChangePaymentMode'}
          component={ChangePaymentMode}
        />
        <Stack.Screen name={'ThankYouScreen'} component={ThankYouScreen} />
        <Stack.Screen name={'AddCfCoins'} component={AddCfCoins} />
        <Stack.Screen
          name={'OfiiceEnquiryScreen'}
          component={OfiiceEnquiryScreen}
        />
        <Stack.Screen name={'CorporateOrders'} component={CorporateOrders} />
        <Stack.Screen name={'ContactUsScreen'} component={ContactUsScreen} />
        <Stack.Screen
          name={'MyNotificationScreen'}
          component={MyNotificationScreen}
        />
        <Stack.Screen name={'PaymentFailed'} component={PaymentFailed} />
        <Stack.Screen name={'BenefitsScreen'} component={BenefitsScreen} />
        <Stack.Screen name={'OfferScreen'} component={OfferScreen} />
        <Stack.Screen name={'UpFrontScreen'} component={UpFrontScreen} />
        <Stack.Screen
          name={'UpFrontTenureExtension'}
          component={UpFrontTenureExtensionScreen}
        />
        <Stack.Screen
          name={'CityShieldExtension'}
          component={CityShieldExtension}
        />
        <Stack.Screen name={'MyOrder'} component={MyOrder} />
        <Stack.Screen name={'ViewOrder'} component={ViewOrder} />
        <Stack.Screen
          name={'FixedRentalScreen'}
          component={FixedRentalScreen}
        />
        <Stack.Screen name={'HowItWorksScreen'} component={HowItWorksScreen} />
        <Stack.Screen
          name={'TermsAndCondition'}
          component={TermsAndCondition}
        />
        <Stack.Screen
          name={'ReferWithoutLogin'}
          component={ReferWithoutLogin}
        />
        <Stack.Screen
          name={'DocumentationScreen'}
          component={DocumentationScreen}
        />
        <Stack.Screen name={'KycScreen'} component={KycScreen} />
        <Stack.Screen name={'EditKycScreen'} component={EditKycScreen} />
        <Stack.Screen
          name={'MiscellaneousScreen'}
          component={MiscellaneousScreen}
        />
        <Stack.Screen
          name={'OrderSummaryScreen'}
          component={OrderSummaryScreen}
        />
        <Stack.Screen
          name={'PayOutstandingScreen'}
          component={PayOutstandingScreen}
        />
        <Stack.Screen
          name={'MyServiceRequests'}
          component={MyServiceRequests}
        />
        <Stack.Screen
          name={'HowReferCoinsWorksScreen'}
          component={HowReferCoinsWorksScreen}
        />
        <Stack.Screen
          name={'FaqScreenWithHtml'}
          component={FaqScreenWithHtml}
        />
        <Stack.Screen
          name={'EnterDetailsForAppleSignup'}
          component={EnterDetailsForAppleSignup}
        />
        <Stack.Screen
          name={'CongratulationScreen'}
          component={CongratulationScreen}
        />
        <Stack.Screen
          name={'TenureExtensionScreen'}
          component={TenureExtensionScreen}
        />
        <Stack.Screen
          options={{ gestureEnabled: false }}
          name={'OrderComplete'}
          component={OrderComplete}
        />
        <Stack.Screen name={'HelpAndSupport'} component={HelpAndSupport} />
        <Stack.Screen name={'serviceRequest'} component={serviceRequest} /> */}
      </Stack.Navigator>
      {/* <OfflineNotice /> */}
    </NavigationContainer>
  );
}
export default AppNavigation;
