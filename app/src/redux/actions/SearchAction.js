import ApiEndpoints from '../../apimanager/ApiEndpoint'
import { SEARCH_PRODUCT_API } from '../../apimanager/ApiEndpoint'
import ApiSingleton from '../../apimanager/ApiSingleton'
import { POST } from '../../apimanager/RequestMethods'
import AppUser from '../../utility/AppUser'

export const hitSearchProductFor = (searchText) =>
    (dispatch) => {
        return new Promise((resolve, reject) => {
            let appUser = AppUser.getInstance()
            let token = appUser.token
            let Userid = appUser.userId
            let City = appUser.selectedCityId
            const parameters = {
                searchValue: searchText,
                city_id : City
            }
            const Url = ApiEndpoints(SEARCH_PRODUCT_API)
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: Url,
                method: POST,
                onSuccess: async (data) => {
                    resolve((data));
                },
                onFailure: (error) => {
                    reject(error)
                },

                headersOverride: token ?
                    {
                        "Content-Type": "multipart/form-data",
                        "authtoken": token,
                        "userid": Userid
                    } :
                    { "Cache-Control": "no-cache" }
                ,
                label: SEARCH_PRODUCT_API,
                data: parameters
            }));


        });
    };
