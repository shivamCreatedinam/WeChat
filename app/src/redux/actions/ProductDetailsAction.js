import ApiEndpoints, {
    ALL_PRODUCT_DETAIL_API, GET_OFFERS_API,
    REVIEW_LISTING_API,
    TRENDING_PRODUCT_API
} from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST, GET } from '../../apimanager/RequestMethods'
import AppUser from "../../utility/AppUser"


export const hitGetProductDetailApi = (product_id, city) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                product_id: product_id,
                city: city
            }
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const Url = ApiEndpoints(ALL_PRODUCT_DETAIL_API)
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
                label: ALL_PRODUCT_DETAIL_API,
                data: parameters
            }));


        });
    };
export const hitGetOfferslApi = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
            }
            const Url = ApiEndpoints(GET_OFFERS_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: GET,
                headersOverride: {
                },
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: GET_OFFERS_API,
                data: parameters
            }));


        });
    };


export const getTrendingProductApi = (city) => 
(dispatch) => {
    
    return new Promise((resolve, reject) => {
        const parameters = {
            city:city
        }
        const Url = ApiEndpoints(TRENDING_PRODUCT_API)
        dispatch(ApiSingleton.getInstance().apiActionCall({
            url: Url,
            method: GET,
            headersOverride: {
                city:city
            },
            onSuccess: async (data) => {
                resolve((data));
            },
            onFailure: (error) => {
                reject(error)
            },
            label: GET_OFFERS_API,
            data: parameters
        }));


    });
};    

export const hitReviewListingApi = (limit, page) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                limit: limit,
                page: page
            }
            const Url = ApiEndpoints(REVIEW_LISTING_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                headersOverride: {
                    "Content-Type": "multipart/form-data",
                },
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: page == 0 ? REVIEW_LISTING_API : `${REVIEW_LISTING_API}Paging`,
                data: parameters
            }));


        });
    };

