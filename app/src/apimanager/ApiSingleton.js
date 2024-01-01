import {API} from './types';

let instance = null;

class ApiSingleton {
  constructor() {
    if (!instance) {
      this.instance = this;
    }
    return instance;
  }

  static getInstance = () => {
    return new ApiSingleton();
  };

  //--------------- API REQUESTING ------------------//

  // METHOD: TO RETURN ACTION FOR API_MIDDLEWARE FOR API CALLS
  apiActionCall = ({
    url = '',
    method = 'GET',
    data = null,
    accessToken = null,
    onSuccess = () => {},
    onFailure = () => {},
    label = '',
    headersOverride = null,
  }) => {
    //return action object of type='API'
    // console.log("headersOverride",headersOverride)
    return {
      type: API,
      payload: {
        url,
        method,
        data,
        accessToken,
        onSuccess,
        onFailure,
        label,
        headersOverride,
      },
    };
  };
}

export default ApiSingleton;
