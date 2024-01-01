import messaging from '@react-native-firebase/messaging'
import { NotificationBanner } from '../utility/NotificationBanner'
import AppUser from '../utility/AppUser'
import { showMessage, hideMessage } from "react-native-flash-message";
import resources from '../../res';
import { LocalNotification, createChannelNotification } from './LocalPushController'

export const NotificationsConstant = {
    HOME_SCREEN: "0",
    MY_PURCHASE_ORDER_SCREEN: "1",
    MY_SERVICE_REQUEST_LISTING: "2",
    PRODUCT_DETAIL_SCREEN: "3",
    OFFER_SCREEN: "4",
    CART_SCREEN: "5",
    CF_COIN_SCREEN: "6",
    INVOICE_SCREEN: "7",
}

export const NotificationsScreen = [ 
    "Home", "Category", "Wishlist", "Cart", "Search", "ProductDetailScreen", "CfCoinsScreen", "CartScreen", "InvoiceScreen", "CustomerPayment", "ContactUsScreen", 
    "BenefitsScreen", "OfferScreen", "MyOrder", "HowItWorksScreen", "ReferWithoutLogin", "MyServiceRequests", "HowReferCoinsWorksScreen",
    "FaqScreenWithHtml"
]

class FCMServices {
    static fcmHandlerInstance = null;
    isInitialNotifHandled = false;
    static callBack = null

    static getInstance = (callBack) => {
        if (callBack != undefined && callBack != null) {
            this.callBack = callBack
        }
        if (FCMServices.fcmHandlerInstance == null) {
            FCMServices.fcmHandlerInstance = new FCMServices();
        }
        return FCMServices.fcmHandlerInstance;
    }

    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister)
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    }
    //CHECK PERMISSION
    checkPermission = async (onRegister) => {
        messaging().hasPermission()
            .then(enable => {
                if (enable) {
                    this.getTokenForFCM(onRegister)
                } else {
                    this.requestPermission(onRegister)
                }
            }).catch(error => {
                console.log("ERROR inside Fcm", error)
            })
    }
    //REQUEST PERMISSION
    requestPermission = (onRegister) => {
        messaging().requestPermission()
            .then(() => {
                this.getTokenForFCM(onRegister)
            }).catch(err => {
                console.log("Request Permission Rejected", err)
            })
    }
    //REGISTER FOR FCM
    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled()
        }


    }
    //GET TOKEN
    getTokenForFCM = (onRegister) => {

        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    console.log("FCM TOKEN", fcmToken)
                    let obj = AppUser.getInstance()
                    obj.fcmToken = fcmToken
                    onRegister(fcmToken)
                    messaging().getInitialNotification()
                        .then(this.handleInitialNotification, this.handleNotification)

                } else {
                    console.log("User does not have a device token ")
                }
            }).catch(err => {
                console.log("get Token Rejected", err)
            })
    }
    handleNotification = () => {

    }
    handleInitialNotification = (notif) => {
        // if (!notif) { return; }
        if (!this.isInitialNotifHandled) {
            this.handleNotificationClick({ data: notif }, false, false);
        }
        this.isInitialNotifHandled = true;
    };
    //DELETE TOKEN
    deleteToken = () => {
        messaging().deleteToken()
            .catch(err => {
                console.log("Delete token error", err)
            })
    }
    //NOTIFICATION LISTNER
    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {

        //Background App notification
        messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage) {
                // const notification = remoteMessage.notification
                // onOpenNotification(remoteMessage)
                console.log("Background", remoteMessage)
            }
        });
        //when app is open  from quit state
        messaging().getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    // const notification = remoteMessage.notification
                    onOpenNotification(remoteMessage)
                    console.log("Kill", remoteMessage)
                    // let obj = AppUser.getInstance()
                    // obj.notif = remoteMessage
                }
            })
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            if (remoteMessage) {
                // const notification = remoteMessage.notification
                // onOpenNotification(remoteMessage)
                console.log("Background", remoteMessage)
            }
        });
        //Foreground State 
        this.messaginListener = messaging().onMessage(async remoteMessage => {
            console.log('Promotional', JSON.stringify(remoteMessage.data))
            const { title, body } = remoteMessage.notification;
            const { is_promo } = remoteMessage.data;

            if (remoteMessage) {
                console.log('FOREGROUND', title, body, remoteMessage)
                let obj = AppUser.getInstance()
                obj.notif = remoteMessage

                if(is_promo == undefined || is_promo == "undefined") {
                    onNotification(remoteMessage)
                } else {
                    if(is_promo == 1 || is_promo == "1") {
                        const { channelId, ticker, largeIconUrl, bigText, subText, bigPictureUrl, priority, title, message, actions } = remoteMessage.data;
                        console.log('channelId', channelId)
                        createChannelNotification();
                        LocalNotification(channelId, ticker, largeIconUrl, bigText, subText, bigPictureUrl, priority, title, message, actions);
                    } else if(is_promo == 0 || is_promo == "0") {
                        onNotification(remoteMessage)
                    } else {
                        onNotification(remoteMessage)
                    }
                }



            }
        })
        //Triggered when we have new token 
        messaging().onTokenRefresh(fcmToken => {
            onRegister(fcmToken)
        })
    }

    unRegister = () => {
        this.messaginListener()
    }
    //HANDLE BANNER CLICK
    handleNotificationClick = () => {

        if (FCMServices.callBack != null) {
            FCMServices.callBack()
        }
        console.log("On Banner Click")
    }



}
export default FCMServices
// export const fcmServices = new FCMServices()