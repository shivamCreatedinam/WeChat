import ApiEndpoints from '../../apimanager/ApiEndpoint'
import { CORPORATE_ORDER_API, CORPORATE_ORDER_DETAILS_API } from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST, GET } from '../../apimanager/RequestMethods'
export const hitCorporateOrderApi = (full_name, email, mobile_number, quantity, city, message) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                full_name: full_name,
                email: email,
                mobile_number: mobile_number,
                quantity: quantity,
                city: city,
                message: message
            }
            const Url = ApiEndpoints(CORPORATE_ORDER_API)

            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,

                onSuccess: async (data) => {

                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: CORPORATE_ORDER_API,
                data: parameters
            }));


        });
    };

export const hitCorporateOrderDetailsApi = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {

            const Url = ApiEndpoints(CORPORATE_ORDER_DETAILS_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: GET,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)

                },
                label: CORPORATE_ORDER_DETAILS_API,

            }));


        });
    };