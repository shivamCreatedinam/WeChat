import {Label} from 'native-base';
import ApiEndpoints from '../../apimanager/ApiEndpoint';
import {
  GENERATE_HASH_API,
  CART_CHECKOUT_API,
  CART_CHECKOUT_INITATION_API,
  CART_CHECKOUT_RAZORPAY_API,
  CART_CHECKOUT_RAZORPAY_API_EMANDATE_RECURRING,
  CART_CHECKOUT_RAZORPAY_API_CARD_RECURRING,
  CART_CHECKOUT_RAZORPAY_API_UPI_RECURRING,
  CART_CHECKOUT_RAZORPAY_SUCCESS_API,
  CART_CHECKOUT_RAZORPAY_SUCCESS_API_EMANDATE_RECURRING,
  CART_CHECKOUT_RAZORPAY_SUCCESS_API_CARD_RECURRING,
  CART_CHECKOUT_RAZORPAY_SUCCESS_API_UPI_RECURRING,
  GET_MY_PAYMENT_API,
  DOWNLOAD_PAYMENT_STATEMENT_API,
  CUSTOMER_PAYMENT_API,
  CUSTOMER_RAZORPAY_PAYMENT_API,
  CREATE_CUSTOMER_RAZORPAY_PAYMENT_API,
  CUSTOMER_RAZORPAY_PAYMENT_SUCCESS_API,
  CUSTOMER_RAZORPAY_PAYMENT_API_RECURRING,
  CUSTOMER_RAZORPAY_PAYMENT_API_EMANDATE_RECURRING,
  CUSTOMER_RAZORPAY_PAYMENT_API_CARD_RECURRING,
  CUSTOMER_RAZORPAY_PAYMENT_API_UPI_RECURRING,
  REDEEM_COINS_API,
  CUSTOMER_PAYMENT_REMOVE_COINS_API,
  CUSTOMER_PAYMENT_REDEEM_COINS_API,
  GET_CHANGE_TYPE_PAYMENT_MODES_API,
  CHANGE_PAYMENT_MODE_API,
  GET_UPDATE_WALLET_AMOUNT_API,
  GET_PAYMENT_INFO_API,
} from '../../apimanager/ApiEndpoint';
import ApiSingleton from '../../apimanager/ApiSingleton';
import {POST, GET} from '../../apimanager/RequestMethods';
import AppUser from '../../utility/AppUser';

export const getHashForPayment = (
  amount,
  firstname,
  email,
  txnID,
  offerKey,
  isSi,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;

    let parameters = {
      amount: amount,
      productinfo: 'Cityfurnish',
      fullname: firstname,
      email: email,
      txnid: txnID,
      offerKey: offerKey,
    };

    if (isSi) {
      parameters.is_si = isSi;
    }

    const Url = ApiEndpoints(GENERATE_HASH_API);
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
        label: GENERATE_HASH_API,
        data: parameters,
      }),
    );
  });
};

export const hitCartCheckout = (
  paymentType,
  isWhatsappSelected,
  isSISelected,
  shippingAddresId,
  gstNumner,
  companyName,
  emailID,
  redeemCoins,
  toggleCheckBox,
  total_final_care_amount,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    let cityId = appUser.selectedCityId;

    const parameters = {
      payment_radio: paymentType, //('is_nach' for Credit / Debit Card, 'normal_payment'  for netbanking and others)
      whatsapp_opt: isWhatsappSelected, // (0 or 1)
      is_si_selected: isSISelected, // (0 or 1)
      Ship_address_val: shippingAddresId, // Selected shipping address id)
      gst_number: gstNumner,
      company_name: companyName,
      city_id: cityId,
      email: emailID,
      coin_redeem_amount: redeemCoins,
      is_cf_care: toggleCheckBox ? 1 : 0,
      cf_care_price: toggleCheckBox ? total_final_care_amount : 0,
    };
    console.log('parameters ::', parameters);
    const Url = ApiEndpoints(CART_CHECKOUT_API);
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
        label: CART_CHECKOUT_API,
        data: parameters,
      }),
    );
  });
};

