import ApiEndpoints, {GET_FAQ_CATEGORY} from '../../apimanager/ApiEndpoint';
import ApiSingleton from '../../apimanager/ApiSingleton';
import {GET} from '../../apimanager/RequestMethods';

export const getFaqCategoryWise = () => dispatch => {
  return new Promise((resolve, reject) => {
    const Url = ApiEndpoints(GET_FAQ_CATEGORY);
    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: GET,
        onSuccess: async data => {
          resolve(data);
        },
        onFailure: error => {
          reject(error);
        },
        label: GET_FAQ_CATEGORY,
      }),
    );
  });
};
