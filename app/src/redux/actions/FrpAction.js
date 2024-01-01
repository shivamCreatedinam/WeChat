import ApiEndpoints, {
    GET_FRP_PLANS_API,
    GET_FRP_PLAN_DETAIL_API,
    GET_FRP_SUGGESTION_PRODUCTS_API,
    ADD_FRP_PRODUCT_TO_CART_API,
    FRP_FAQ_API,
    FRP_HOW_ITS_WORKS_API,
    FRP_FURNISHING_PLAN_API
} from '../../apimanager/ApiEndpoint'
import AppUser from "../../utility/AppUser"
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST, GET } from '../../apimanager/RequestMethods'
import { SAVE_FRP_PRODUCT_LIST, SAVE_FRP_PRODUCT_DETAIL } from '../Type';


export const onSaveFrpProductDetailAction = (data) => {
    return {
        type: SAVE_FRP_PRODUCT_DETAIL,
        payload: data
    }
}

export const onSaveFrpProductListAction = (data) => {
    return {
        type: SAVE_FRP_PRODUCT_LIST,
        payload: data
    }
}

export const hitGetFrpPlans = (cityId, subCategoryId) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                city_id: cityId,
                cat_id: subCategoryId
            }
            const Url = ApiEndpoints(GET_FRP_PLANS_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: GET_FRP_PLANS_API,
                data: parameters
            }));
        });
    };

export const hitGetFrpPlansDetail = (productId, tenurePid) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                frp_id: productId,
                attribute_values: tenurePid
            }
            const Url = ApiEndpoints(GET_FRP_PLAN_DETAIL_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: GET_FRP_PLAN_DETAIL_API,
                data: parameters
            }));
        });
    };


export const hitGetFrpSuggestionProducts = (productId, roomId, slotId, cityID) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                product_id: productId,
                room_id: roomId,
                slot_id: slotId,
                city_id: cityID
            }
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const Url = ApiEndpoints(GET_FRP_SUGGESTION_PRODUCTS_API)
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
                label: GET_FRP_SUGGESTION_PRODUCTS_API,
                data: parameters
            }));
        });
    };


function getFinalParams(params, rooms, productId) {
    rooms.forEach(room => {
        let roomId = room.id;
        room.slots.forEach(slot => {
            let type = slot.productType;
            let slotId = slot.id;
            let associatedId = slot.associatedProductId;
            if (associatedId != null) {
                if (type == "premium") {
                    params['premium_products[' + roomId + '][' + slotId + '][]'] = associatedId
                }
                params['selected_sub_products[' + productId + '][' + roomId + '][' + slotId + '][]'] = associatedId
            }

        });
    });
    return params
}

export const hitAddFrpProductToCart = (rooms, cityId, attributePrice, productId) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                frp_id: productId,
                attribute_values: attributePrice,
                city_id: cityId
            }

            let finalParams = getFinalParams(parameters, rooms, productId)
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            const Url = ApiEndpoints(ADD_FRP_PRODUCT_TO_CART_API)
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
                label: ADD_FRP_PRODUCT_TO_CART_API,
                data: finalParams
            }));
        });
    };


export const getFrpFaqListApi = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {}
            const Url = ApiEndpoints(FRP_FAQ_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: GET,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: FRP_FAQ_API,
                data: parameters
            }));
        });
    };


export const getFrpHowItsWorksListApi = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {}
            const Url = ApiEndpoints(FRP_HOW_ITS_WORKS_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: GET,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: FRP_HOW_ITS_WORKS_API,
                data: parameters
            }));
        });
    };


export const getFrpFurnishingPlanListApi = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {}
            const Url = ApiEndpoints(FRP_FURNISHING_PLAN_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: GET,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: FRP_FURNISHING_PLAN_API,
                data: parameters
            }));
        });
    };
    
