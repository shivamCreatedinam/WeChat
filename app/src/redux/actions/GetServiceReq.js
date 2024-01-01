import ApiEndpoints, { GET_SERVICE_REQUEST_TYPE_DATA } from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import AppUser from "../../utility/AppUser"
import { POST } from '../../apimanager/RequestMethods'



export const hitServiceTypeApi = (orderId) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const parameters = {
                order_id: Number(orderId),
                user_id: Number(Userid),

            }
            const Url = ApiEndpoints(GET_SERVICE_REQUEST_TYPE_DATA)
            console.log('API Request URL:', Url);
            console.log('API Request Headers:', {
                "Content-Type": "multipart/form-data",
                "authtoken": String(token),
                "userid": Number(Userid),
            });
            console.log('API Request Body:', parameters);
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                headersOverride: {
                    "Content-Type": "multipart/form-data",
                    "authtoken": token,
                    "userid": Number(Userid)
                },
                onSuccess: async (data) => {
                    console.log("data", data)
                    resolve((data));
                },
                onFailure: (error) => {
                    console.log("err", (JSON.stringify(error)))
                    reject(error)
                },
                label: GET_SERVICE_REQUEST_TYPE_DATA,
                data: parameters
            }));



        });
    };








