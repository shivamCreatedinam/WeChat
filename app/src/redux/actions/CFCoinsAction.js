import ApiEndpoints, { GET_CF_COINS_HISTORY_DATA_API } from '../../apimanager/ApiEndpoint'
import { GET_CF_COINS_DETAIL_API, ADD_CF_COIN_API } from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST, GET } from '../../apimanager/RequestMethods'
import AppUser from "../../utility/AppUser"
import {
    GET_CREDIT_DETAIL,
    GET_DEBIT_DETAIL
} from '../Type'

export const getCfCoinsDetails = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const parameters = {}
            const Url = ApiEndpoints(GET_CF_COINS_DETAIL_API)
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
                label: GET_CF_COINS_DETAIL_API,
                data: parameters
            }));
        });
    };

export const passCreditDetail = (data) => {
    return {
        type: GET_CREDIT_DETAIL,
        payload: data
    }
}
export const passDebitDetail = (data) => {
    return {
        type: GET_DEBIT_DETAIL,
        payload: data
    }
}


export const addCfCoinsApi = (amount, paymentMmode) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                amount: amount,
                mode: paymentMmode
            }
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const Url = ApiEndpoints(ADD_CF_COIN_API)
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
                label: ADD_CF_COIN_API,
                data: parameters
            }));
        });
    };

export const addCfCoinsHistoryDataApi = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const parameters = {}
            const Url = ApiEndpoints(GET_CF_COINS_HISTORY_DATA_API)
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
                label: GET_CF_COINS_HISTORY_DATA_API,
                data: parameters
            }))

                .catch((error) => {
                    console.error("rejection", JSON.stringify(error));
                });
        });
    };