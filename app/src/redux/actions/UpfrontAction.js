import ApiEndpoints, {
  BASE_URL,
  CREATE_EXTENSION_ORDER,
  EXTENSION_MONTHLY_PAYMENT,
  SAVE_EXTENSION_MONTHLY_PAYMENT,
  SAVE_EXTENSION_ORDER_PAYMENT,
  TENURE_EXTENSION_PRICE,
  UPFRONT_TENURE_EXTENSION,
} from '../../apimanager/ApiEndpoint';
import ApiSingleton from '../../apimanager/ApiSingleton';
import {POST} from '../../apimanager/RequestMethods';

export const hitTenureExtensionApi = dealCodeNumber => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      dealCodeNumber: dealCodeNumber,
    };
    const Url = ApiEndpoints(UPFRONT_TENURE_EXTENSION);
    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: POST,
        onSuccess: async data => {
          console.log('tenure success==');
          resolve(data);
        },
        onFailure: error => {
          console.log('tenure error==');
          reject(error);
        },
        label: UPFRONT_TENURE_EXTENSION,
        data: parameters,
      }),
    );
  });
};
export const getTenureExtensionPrice = (
  dealCodeNumber,
  tenure,
  cf_value,
) => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      dealCodeNumber,
      tenure,
      cf_value,
    };
    const Url = ApiEndpoints(TENURE_EXTENSION_PRICE);
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
        label: TENURE_EXTENSION_PRICE,
        data: parameters,
      }),
    );
  });
};

export const hitExtensionOrder = (
  dealCodeNumber,
  tenure,
  cf_value,
) => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      dealCodeNumber,
      tenure,
      cf_value,
    };
    const Url = ApiEndpoints(CREATE_EXTENSION_ORDER);
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
        label: UPFRONT_TENURE_EXTENSION,
        data: parameters,
      }),
    );
  });
};

export const saveExtensionOrderPayment = (
  transactionID,
  razpay_orderid,
  orderid,
  customer_id,
  auth_raz_order_id,
  signature,
  id,
  cf_value,
) => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      transactionID,
      razpay_orderid,
      orderid,
      customer_id,
      auth_raz_order_id,
      signature,
      id,
      cf_value,
    };
    const Url = ApiEndpoints(SAVE_EXTENSION_ORDER_PAYMENT);
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
        label: SAVE_EXTENSION_ORDER_PAYMENT,
        data: parameters,
      }),
    );
  });
};

export const hitExtensionMonthlyBilling = (
  dealCodeNumber,
  type,
) => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      dealCodeNumber,
    };
    const Url = ApiEndpoints(EXTENSION_MONTHLY_PAYMENT);
    const finalUrl = `${Url}${type}`;
    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: finalUrl,
        method: POST,
        onSuccess: async data => {
          resolve(data);
        },
        onFailure: error => {
          reject(error);
        },
        label: EXTENSION_MONTHLY_PAYMENT,
        data: parameters,
      }),
    );
  });
};

export const saveMonthlyPaymentResponse = (
  transactionID,
  razpay_orderid,
  customer_id,
  mode,
  signature,
  server_orderid,
) => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      transactionID,
      razpay_orderid,
      customer_id,
      mode,
      signature,
      server_orderid,
    };
    const Url = ApiEndpoints(SAVE_EXTENSION_MONTHLY_PAYMENT);
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
        label: SAVE_EXTENSION_MONTHLY_PAYMENT,
        data: parameters,
      }),
    );
  });
};
