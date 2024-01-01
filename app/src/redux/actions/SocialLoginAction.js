import ApiEndpoints from '../../apimanager/ApiEndpoint';
import {
  SOCIAL_LOGIN_API,
  LINKEDIN_USER_API,
  FACEBOOK_USER_API,
  DIRECT_SOCIAL_LOGIN_API,
} from '../../apimanager/ApiEndpoint';
import ApiSingleton from '../../apimanager/ApiSingleton';
import {POST, GET} from '../../apimanager/RequestMethods';

//POST SOCIAL LOGIN REQUEST
export const hitSocialLoginApi = (
  firstName,
  lastName,
  emailId,
  loginType,
  socialLoginId,
) => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      first_name: firstName,
      last_name: lastName, // optional
      email: emailId,
      mobile_number: 0, // optional
      login_type: loginType,
      social_login_id: socialLoginId,
    };
    const Url = ApiEndpoints(SOCIAL_LOGIN_API);
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
        label: SOCIAL_LOGIN_API,
        data: parameters,
      }),
    );
  });
};

//POST SOCIAL LinkedIN LOGIN REQUEST
export const hitLinkedinApiToGetUser = accessToken => dispatch => {
  return new Promise((resolve, reject) => {
    const Url = ApiEndpoints(LINKEDIN_USER_API);
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
        label: LINKEDIN_USER_API,
        headersOverride: {
          Host: 'api.linkedin.com',
          Connection: 'Keep-Alive',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
    );
  });
};

export const hitDirectSocialLoginApi = (
  social_login_id,
  login_type,
  socialName,
  socialEmail,
  socialMobile,
) => dispatch => {
  return new Promise((resolve, reject) => {
    const parameters = {
      social_login_id: social_login_id,
      login_type: login_type,
      name: socialName,
      email: socialEmail,
      mobile_no: socialMobile,
    };
    // console.log("hitDirectSocialLoginApi",parameters)
    const Url = ApiEndpoints(DIRECT_SOCIAL_LOGIN_API);
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
        label: DIRECT_SOCIAL_LOGIN_API,
        data: parameters,
      }),
    );
  });
};
//POST SOCIAL FB LOGIN REQUEST
export const hitFacebookApiToGetUser = accessToken => dispatch => {
  return new Promise((resolve, reject) => {
    let Url = ApiEndpoints(FACEBOOK_USER_API);
    Url = `${Url}${accessToken}`;
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
        label: LINKEDIN_USER_API,
      }),
    );
  });
};
