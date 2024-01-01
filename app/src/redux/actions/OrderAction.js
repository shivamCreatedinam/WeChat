import ApiEndpoints, {
  GET_VIEW_ORDER_DETAIL_API,
  GET_MANAGE_SERVICE_REQUET_API,
  GET_MANAGE_SERVICE_REQUEST_POST_API,
  SEND_SERVICE_REQUEST_API,
  USER_SERVICE_REQUEST_API,
} from '../../apimanager/ApiEndpoint';
import ApiSingleton from '../../apimanager/ApiSingleton';
import {POST, GET} from '../../apimanager/RequestMethods';
import AppUser from '../../utility/AppUser';

export const getViewOrderDetailApi = order_id => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      order_id: order_id,
    };
    const Url = ApiEndpoints(GET_VIEW_ORDER_DETAIL_API);
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
        label: GET_VIEW_ORDER_DETAIL_API,
        data: parameters,
      }),
    );
  });
};

export const hitManageRequestApi = () => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {};
    const Url = ApiEndpoints(GET_MANAGE_SERVICE_REQUET_API);
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
        label: GET_MANAGE_SERVICE_REQUET_API,
        data: parameters,
      }),
    );
  });
};

export const hitManageRequestPostApi = dealCodeNumber => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      order_id: dealCodeNumber,
    };
    const Url = ApiEndpoints(GET_MANAGE_SERVICE_REQUEST_POST_API);
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
        label: GET_MANAGE_SERVICE_REQUEST_POST_API,
        data: parameters,
      }),
    );
  });
};

function createAndGetSeriviceParams(
  orderId,
  serviceType,
  descrip,
  attach,
  dropdownOptionArr,
  inputsArr,
  cfPickupReason,
  cfCancellationReason,
  dateFieldsArr,
  checkboxArr,
  multiCheckboxArr,
) {
  let parameters = {};
  let orderedProduct = [];
  let finalDescription = '';
  finalDescription += descrip + '<br/>';
  parameters.order_id = orderId;
  if (attach.length > 0) {
    parameters.file = attach[0].url;
  }
  if (attach.length > 1) {
    parameters.files1 = attach[1].url;
  }
  if (attach.length > 2) {
    parameters.files2 = attach[2].url;
  }
  if (attach.length > 3) {
    parameters.files3 = attach[3].url;
  }
  parameters.service_request_type = serviceType;
  dropdownOptionArr.forEach(element => {
    parameters[[element.value]] = element.dynamicValue;
  });
  inputsArr.forEach(element => {
    parameters[[element.value]] = element.dynamicValue;
    if (serviceType == 'repair')
      finalDescription += 'Repair Details : ' + element.dynamicValue + '<br/>';
    if (serviceType == 'replacement')
      finalDescription +=
        'Reason For replacement : ' + element.dynamicValue + '<br/>';
    if (serviceType == 'upgrade')
      finalDescription +=
        'Reason For Upgrade : ' + element.dynamicValue + '<br/>';
  });
  dateFieldsArr.forEach(element => {
    parameters[[element.value]] = element.dynamicValue;
  });
  checkboxArr.forEach(element => {
    parameters[[element.value]] = element.dynamicValue ? '1' : '0';
  });
  multiCheckboxArr.forEach(element => {
    if (element.dynamicValue) orderedProduct.push(element.value);
  });
  parameters.ordered_product = orderedProduct.join();
  if (orderedProduct.length > 0) {
    finalDescription +=
      'Selected Product for ' +
      serviceType +
      ' : ' +
      orderedProduct.join() +
      '<br/>';
  }
  if (
    serviceType == 'cancellation' &&
    parameters.cancellation_reason == 'Other'
  ) {
    parameters.cf_cancellation_reason = cfCancellationReason;
    finalDescription +=
      'Type your Cacellation Reason : ' + cfCancellationReason + '<br/>';
  }
  if (serviceType == 'request_pickup' && parameters.pickup_reason == 'Other') {
    parameters.cf_pickup_reason = cfPickupReason;
    finalDescription += 'Type your Pickup Reason : ' + cfPickupReason + '<br/>';
  }
  parameters.description = finalDescription;
  return parameters;
}

export const sendSeriveRequestApi = (
  orderId,
  serviceType,
  descrip,
  attach,
  dropDown,
  Inputs,
  cfPickupReason,
  cfCancellationReason,
  Dates,
  checbox,
  multiCheckbox,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    let parameters = createAndGetSeriviceParams(
      orderId,
      serviceType,
      descrip,
      attach,
      dropDown,
      Inputs,
      cfPickupReason,
      cfCancellationReason,
      Dates,
      checbox,
      multiCheckbox,
    );
    const Url = ApiEndpoints(SEND_SERVICE_REQUEST_API);
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
        label: SEND_SERVICE_REQUEST_API,
        data: parameters,
      }),
    );
  });
};

export const getMyAllSeriveRequestsApi = () => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {};
    const Url = ApiEndpoints(USER_SERVICE_REQUEST_API);
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
        label: USER_SERVICE_REQUEST_API,
        data: parameters,
      }),
    );
  });
};
