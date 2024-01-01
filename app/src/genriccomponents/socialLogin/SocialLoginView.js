import React from "react"
import { View, Image, TouchableOpacity, StyleSheet } from "react-native"
import resources from "../../../res";
import { widthScale, heightScale } from "../../utility/Utils"

/**
 * @function
 * 
 * This is a functional component to render a Social Login view.
 * @param {Object} props
 * @returns {XML} view.
 */
function SocialLoginView(props) {
    const { onClickFbLogin, onClickGoogleLogin, onClickLinkedinLogin, customStyle } = props;
    return (
        <View style={[styles.viewHorizontal, styles.parentView, customStyle ? customStyle : {}]}>
            <TouchableOpacity onPress={onClickLinkedinLogin}>
                <Image style={styles.imgStyle} resizeMode={"contain"}
                source={resources.images.img_linkedin} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewMiddleImage} resizeMode={"contain"}
             onPress={onClickGoogleLogin}>
                <Image style={styles.imgStyle} source={resources.images.img_google} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClickFbLogin}>
                <Image style={styles.imgStyle} resizeMode={"contain"}
                source={resources.images.img_fb} />
            </TouchableOpacity>
        </View>
    );
}


export default SocialLoginView;


const styles = StyleSheet.create({
    parentView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: heightScale(20),
    },
    viewHorizontal: {
        flexDirection: 'row'
    },
    viewMiddleImage: {
        marginHorizontal: widthScale(25)
    },
    imgStyle: {
        height: 40,
        width: 40,
    }
});

