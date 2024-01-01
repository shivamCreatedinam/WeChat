import ApiEndpoints from '../../apimanager/ApiEndpoint'
import { GET_ALL_CITIES_API, VALIDATE_CART_API } from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import AppUser from "../../utility/AppUser"
import { POST, GET } from '../../apimanager/RequestMethods'

import {

} from '../Type'


export const hitGetAllCitiesApi = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {}
            const Url = ApiEndpoints(GET_ALL_CITIES_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: GET,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)

                },
                label: GET_ALL_CITIES_API,
                data: parameters
            }));


        });
    };
export const validateCartAction = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            let cityId = appUser.selectedCityId
            const Url = ApiEndpoints(VALIDATE_CART_API)
            const parameters = {
                city_id: cityId
            }
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
                label: VALIDATE_CART_API,
                data: parameters
            }));


        });
    };