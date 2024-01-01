import ApiSingleton from './ApiSingleton';
import AppUser from '../appsingleton/AppUser';
import Store from '../../redux/AppStore';

class Network {
  mMethod = '';
  mUrl = '';
  mBody = {};
  mHeader = {};
  mLabel = '';

  setMethod = method => {
    this.mMethod = method;
  };
  setUrl = url => {
    this.mUrl = url;
  };
  setBody = body => {
    this.mBody = body;
  };
  setHeader = header => {
    this.mHeader = header;
    return this;
  };
  setLabel = label => {
    this.mLabel = label;
  };

  execute = () => {
    const headers = {
      app_language: 'en',
      app_version: '1.0',
      ...this.mHeader,
    };
    const authToken = AppUser.getInstance().token;
    if (authToken && authToken != '') {
      headers.authorization = authToken;
    }
    const executor = (resolve, reject) => {
      try {
        const onSuccessCallback = data => {
          resolve(data);
          console.log('api response -----', data);
        };
        const onFailureCallback = error => {
          reject(error);
        };
        const apiActionPayload = {
          url: this.mUrl,
          method: this.mMethod,
          data: this.mBody,
          onSuccess: onSuccessCallback,
          onFailure: onFailureCallback,
          label: this.mLabel,
          headersOverride: headers,
        };
        const apiCallAction = ApiSingleton.getInstance().apiActionCall(
          apiActionPayload,
        );
        Store.dispatch(apiCallAction);
      } catch (error) {
        reject(error);
      }
    };
    return new Promise(executor);
  };
}

class Get extends Network {
  constructor(url) {
    super();
    this.setMethod('GET');
    this.setUrl(url);
  }

  withLabel = l => {
    this.setLabel(l);
    return this;
  };
}

class Post extends Network {
  constructor(url, body) {
    super();
    this.setMethod('POST');
    this.setUrl(url);
    this.setBody(body);
  }

  withLabel = l => {
    this.setLabel(l);
    return this;
  };
}

class Delete extends Network {
  constructor(url, body) {
    super();
    this.setMethod('DELETE');
    this.setUrl(url);
    if (body) {
      this.setBody(body);
    }
  }

  withLabel = l => {
    this.setLabel(l);
    return this;
  };
}

export {Get, Post, Delete};
