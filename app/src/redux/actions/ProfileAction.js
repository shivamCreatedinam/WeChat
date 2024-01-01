import ApiEndpoints from '../../apimanager/ApiEndpoint'
import { UPDATE_PROFILE_API, GET_USER_PROFILE_API, VERIFY_EMAIL_API, SEND_OTP_API } from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import AppUser from "../../utility/AppUser"
import { POST, GET } from '../../apimanager/RequestMethods'

import {

} from '../Type'


export const hitUpdateProfileApi = (full_name, mobile_number) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId

            const parameters = {
                full_name: full_name,
                mobile_number: mobile_number,
            }
            const Url = ApiEndpoints(UPDATE_PROFILE_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                headersOverride: {
                    "Content-Type": "multipart/form-data",
                    "authtoken": token,
                    "userid": Userid

                },
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: UPDATE_PROFILE_API,
                data: parameters
            }));


        });
    };


export const hitGetOtpApi = (mobileNumber) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId

            const parameters = {
                mobileNumber: mobileNumber,
            }
            const Url = ApiEndpoints(SEND_OTP_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: GET,
                headersOverride: {
                    "Content-Type": "multipart/form-data",
                    "authtoken": token,
                    "userid": Userid
                },
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: SEND_OTP_API,
                data: parameters
            }));


        });
    };

export const hitVerifyEmailApi = (email) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId

            const parameters = {
                email: email,
            }
            const Url = ApiEndpoints(VERIFY_EMAIL_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                headersOverride: {
                    "Content-Type": "multipart/form-data",
                    "authtoken": token,
                    "userid": Userid
                },
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



export const hitGetProfileApi = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const parameters = {
                // mobile_number: mobileNumber,
            }
            const Url = ApiEndpoints(GET_USER_PROFILE_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: GET,
                headersOverride: {
                    "Content-Type": "multipart/form-data",
                    "authtoken": token,
                    "userid": Userid
                },
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: GET_USER_PROFILE_API,
                data: parameters
            }));


        });
    };