import Request from 'request-promise';

import Config from './config';

let _accessToken = null;

class NixApiService {
  static login(discordToken) {
    return Request
      .post(Config.serverUrl + '/login', {
        url: Config.serverUrl + '/login',
        json: true,
        body: {
          code: discordToken,
        },
      })
      .then((response) => {
        this.accessToken = response.access_token;
      });
  }

  static logout() {
    return new Promise((resolve) => {
      this.accessToken = null;
      resolve();
    })
  }

  static get userIsLoggedIn() {
    return this.accessToken !== null;
  }

  static get accessToken() {
    if (!_accessToken) {
      _accessToken = localStorage.getItem('auth.accessToken')
    }

    return _accessToken;
  }

  static set accessToken(value) {
    _accessToken = value;

    if (value !== null) {
      localStorage.setItem('auth.accessToken', value);
    }
    else {
      localStorage.removeItem('auth.accessToken');
    }
  }
};

export default NixApiService;
