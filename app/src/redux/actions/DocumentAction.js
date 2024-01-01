import ApiEndpoints, {
  GET_CBIL_DOCUMENTS_API,
  GET_ALL_ORDER_API,
  GET_FIRST_RUNNING_ORDER_API,
  VERIFY_CREDIT_SCORE_API,
  GET_KYC_SCORE_API,
  SAVE_KYC_DATA_API,
  UPLOAD_KYC_DATA_API,
  VERIFY_CRIF_ANSWER_API,
  CHATBOT_QUERY_REQUEST_API,
  GET_VIEW_ORDER_DETAIL_API,
  GET_NEW_DOCUMENT_API
} from '../../apimanager/ApiEndpoint';
import {SAVE_KYC_DOCUMENT_DETAIL} from '../Type';
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

export const onSaveKycDocumentDetailAction = data => {
  return {
    type: SAVE_KYC_DOCUMENT_DETAIL,
    payload: data,
  };
};

export const hitCheckDocumentStateApi = order_id => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      order_id: order_id,
    };
    const Url = ApiEndpoints(GET_NEW_DOCUMENT_API);

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
        label: GET_NEW_DOCUMENT_API,
        data: parameters,
      }),
    );
  });
};

export const hitGetCbilDocumentApi = cibil_score => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const parameters = {
      cibil_score: cibil_score,
    };
    const Url = ApiEndpoints(GET_CBIL_DOCUMENTS_API);

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
        label: GET_CBIL_DOCUMENTS_API,
        data: parameters,
      }),
    );
  });
};

function makeParamsForUploading(
  kycDetailsObj,
  kycDocumentsTypeObject,
  orderId,
  ownerPhoneNumber,
  ownerName,
  alternatecontact,
) {
  let params = {};
  const {documents} = kycDetailsObj;
  let len = documents.length;
  params.linkedin_url =
    kycDetailsObj.linkedinProfileUrl && kycDetailsObj.linkedinProfileUrl != ''
      ? kycDetailsObj.linkedinProfileUrl
      : 'NA';
  // params.linkedin_profile_url = "https://linkedin.com/";
  params.special_remarks = kycDetailsObj.remarks;
  params.usertype = kycDetailsObj.userType;
  params.order_id = orderId;
  params.ownercontact = ownerPhoneNumber;
  params.alternatecontact = alternatecontact;
  params.ownername = ownerName;
  params.cf_financial_type_statement = kycDocumentsTypeObject.cf_financial_type
    ? kycDocumentsTypeObject.cf_financial_type
    : 'NA';
  // params.cf_pan_type_card = kycDocumentsTypeObject.cf_pan_type ? kycDocumentsTypeObject.cf_pan_type : "NA";
  params.cf_delivery_type_address_proof = kycDocumentsTypeObject.cf_delivery_address_proof_type
    ? kycDocumentsTypeObject.cf_delivery_address_proof_type
    : 'NA';
  params.cf_permanent_type_address_proof = kycDocumentsTypeObject.cf_permanent_address_proof_type
    ? kycDocumentsTypeObject.cf_permanent_address_proof_type
    : 'NA';
  for (let i = 0; i < len; i++) {
    let document = documents[i];
    let count = document.uriArr.length;
    for (let j = 0; j < count; j++) {
      let item = document.uriArr[j];
      params[document.docId + '_' + j] = item.url;
    }
  }
  return params;
}
export const hitUploadKycData = (
  kycDetailsObj,
  kycDocumentsTypeObject,
  orderId,
  ownerPhoneNumber,
  ownerName,
  documentID,
  alternatecontact,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;

    const Url = ApiEndpoints(SAVE_KYC_DATA_API);
    let parameters = makeParamsForUploading(
      kycDetailsObj,
      kycDocumentsTypeObject,
      orderId,
      ownerPhoneNumber,
      ownerName,
      alternatecontact,
    );

    console.log('CHAWLA parameters => ', parameters);
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
        label: SAVE_KYC_DATA_API,
        data: parameters,
      }),
    );
  });
};

