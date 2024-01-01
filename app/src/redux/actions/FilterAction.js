import ApiEndpoints, { GET_FILTER_LISTING_API } from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST, GET } from '../../apimanager/RequestMethods'



export const hitFilterApi = (category_id, sub_category_id) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {

            const parameters = {
                category_id: category_id,
            }
            if (sub_category_id) {
                parameters.sub_category_id = sub_category_id
            }
            const Url = ApiEndpoints(GET_FILTER_LISTING_API)

            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,

                onSuccess: async (data) => {

                    resolve((data));
                },
                onFailure: (error) => {

                    reject(error)
                },
                label: GET_FILTER_LISTING_API,
                data: parameters
            }));



        });
    };