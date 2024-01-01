import ApiEndpoints from '../../apimanager/ApiEndpoint'
import { SEND_OTP_API, VERIFY_OTP_ONLY_API, VERIFY_EMAIL_API } from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST } from '../../apimanager/RequestMethods'
import {
    VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE
} from '../Type'

import AppUser from '../../utility/AppUser'


export const onVerifyOtpSuccessAction = (data) => {
    return {
        type: VERIFY_OTP_SUCCESS,
        payload: data
    }
}


export const onVerifyOtpFailureAction = (data) => {
    return {
        type: VERIFY_OTP_FAILURE,
        payload: data
    }
}


//POST SEND OTP  REQUEST
export const hitSendOtpApi = (mobileNumber, isLoginType, isSignupType) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            let smsHashh = appUser.smsHash

            let parameters = { mobile_number: mobileNumber }
            if (isLoginType) {
                parameters.isLogin = isLoginType
            }
            if (isSignupType) {
                parameters.isSignup = isSignupType
            }
            if (smsHashh) {
                parameters.hash_value = smsHashh[0]
            }
            const Url = ApiEndpoints(SEND_OTP_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: SEND_OTP_API,
                data: parameters,
                headersOverride: token ?
                    {
                        "Content-Type": "multipart/form-data",
                        "authtoken": token,
                        "userid": Userid
                    } :
                    { "Cache-Control": "no-cache" }

            }));


        });
    };


//POST SEND VERIFY OTP  REQUEST
export const hitVerifyOtpApi = (mobileNumber, otp) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId

            const parameters = {
                mobile_number: mobileNumber,
                otp: otp
            }
            const Url = ApiEndpoints(VERIFY_OTP_ONLY_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: VERIFY_OTP_ONLY_API,
                data: parameters,
                headersOverride: token ?
                    {
                        "Content-Type": "multipart/form-data",
                        "authtoken": token,
                        "userid": Userid
                    } :
                    { "Cache-Control": "no-cache" }
            }));


        });
    };

export const hitSendOtpOnEmailApi = (emailID) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                email: emailID
            }
            const Url = ApiEndpoints(VERIFY_EMAIL_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: VERIFY_EMAIL_API,
                data: parameters
            }));


        });
    };


export const hitVerifyEmailWithOtpApi = (emailID, OTP) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                email: emailID,
                otp: OTP
            }
            const Url = ApiEndpoints(VERIFY_EMAIL_API)

            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: VERIFY_EMAIL_API,
                data: parameters
            }));


        });
    };

