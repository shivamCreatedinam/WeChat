
import React from "react";
import { RNNotificationBanner } from "react-native-notification-banner";
import { Image, Platform, } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";

import resources from '../../res';


export class NotificationBanner {

    static alert(title, message, payload, onClickCallback) {

        // this.notification_payload = payload;
        // // this.dropDown.alertWithType(type, title, message, payload, 0);
        const handleClick = () => {
            onClickCallback(payload)
        };

        const icon = (<Image source={resources.images.icn_pdf}
            style={{ height: 30, width: 30 }}
            resizeMode={"contain"} />);
            showMessage({
                message: title,
                description: message,
                duration: 1000,
                type: "success",
                onPress: handleClick,
                icon: { icon: icon, position: "left" },
            });
        // let notifBannerProps = {};
        // if (Platform.OS == 'android') {
        //     notifBannerProps = {
        //         title: title,
        //         subTitle: message,
        //         withIcon: false,
        //         duration: 1000,
        //         tintColor: "#ef534e",
        //         subTitleColor: '#ffffff',
        //         onClick: handleClick,
        //         titleColor: "#ffffff",
        //         icon: icon
        //     };
        // }
        // else {
        //     notifBannerProps = {
        //         title: title,
        //         subTitle: message,
        //         withIcon: false,
        //         duration: 1000,
        //         tintColor: resources.colors.appColor,
        //         subTitleColor: '#ffffff',
        //         onClick: handleClick,
        //         titleColor: "#ffffff",
        //         // icon: icon
        //     };
        // }

        // RNNotificationBanner.Show(notifBannerProps);

    }


    // static cancel() {
    //     this.dropDown.onCancel();
    // }

}

// then call
// NotifyDropHelper.alert('error', 'Title', 'error message')