import ApiEndpoints, {
  CATEGORY_LISTING_API,
  GET_PRODUCT_LISTING_API,
  NOTIFY_PRODCUT_API,
} from '../../apimanager/ApiEndpoint';

import AppUser from '../../utility/AppUser';
import ApiSingleton from '../../apimanager/ApiSingleton';
import {POST, GET} from '../../apimanager/RequestMethods';

import {
  SAVE_ALL_CATEGORIES,
  SAVE_SUB_CATEGORY_INDEX,
  SAVE_PRODUCT_LIST,
} from '../Type';

export const onSaveAllCategoriesAction = data => {
  return {
    type: SAVE_ALL_CATEGORIES,
    payload: data,
  };
};

export const saveSubTabToRedux = data => {
  return {
    type: SAVE_SUB_CATEGORY_INDEX,
    payload: data,
  };
};

export const onSaveProductListAction = data => {
  return {
    type: SAVE_PRODUCT_LIST,
    payload: data,
  };
};

export const hitCategoryListingApi = () => dispatch => {
  return new Promise((resolve, reject) => {
    const Url = ApiEndpoints(CATEGORY_LISTING_API);
    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: GET,
        onSuccess: data => {
          resolve(data);
        },
        onFailure: error => {
          reject(error);
        },
        label: CATEGORY_LISTING_API,
      }),
    );
  });
};

function getFilterKeys(params, filterObj) {
  if (Object.keys(filterObj).length >= 0) {
    for (let key in filterObj) {
      if (filterObj[key] == true) {
        params['filter[' + [Object.keys(filterObj).indexOf(key)] + ']'] = key;
      }
    }
  }
  return params;
}

export const hitGetProductListingApi = (
  categorySeourl,
  City,
  Offset,
  Limit,
  Sorting,
  filterObj,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    
    const parameters = {
      category_seourl: categorySeourl,
      city: City,
      offset: Offset,
      limit: Limit,
      sorting: Sorting,
    };

    let finalParam = getFilterKeys(parameters, filterObj);
    const Url = ApiEndpoints(GET_PRODUCT_LISTING_API);
    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: POST,
        headersOverride: {
          'Content-Type': 'multipart/form-data',
          authtoken: token,
          userid: Userid,
        },
        onSuccess: async data => {
          resolve(data);
        },
        onFailure: error => {
          reject(error);
        },
        label: GET_PRODUCT_LISTING_API,
        data: finalParam,
      }),
    );
  });
};
export const hitNotifyProductApi = (productID, cityID) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      productid: productID,
      cityid: cityID,
    };
    const Url = ApiEndpoints(NOTIFY_PRODCUT_API);
    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: POST,
        headersOverride: {
          'Content-Type': 'multipart/form-data',
          authtoken: token,
          userid: Userid,
        },
        onSuccess: async data => {
          resolve(data);
        },
        onFailure: error => {
          reject(error);
        },
        label: NOTIFY_PRODCUT_API,
        data: parameters,
      }),
    );
  });
};
