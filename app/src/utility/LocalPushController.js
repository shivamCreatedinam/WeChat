import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, {Importance} from "react-native-push-notification";

    // Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
        console.log("ACTION:", notification.action);

        // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function(err) {
        console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
});

export const createChannelNotification = () => {
    PushNotification.createChannel(
        {
        channelId: "channel01", // (required)
        channelName: "Cityfurnish", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
}

export const LocalNotification = (channelId, ticker, largeIconUrl, bigText, subText, bigPictureUrl, priority, title, message, actions) => {
    console.log("channelId001",channelId)
    PushNotification.localNotification({
        /* Android Only Properties */
        channelId: channelId ? channelId : "channel01", // (required) channelId, if the channel doesn't exist, notification will not trigger.
        ticker: ticker ? ticker : "Cityfurnish - 📣 Rent Premium Furniture & Branded Home Appliances 📣", // (optional)
        showWhen: true, // (optional) default: true
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
        largeIconUrl: largeIconUrl ? largeIconUrl : "https://cityfurnish.com/images/innerpage-banner.jpg", // (optional) default: undefined
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        bigText: bigText ? bigText : "₹2500 VOUCHER For All New Orders on Registering for Standing Instructions.", // (optional) default: "message" prop
        subText: subText ? subText : "Grab new Epic @ offer Sale", // (optional) default: none
        bigPictureUrl: bigPictureUrl ? bigPictureUrl : "https://cityfurnish.com/images/innerpage-banner.jpg", // (optional) default: undefined
        bigLargeIcon: "ic_launcher", // (optional) default: undefined
        bigLargeIconUrl: "https://cityfurnish.com/images/logo/FaviconNew.png", // (optional) default: undefined
        color: "red", // (optional) default: system default
        priority: priority ? priority : "high", // (optional) set notification priority, default: high
        actions: actions ? actions : [""], // (Android only) See the doc for notification actions to know more
       
        /* iOS and Android properties */
        title: title ? title : "Cityfurnish - 📣 Rent Premium Furniture & Branded Home Appliances 📣", // (optional)
        message: message ? message : "₹2500 VOUCHER For All New Orders on Registering for Standing Instructions.", // (required)
     });
  }

export const LocalAllNotification = (channelId, ticker, largeIconUrl, bigText, subText, bigPictureUrl, priority, title, message, actions) => {
    PushNotification.localNotification({
        /* Android Only Properties */
        channelId: channelId ? channelId : "channel01", // (required) channelId, if the channel doesn't exist, notification will not trigger.
        ticker: ticker ? ticker : "Cityfurnish - 📣 Rent Premium Furniture & Branded Home Appliances 📣", // (optional)
        showWhen: true, // (optional) default: true
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
        largeIconUrl: largeIconUrl ? largeIconUrl : "https://cityfurnish.com/images/innerpage-banner.jpg", // (optional) default: undefined
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        bigText: bigText ? bigText : "₹2500 VOUCHER For All New Orders on Registering for Standing Instructions.", // (optional) default: "message" prop
        subText: subText ? subText : "Grab new Epic @ offer Sale", // (optional) default: none
        bigPictureUrl: bigPictureUrl ? bigPictureUrl : "https://cityfurnish.com/images/innerpage-banner.jpg", // (optional) default: undefined
        bigLargeIcon: "ic_launcher", // (optional) default: undefined
        bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
        color: "red", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        group: "group", // (optional) add group to message
        groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: priority ? priority : "high", // (optional) set notification priority, default: high
        visibility: "private", // (optional) set notification visibility, default: private
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
        shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
        onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
        
        actions: actions ? actions : ["Explore Now"], // (Android only) See the doc for notification actions to know more
        invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
    
        /* iOS only properties */
        category: "", // (optional) default: empty string
    
        /* iOS and Android properties */
        id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        type: 1,
        title: title ? title : "Cityfurnish - 📣 Rent Premium Furniture & Branded Home Appliances 📣", // (optional)
        message: message ? message : "₹2500 VOUCHER For All New Orders on Registering for Standing Instructions.", // (required)
        userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        // repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    });
}