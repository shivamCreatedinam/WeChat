import React from "react"
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import PropTypes from "prop-types"
import styles from "./styles"
import resources from "../../../res"


/**
 * @function
 * 
 * This is a functional component to render a text imput with label on top.
 * @param {Object} props
 * @returns {XML} view.
 */
function Input(props) {
    const { label, onChangeText, value, error, inputStyles, errStyle,
        labelStyles, containerStyle, inputProps, onBackKeyPress,
        isPasswordEyeVisible, isPassVisible, onPressEyeIcon, onPressGetOtp
        , isGetOtpTextVisible, onSubmitEditing, reference,
        isVerified, isVerifedTextVisible,
        onPressVerify, } = props;

    return (
        <View>
            <View style={[styles.topView, containerStyle]}>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={[styles.textStyle, labelStyles]}>{label ? label : ""}</Text>
                    {
                        checkAndGetVerifiedText(isVerifedTextVisible, isVerified)
                    }

                </View>
                <View style={styles.layoutHorizontal}>
                    <TextInput style={[styles.textInputStyle, inputStyles]}
                        autoCaptialize={'none'}
                        ref={reference}
                        autoCorrect={false}
                        autoFocus={false}
                        underlineColorAndroid={"transparent"}
                        onChangeText={onChangeText ? onChangeText : () => { }}
                        value={value}
                        {...inputProps}
                        onSubmitEditing={onSubmitEditing ? onSubmitEditing : () => { }}
                    />
                    {isPasswordEyeVisible ?
                        <TouchableOpacity style={[styles.borderBottom]} onPress={onPressEyeIcon ? onPressEyeIcon : {}}>
                            <Image source={isPassVisible ? resources.images.icn_hide_password : resources.images.icn_show_password} />
                        </TouchableOpacity> :
                        <View />
                    }
                    {isGetOtpTextVisible ?
                        <TouchableOpacity style={[styles.borderBottom]} onPress={onPressGetOtp ? onPressGetOtp : {}}>
                            <Text style={styles.txtGetOTP}>{resources.strings.GET_OTP}</Text>
                        </TouchableOpacity> :
                        <View />
                    }
                   
                    {checkAndGetVerifiedButton(isVerifedTextVisible, isVerified,onPressVerify)}
                </View>

            </View>
            {error ? (
                <Text
                    style={[styles.errorText, errStyle]}
                    numberOfLines={1}
                    ellipsizeMode={'middle'}>
                    {error}
                </Text>
            ) : (<View style={{ height: 10 }} />)}
        </View>

    );
}

function checkAndGetVerifiedText(isVerifedTextVisible, isVerified) {
    if (!isVerifedTextVisible) {
        return (<View />)
    }
    if (isVerified) {
        return (<Text style={[styles.verifiedTextStyle]}>{resources.strings.VERIFIED}</Text>)
    } else {
        return (<Text style={[styles.notVerifiedTextStyle]}>{resources.strings.NOT_VERIFIED}</Text>)
    }
}
function checkAndGetVerifiedButton(isVerifedTextVisible, isVerified,onPressVerify) {
    if (!isVerifedTextVisible) {
        return (<View />)
    }
    if (!isVerified) {
        return (
            < TouchableOpacity style={[styles.borderBottom]} onPress={onPressVerify ? onPressVerify : {}}>
                <Text style={styles.txtGetOTP}>{resources.strings.VERIFY}</Text>
            </TouchableOpacity>
        )
    } else {
        return (<View />)
    }
}
export default Input;


Input.propTypes = {
    label: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

Input.defaultProps = {
    inputStyles: {},
    labelStyles: {},
    containerStyle: {},
    label: " "
};