import ApiEndpoints from '../../apimanager/ApiEndpoint'
import { SIGNUP_API } from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST, GET } from '../../apimanager/RequestMethods'


//POST SIGNUP REQUEST
export const hitUserSignupApi = (name, emailId, mobileNumber, pass, reffer, isMobileVerified) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {

            const parameters = {
                full_name: name,
                email: emailId,
                mobile_number: mobileNumber,
                password: pass,
                referral_code: reffer,
                is_mobile_verified: isMobileVerified,
            }
            const Url = ApiEndpoints(SIGNUP_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: SIGNUP_API,
                data: parameters
            }));


        });
    };

