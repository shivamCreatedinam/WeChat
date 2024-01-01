import ApiEndpoints, { GET_ALL_WISHLIST, ADD_DELETE_WISHLIST_API } from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import AppUser from "../../utility/AppUser"
import { GET, POST } from '../../apimanager/RequestMethods'
import {UPDATE_WISHLIST_BADGE_COUNT } from './../Type'

export const getAllWishListApi = (cityId) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const parameters = {
                city: cityId
            }
            const Url = ApiEndpoints(GET_ALL_WISHLIST)
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
                label: GET_ALL_WISHLIST,
                data: parameters
            }));


        });
    };

export const hitAddDeleteWishListApi = (product_id) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                product_id: product_id
            }
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const Url = ApiEndpoints(ADD_DELETE_WISHLIST_API)
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
                label: ADD_DELETE_WISHLIST_API,
                data: parameters
            }));


        });
    };


    export const onUpdateWishlistBadgeCount = (data) => {
        return {
            type: UPDATE_WISHLIST_BADGE_COUNT,
            payload: data
        }
    }