import ApiEndpoints, { GET_CMS_PAGE_DETAIL_API, GET_FAQ_PAGE_DETAIL_API
,HOW_IT_WORK_QA_API } from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST, GET } from '../../apimanager/RequestMethods'

export const hitGetCmsDetailPageApi = (seo_key) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {
                seo_key: seo_key
            }
            const Url = ApiEndpoints(GET_CMS_PAGE_DETAIL_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: GET_CMS_PAGE_DETAIL_API,
                data: parameters
            }));
        });
    };

export const hitFaqDetailPageApi = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {}
            const Url = ApiEndpoints(GET_FAQ_PAGE_DETAIL_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: GET,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: GET_FAQ_PAGE_DETAIL_API,
                data: parameters
            }));
        });
    };


    export const getHowItWorksListApi = () =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            const parameters = {}
            const Url = ApiEndpoints(HOW_IT_WORK_QA_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: GET,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },
                label: HOW_IT_WORK_QA_API,
                data: parameters
            }));
        });
    };