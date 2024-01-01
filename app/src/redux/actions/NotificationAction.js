import ApiEndpoints, {
    USER_NOTIFICATION_API
} from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST } from '../../apimanager/RequestMethods'
import AppUser from "../../utility/AppUser"

export const getMyAllNotificationApi = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let fcmToken = appUser.fcmToken
            let Userid = appUser.userId
            const parameters = {
                token: fcmToken,
                user_id: Userid
            }
            const Url = ApiEndpoints(USER_NOTIFICATION_API)
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
                label: USER_NOTIFICATION_API,
                data: parameters
            }));
        });
    };