import ApiEndpoints, { FEEDBACK_API, FEEDBACK_URL_API} from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST } from '../../apimanager/RequestMethods'

export const getFeedbackUrlApi = (feedback_url) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                feedback_url: feedback_url
            }
            const Url = ApiEndpoints(FEEDBACK_URL_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                headersOverride: {
                    "Content-Type": "multipart/form-data"
                },
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: FEEDBACK_URL_API,
                data: parameters
            }));
        });
    };


export const hitFeedbackApi = (feedback_response_url, customer_contact_no, rating, message) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                feedback_url: feedback_response_url,
                customer_contact_no: customer_contact_no,
                rating: rating,
                comment: message,
            }
            const Url = ApiEndpoints(FEEDBACK_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                headersOverride: {
                    "Content-Type": "multipart/form-data"
                },
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: FEEDBACK_API,
                data: parameters
            }));
        });
    };