export const hitCartCheckoutInitation = (
  paymentType,
  isWhatsappSelected,
  isSISelected,
  shippingAddresId,
  gstNumner,
  companyName,
  emailID,
  redeemCoins,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    let cityId = appUser.selectedCityId;

    const parameters = {
      payment_radio: paymentType,
      whatsapp_opt: isWhatsappSelected, // (0 or 1)
      is_si_selected: isSISelected, // (0 or 1)
      Ship_address_val: shippingAddresId, // Selected shipping address id)
      gst_number: gstNumner,
      company_name: companyName,
      city_id: cityId,
      email: emailID,
      coin_redeem_amount: redeemCoins,
    };
    const Url = ApiEndpoints(CART_CHECKOUT_INITATION_API);
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
        label: CART_CHECKOUT_INITATION_API,
        data: parameters,
      }),
    );
  });
};

export const hitCartCheckoutRazorpay = (
  dealCodeId,
  upfrontEnabled,
  normalOrRecurring,
  paymentType,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    let cityId = appUser.selectedCityId;

    const parameters = {
      dealCodeNumber: dealCodeId,
      isupfront: upfrontEnabled,
    };

    let Url = '';
    let label = '';
    if (normalOrRecurring == 'normal_payment') {
      Url = ApiEndpoints(CART_CHECKOUT_RAZORPAY_API);
      label = CART_CHECKOUT_RAZORPAY_API;
    } else {
      if (paymentType == 'emandate') {
        Url = ApiEndpoints(CART_CHECKOUT_RAZORPAY_API_EMANDATE_RECURRING);
        label = CART_CHECKOUT_RAZORPAY_API_EMANDATE_RECURRING;
      } else if (paymentType == 'card') {
        Url = ApiEndpoints(CART_CHECKOUT_RAZORPAY_API_CARD_RECURRING);
        label = CART_CHECKOUT_RAZORPAY_API_CARD_RECURRING;
      } else if (paymentType == 'upi') {
        Url = ApiEndpoints(CART_CHECKOUT_RAZORPAY_API_UPI_RECURRING);
        label = CART_CHECKOUT_RAZORPAY_API_UPI_RECURRING;
      } else {
        Url = ApiEndpoints(CART_CHECKOUT_RAZORPAY_API);
        label = CART_CHECKOUT_RAZORPAY_API;
      }
    }
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
        label: label,
        data: parameters,
      }),
    );
  });
};
export const hitCartCheckoutRazorpaySuccess = (
  razorpayPaymentId,
  dealCodeNumber,
  customerId,
  razorpayOrderID,
  razorpaySignature,
  authRazorpayOrderID,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    let cityId = appUser.selectedCityId;
    const parameters = {
      transactionID: razorpayPaymentId,
      orderid: dealCodeNumber,
      customer_id: customerId,
      razpay_orderid: razorpayOrderID,
      signature: razorpaySignature,
      auth_raz_order_id: authRazorpayOrderID,
    };
    const Url = ApiEndpoints(CART_CHECKOUT_RAZORPAY_SUCCESS_API);
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
        label: CART_CHECKOUT_RAZORPAY_SUCCESS_API,
        data: parameters,
      }),
    );
  });
};

