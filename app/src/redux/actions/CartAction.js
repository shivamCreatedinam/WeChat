import ApiEndpoints, {
  ADD_TO_CART_API,
  GET_CART_DETAIL_API,
  DELETE_FROM_CART_API,
  DELETE_COUPON_CODE_API,
  APPLY_COUPON_CODE_API,
  UPDATE_CART_QUANTITY,
  CLEAR_CART_API,
  GET_CART_FOR_CITY_API,
} from '../../apimanager/ApiEndpoint';
import ApiSingleton from '../../apimanager/ApiSingleton';
import AppUser from '../../utility/AppUser';
import {POST} from '../../apimanager/RequestMethods';
import {UPDATE_CART_BADGE_COUNT} from './../Type';
import AsyncStorage from '@react-native-community/async-storage';

export const onUpdateCartBadgeCount = data => {
  return {
    type: UPDATE_CART_BADGE_COUNT,
    payload: data,
  };
};

export const hitAddToCartApi = (
  product_id,
  quantity,
  attribute_values,
  city_id,
  user_id,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    const parameters = {
      product_id: product_id,
      quantity: quantity,
      attribute_values: attribute_values,
      city_id: city_id,
      user_id: appUser.userId ? appUser.userId : user_id,
    };
    let token = appUser.token;
    let Userid = appUser.userId;
    const Url = ApiEndpoints(ADD_TO_CART_API);

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
        label: ADD_TO_CART_API,
        data: parameters,
      }),
    );
  });
};

export const hitClearCart = () => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      city_id: appUser.selectedCityId,
    };
    const Url = ApiEndpoints(CLEAR_CART_API);

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
        label: CLEAR_CART_API,
        data: parameters,
      }),
    );
  });
};

export const getCartDetailApi = (getUpfrontMode = true) => dispatch => {
  return new Promise(async (resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    let cityId = appUser.selectedCityId;
    let tempUserId = await AsyncStorage.getItem('@temp_user_id');

    if (tempUserId == null) {
      let rnumber = Math.round(Date.now() * (Math.random() * 1000));
      let rnstring = rnumber.toString();
      await AsyncStorage.setItem('@temp_user_id', rnstring.substring(0, 9));
      tempUserId = rnstring.substring(0, 9);
    }
    const Url = ApiEndpoints(GET_CART_DETAIL_API);
    const parameters = {
      city_id: cityId,
      is_upfront: getUpfrontMode ? 1 : 0,
    };
    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: POST,
        headersOverride: {
          'Content-Type': 'multipart/form-data',
          authtoken: token,
          userid: Userid ? Userid : tempUserId,
        },
        onSuccess: async data => {
          resolve(data);
        },
        onFailure: error => {
          reject(error);
        },
        label: GET_CART_DETAIL_API,
        data: parameters,
      }),
    );
  });
};
export const getCartForCityApi = () => dispatch => {
  
  return new Promise(async (resolve, reject) => {
    let appUser = AppUser.getInstance();
    
    let token = appUser.token;
    let Userid = appUser.userId;
    // let tempUserId = await AsyncStorage.getItem('@temp_user_id');

    // if (tempUserId == null) {
    //   let rnumber = Math.round(Date.now() * (Math.random() * 1000));
    //   let rnstring = rnumber.toString();
    //   await AsyncStorage.setItem('@temp_user_id', rnstring.substring(0, 9));
    //   tempUserId = rnstring.substring(0, 9);
    // }
    const Url = ApiEndpoints(GET_CART_FOR_CITY_API);
    dispatch(
        ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: POST,
        headersOverride: {
          'Content-Type': 'multipart/form-data',
          authtoken: token,
          userid: Userid ? Userid : tempUserId,
        },
        onSuccess: async data => {
          console.log('successs--------==');
          resolve(data);
        },
        onFailure: error => {
          reject(error);
        },
        label: GET_CART_FOR_CITY_API,
      }),
    )

    
  });
};
export const updateQuantity = (
  productId,
  quantity,
  shippingCost,
  tenure,
) => dispatch => {
  return new Promise(async (resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    let cityId = appUser.selectedCityId;
    let tempUserId = await AsyncStorage.getItem('@temp_user_id');

    if (tempUserId == null) {
      let rnumber = Math.round(Date.now() * (Math.random() * 1000));
      let rnstring = rnumber.toString();
      await AsyncStorage.setItem('@temp_user_id', rnstring.substring(0, 9));
      tempUserId = rnstring.substring(0, 9);
    }
    const Url = ApiEndpoints(UPDATE_CART_QUANTITY);
    const parameters = {
      city_id: cityId,
      quantity: quantity,
      select_tenure: tenure,
      product_id: productId,
      user_id: Userid,
      product_shipping_cost: shippingCost,
    };
    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: POST,
        headersOverride: {
          'Content-Type': 'multipart/form-data',
          authtoken: token,
          userid: Userid ? Userid : tempUserId,
        },
        onSuccess: async data => {
          resolve(data);
        },
        onFailure: error => {
          reject(error);
        },
        label: UPDATE_CART_QUANTITY,
        data: parameters,
      }),
    );
  });
};

export const deleteProductFromCartApi = cart_id => dispatch => {
  return new Promise(async (resolve, reject) => {
    const parameters = {
      cart_id: cart_id,
    };

    let tempUserId = await AsyncStorage.getItem('@temp_user_id');

    if (tempUserId == null) {
      let rnumber = Math.round(Date.now() * (Math.random() * 1000));
      let rnstring = rnumber.toString();
      await AsyncStorage.setItem('@temp_user_id', rnstring.substring(0, 9));
      tempUserId = rnstring.substring(0, 9);
    }

    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const Url = ApiEndpoints(DELETE_FROM_CART_API);
    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: POST,
        headersOverride: {
          'Content-Type': 'multipart/form-data',
          authtoken: token,
          userid: Userid ? Userid : tempUserId,
        },
        onSuccess: async data => {
          resolve(data);
        },
        onFailure: error => {
          reject(error);
        },
        label: DELETE_FROM_CART_API,
        data: parameters,
      }),
    );
  });
};

export const deleteCouponCodeApi = coupon_code => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      coupon_code: coupon_code,
    };
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const Url = ApiEndpoints(DELETE_COUPON_CODE_API);
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
        label: DELETE_COUPON_CODE_API,
        data: parameters,
      }),
    );
  });
};

export const applyCouponCodeApi = coupon_code => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      coupon_code: coupon_code,
    };
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const Url = ApiEndpoints(APPLY_COUPON_CODE_API);
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
        label: APPLY_COUPON_CODE_API,
        data: parameters,
      }),
    );
  });
};
