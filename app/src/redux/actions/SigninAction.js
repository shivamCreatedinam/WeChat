import ApiEndpoints from '../../apimanager/ApiEndpoint'
import { LOGIN_API, SEND_OTP_API, VERIFY_OTP_AND_LOGIN_API,GET_APPLE_LOGIN_RESPONSE_API } from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST } from '../../apimanager/RequestMethods'


//POST LOGIN REQUEST
export const hitUserLoginApi = (emailId, userPass) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {

            // const data = new FormData();
            // data.append('name', 'raphael');
            const parameters = {
                email: emailId,
                password: userPass
            }
            const Url = ApiEndpoints(LOGIN_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: LOGIN_API,
                data: parameters
            }));


        });
    };


//POST GET OTP REQUEST
export const hitGetOtpApi = (mobileNumber) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                mobile_number: mobileNumber
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
                data: parameters
            }));


        });
    };


//POST VERIFY_OTP_AND_LOGIN REQUEST
export const hitVerifyAndLoginApi = (mobileNumber, OTP) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                mobile_number: mobileNumber,
                otp: OTP
            }
            const Url = ApiEndpoints(VERIFY_OTP_AND_LOGIN_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: VERIFY_OTP_AND_LOGIN_API,
                data: parameters
            }));


        });
    };


export const hitAppleLoginResponseApi = (response) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                apple_data: JSON.stringify(response),
            }
            const Url = ApiEndpoints(GET_APPLE_LOGIN_RESPONSE_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: GET_APPLE_LOGIN_RESPONSE_API,
                data: parameters
            }));


        });
    };



