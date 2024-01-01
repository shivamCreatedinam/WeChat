import ApiEndpoints from '../../apimanager/ApiEndpoint'
import { CHANGE_PASSWORD_API } from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST } from '../../apimanager/RequestMethods'

//POST CHANGE PASSWORD REQUEST
export const hitResetPasswordApi = (email, password, cpassword, opassword) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let parameters = {
                email: email,
                password: password,
                cpassword: cpassword,
            }
            if (opassword != "") {
                parameters.oldpassword = opassword
            }
            const Url = ApiEndpoints(CHANGE_PASSWORD_API)

            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: CHANGE_PASSWORD_API,
                data: parameters
            }));


        });
    };



