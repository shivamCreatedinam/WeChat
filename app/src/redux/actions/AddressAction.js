import ApiEndpoints, {
  ADD_ADDRESS_API,
  ADDRESS_LISTING_API,
  DELETE_ADDRESS_API,
  GET_STATE_CITY_API,
  DEFAULT_ADDRESS_API,
  ENQUIRE_OFFICE_FURNITURE_API,
  GET_NON_SERVICEABLE_POSTALCODE_API,
} from '../../apimanager/ApiEndpoint';
import ApiSingleton from '../../apimanager/ApiSingleton';
import AppUser from '../../utility/AppUser';
import {POST, GET} from '../../apimanager/RequestMethods';

import {CHANGE_ADDRESS_POSITION, SET_ADDRESS_LIST} from '../Type';
import {logOnConsole} from '../../utility/Utils';

export const hitAddAddressApi = (
  full_name,
  address1,
  address2,
  city,
  state,
  country,
  phone,
  alternatePhone,
  email,
  postal_code,
  make_default,
  ship_id,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;

    const parameters = {
      full_name: full_name,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      country: country,
      phone: phone,
      phone_alternate: alternatePhone,
      email: email,
      postal_code: postal_code,
      make_default: make_default,
      ship_id: ship_id,
    };
    const Url = ApiEndpoints(ADD_ADDRESS_API);
    logOnConsole(parameters);
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
        label: ADD_ADDRESS_API,
        data: parameters,
      }),
    );
  });
};

export const hitAddressListingApi = (page, limit) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    let cityID = appUser.selectedCityId;
    const parameters = {
      page: page,
      limit: limit,
      city_id: cityID,
    };
    // console.log({parameters, appUser});
    const Url = ApiEndpoints(ADDRESS_LISTING_API);
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
        label: ADDRESS_LISTING_API,
        data: parameters,
      }),
    );
  });
};

export const hitAddressDeleteApi = ship_id => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      ship_id: ship_id,
    };
    const Url = ApiEndpoints(DELETE_ADDRESS_API);
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
        label: DELETE_ADDRESS_API,
        data: parameters,
      }),
    );
  });
};

export const hitStateCityApi = city => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      city: city,
    };
    const Url = ApiEndpoints(GET_STATE_CITY_API);
    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: POST,

        onSuccess: async data => {
          resolve(data);
        },
        onFailure: error => {
          reject(error);
        },
        label: GET_STATE_CITY_API,
        data: parameters,
      }),
    );
  });
};

export const hitDefaultAddressApi = (make_default, ship_id) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      make_default: make_default,
      ship_id: ship_id,
    };
    const Url = ApiEndpoints(DEFAULT_ADDRESS_API);
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
        label: DEFAULT_ADDRESS_API,
        data: parameters,
      }),
    );
  });
};
export const changeAddressIndex = data => {
  return {
    type: CHANGE_ADDRESS_POSITION,
    payload: data,
  };
};

export const hitOfficeEnquiryApi = (
  name,
  emailID,
  mobileNo,
  City,
  remarks,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      name: name,
      email: emailID,
      mobile: mobileNo,
      city: City,
      remarks: remarks,
    };
    const Url = ApiEndpoints(ENQUIRE_OFFICE_FURNITURE_API);
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
        label: ENQUIRE_OFFICE_FURNITURE_API,
        data: parameters,
      }),
    );
  });
};

export const getNonServiceablePostalCode = () => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;

    const Url = ApiEndpoints(GET_NON_SERVICEABLE_POSTALCODE_API);

    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: GET,
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
        label: GET_NON_SERVICEABLE_POSTALCODE_API,
      }),
    );
  });
};

export const setAddressList = data => {
  return {
    type: SET_ADDRESS_LIST,
    payload: data,
  };
};