export const hitCartCheckoutRazorpaySuccessRecurring = (
  razorpayPaymentId,
  dealCodeNumber,
  customerId,
  razorpaySignature,
  authRazorpayOrderID,
  paymentType,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      transactionID: razorpayPaymentId,
      orderid: dealCodeNumber,
      customer_id: customerId,
      signature: razorpaySignature,
      auth_raz_order_id: authRazorpayOrderID,
    };

    let Url = '';
    let label = '';
    if (paymentType == 'emandate') {
      Url = ApiEndpoints(CART_CHECKOUT_RAZORPAY_SUCCESS_API_EMANDATE_RECURRING);
      label = CART_CHECKOUT_RAZORPAY_SUCCESS_API_EMANDATE_RECURRING;
    } else if (paymentType == 'card') {
      Url = ApiEndpoints(CART_CHECKOUT_RAZORPAY_SUCCESS_API_CARD_RECURRING);
      label = CART_CHECKOUT_RAZORPAY_SUCCESS_API_CARD_RECURRING;
    } else if (paymentType == 'upi') {
      Url = ApiEndpoints(CART_CHECKOUT_RAZORPAY_SUCCESS_API_UPI_RECURRING);
      label = CART_CHECKOUT_RAZORPAY_SUCCESS_API_UPI_RECURRING;
    } else {
      Url = ApiEndpoints(CART_CHECKOUT_RAZORPAY_SUCCESS_API_RECURRING);
      label = CART_CHECKOUT_RAZORPAY_SUCCESS_API_RECURRING;
    }
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
        label: label,
        data: parameters,
      }),
    );
  });
};

export const getMyPaymentsDetails = () => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {};
    console.log("token ::",token)
    const Url = ApiEndpoints(GET_MY_PAYMENT_API);
    console.log("Url ::",Url)
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
        label: GET_MY_PAYMENT_API,
        
      }),
    );
  });
};

export const hitDownloadPaymentStatementApi = (
  from_date,
  to_date,
  statement_format,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      from_date: from_date,
      to_date: to_date,
      statement_format: statement_format,
    };
    console.log("parameters ::",parameters)
    const Url = ApiEndpoints(DOWNLOAD_PAYMENT_STATEMENT_API);
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
        label: DOWNLOAD_PAYMENT_STATEMENT_API,
        data: parameters,
      }),
    );
  });
};

export const hitRedeemCoinsApi = (
  coins,
  upfrontEnabled,
  is_care,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      wallet_amount: coins,
      upfront: upfrontEnabled,
      is_care: is_care,
    };
    const Url = ApiEndpoints(REDEEM_COINS_API);
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
        label: REDEEM_COINS_API,
        data: parameters,
      }),
    );
  });
};

export const hitCustomerOneTimePaymentApi = (
  firstName,
  lastName,
  email,
  paymentOption,
  amount,
  appliedCoins,
  invoiceId,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    let cityID = appUser.selectedCityId;
    const parameters = {
      user_first_name: firstName,
      user_last_name: lastName,
      user_email: email,
      payment_option: paymentOption, //{'one_time', 'enach'}
      user_amount: amount,
      city_id: cityID,
      invoice_id: invoiceId,
      applied_wallet_amount: appliedCoins,
    };
    const Url = ApiEndpoints(CUSTOMER_PAYMENT_API);
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
        label: CUSTOMER_PAYMENT_API,
        data: parameters,
      }),
    );
  });
};

export const hitCustomerOneTimeRazorpayPaymentApi = (
  email,
  amountTopaid,
  cfCoin,
  firstName,
  lastName,
  invoiceNo,
  Notes,
  paymentType,
  isSISelected,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      user_email: email,
      user_amount: amountTopaid,
      cfcoins: cfCoin,
      user_first_name: firstName,
      user_last_name: lastName,
      user_invoice_number: invoiceNo,
      user_notes: Notes,
      payment_option: paymentType,
      is_si_selected: isSISelected,
    };
    const Url = ApiEndpoints(CUSTOMER_RAZORPAY_PAYMENT_API);
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
        label: CUSTOMER_RAZORPAY_PAYMENT_API,
        data: parameters,
      }),
    );
  });
};

export const hitCreateCustomerOneTimeRazorpayPaymentApi = (
  firstName,
  email,
  mobileNumber,
  totalAmount,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      full_name: firstName,
      email: email,
      phone_no: mobileNumber,
      price: totalAmount,
    };
    const Url = ApiEndpoints(CREATE_CUSTOMER_RAZORPAY_PAYMENT_API);
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
        label: CREATE_CUSTOMER_RAZORPAY_PAYMENT_API,
        data: parameters,
      }),
    );
  });
};