function makeParamsForReUploading(
  kycDetailsObj,
  kycDocumentsTypeObject,
  orderId,
) {
  let appUser = AppUser.getInstance();
  let Userid = appUser.userId;

  let params = {};
  const {documents} = kycDetailsObj;
  let len = documents.length;
  params.order_id = orderId;
  params.user_id = Userid;
  if (
    'cf_financial_type' in kycDocumentsTypeObject &&
    kycDocumentsTypeObject.cf_financial_type != null
  ) {
    params.sub_doc_type = kycDocumentsTypeObject.cf_financial_type;
    params.doc_id = 'cf_financial';
  }
  if (
    'cf_delivery_address_proof_type' in kycDocumentsTypeObject &&
    kycDocumentsTypeObject.cf_delivery_address_proof_type != null
  ) {
    params.sub_doc_type = kycDocumentsTypeObject.cf_delivery_address_proof_type;
    params.doc_id = 'cf_delivery_address_proof';
  }
  if (
    'cf_permanent_address_proof_type' in kycDocumentsTypeObject &&
    kycDocumentsTypeObject.cf_permanent_address_proof_type != null
  ) {
    params.sub_doc_type =
      kycDocumentsTypeObject.cf_permanent_address_proof_type;
    params.doc_id = 'cf_permanent_address_proof';
  }
  for (let i = 0; i < len; i++) {
    let document = documents[i];
    let count = document.uriArr.length;
    for (let j = 0; j < count; j++) {
      let item = document.uriArr[j];
      params[document.docId + '_' + j] = item.url;
    }
  }
  return params;
}
export const hitReUploadKycData = (
  kycDetailsObj,
  kycDocumentsTypeObject,
  orderId,
) => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;

    const Url = ApiEndpoints(UPLOAD_KYC_DATA_API);
    let parameters = makeParamsForReUploading(
      kycDetailsObj,
      kycDocumentsTypeObject,
      orderId,
    );

    // console.log('CHAWLA reupload parameters => ', parameters);
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
        label: UPLOAD_KYC_DATA_API,
        data: parameters,
      }),
    );
  });
};

export const hitFirstRunningOrderApi = () => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;

    const Url = ApiEndpoints(GET_FIRST_RUNNING_ORDER_API);

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
        label: GET_FIRST_RUNNING_ORDER_API,
      }),
    );
  });
};

export const hitAllOrderApi = () => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;

    const Url = ApiEndpoints(GET_ALL_ORDER_API);

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
        label: GET_ALL_ORDER_API,
      }),
    );
  });
};

export const getKYCScoreApi = () => dispatch => {
  return new Promise((resolve, reject) => {
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const Url = ApiEndpoints(GET_KYC_SCORE_API);
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
        label: GET_KYC_SCORE_API,
      }),
    );
  });
};

export const hitVerifyCreditScoreApi = (
  voter_id,
  driving_licence,
  pan_number,
  dob,
  order_id,
) => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      voter_id: voter_id,
      driving_licence: driving_licence,
      pan_number: pan_number,
      dob: dob,
      order_id: order_id,
    };
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const Url = ApiEndpoints(VERIFY_CREDIT_SCORE_API);
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
        label: VERIFY_CREDIT_SCORE_API,
        data: parameters,
      }),
    );
  });
};
export const hitCrifAnswerApi = (
  crifOrderId,
  crifReportId,
  crifEncode,
  userAnser,
  cityfurnishOrderId,
) => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      order_id: crifOrderId,
      report_id: crifReportId,
      encode: crifEncode,
      answer: userAnser,
      placed_order_id: cityfurnishOrderId,
    };
    let appUser = AppUser.getInstance();
    let token = appUser.token;
    let Userid = appUser.userId;
    const Url = ApiEndpoints(VERIFY_CRIF_ANSWER_API);
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
        label: VERIFY_CRIF_ANSWER_API,
        data: parameters,
      }),
    );
  });
};

export const hitChatBotQueryRequestApi = (
  chatName,
  chatMobile,
  chatEmail,
  chatDealCodeNumber,
  chatQuery,
) => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      name: chatName,
      email: chatEmail,
      mobile: chatMobile,
      order_id: chatDealCodeNumber,
      query: chatQuery,
    };
    const Url = ApiEndpoints(CHATBOT_QUERY_REQUEST_API);
    dispatch(
      ApiSingleton.getInstance().apiActionCall({
        url: Url,
        method: POST,
        headersOverride: {
          'Content-Type': 'multipart/form-data',
        },
        onSuccess: async data => {
          resolve(data);
        },
        onFailure: error => {
          reject(error);
        },
        label: CHATBOT_QUERY_REQUEST_API,
        data: parameters,
      }),
    );
  });
};