export const hitCustomerOneTimeRazorpayPaymentSuccessApi = (
  razorpayPaymentId,
  razorpayOrderID,
  razorpaySignature,
  authRazorpayOrderID,
  amountToBePaid,
  paymentType,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      transactionID: razorpayPaymentId,
      razpay_orderid: razorpayOrderID,
      amount: amountToBePaid,
      payment_source: paymentType == 'one_time' ? '' : 'sist',
      auth_raz_order_id: authRazorpayOrderID,
      signature: razorpaySignature,
    };
    const Url = ApiEndpoints(CUSTOMER_RAZORPAY_PAYMENT_SUCCESS_API);
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
        label: CUSTOMER_RAZORPAY_PAYMENT_SUCCESS_API,
        data: parameters,
      }),
    );
  });
};

export const hitCreateCustomerOneTimeRazorpayPaymentApiRecurring = (
  firstName,
  email,
  mobileNumber,
  amount,
  paymentType,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      full_name: firstName,
      email: email,
      phone_no: mobileNumber,
      price: amount,
    };

    let Url = '';
    let label = '';
    if (paymentType == 'emandate') {
      Url = ApiEndpoints(CUSTOMER_RAZORPAY_PAYMENT_API_EMANDATE_RECURRING);
      label = CUSTOMER_RAZORPAY_PAYMENT_API_EMANDATE_RECURRING;
    } else if (paymentType == 'card') {
      Url = ApiEndpoints(CUSTOMER_RAZORPAY_PAYMENT_API_CARD_RECURRING);
      label = CUSTOMER_RAZORPAY_PAYMENT_API_CARD_RECURRING;
    } else if (paymentType == 'upi') {
      Url = ApiEndpoints(CUSTOMER_RAZORPAY_PAYMENT_API_UPI_RECURRING);
      label = CUSTOMER_RAZORPAY_PAYMENT_API_UPI_RECURRING;
    } else {
      Url = ApiEndpoints(CUSTOMER_RAZORPAY_PAYMENT_API_RECURRING);
      label = CUSTOMER_RAZORPAY_PAYMENT_API_RECURRING;
    }
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
        label: label,
        data: parameters,
      }),
    );
  });
};

export const hitCustomerPaymentRedeemCoinsApi = (amount, coins) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      applied_wallet_amount: coins,
      user_amount: amount,
    };
    const Url = ApiEndpoints(CUSTOMER_PAYMENT_REDEEM_COINS_API);
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
        label: CUSTOMER_PAYMENT_REDEEM_COINS_API,
        data: parameters,
      }),
    );
  });
};

export const hitCustomerPaymentRemoveCoinsApi = () => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      data: '',
    };
    const Url = ApiEndpoints(CUSTOMER_PAYMENT_REMOVE_COINS_API);
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
        label: CUSTOMER_PAYMENT_REMOVE_COINS_API,
        data: parameters,
      }),
    );
  });
};

export const getAllChangePaymentModesApi = orderId => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      order_id: orderId,
    };
    const Url = ApiEndpoints(GET_CHANGE_TYPE_PAYMENT_MODES_API);
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
        label: GET_CHANGE_TYPE_PAYMENT_MODES_API,
        data: parameters,
      }),
    );
  });
};

export const hitChangePaymentModesApi = (
  orderId,
  cType,
  rType,
  descrip,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      order_id: orderId,
      ctype: cType,
      rtype: rType,
      description: descrip,
    };
    const Url = ApiEndpoints(CHANGE_PAYMENT_MODE_API);
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
        label: CHANGE_PAYMENT_MODE_API,
        data: parameters,
      }),
    );
  });
};

export const getUpdateWalletAmount = () => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {};
    const Url = ApiEndpoints(GET_UPDATE_WALLET_AMOUNT_API);
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
        label: GET_UPDATE_WALLET_AMOUNT_API,
        data: parameters,
      }),
    );
  });
};

export const getEnabledPaymentInfo = () => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {};
    const Url = ApiEndpoints(GET_PAYMENT_INFO_API);
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
        label: GET_PAYMENT_INFO_API,
        data: parameters,
      }),
    );
  });
};
