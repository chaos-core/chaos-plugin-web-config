import Request from 'request-promise';

import Config from './config';

const LSKEY_ACCESS_TOKEN = 'auth.accessToken';
const LSKEY_USER = 'auth.user';

class NixApiService {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }

  post(path, data) {
    return Request.post({
      url: this.serverUrl + path,
      json: true,
      body: data,
      headers: { Authorization: this.accessToken },
    })
  }

  get(path) {
    return Request.get({
      url: this.serverUrl + path,
      json: true,
      headers: { Authorization: this.accessToken },
    })
  }

  login(discordToken) {
    return this.post('/login', { code: discordToken })
      .then((res) => {
        localStorage.setItem(LSKEY_ACCESS_TOKEN, res.access_token);
        return this.getUserInfo()
      })
      .then((res) => {
        localStorage.setItem(LSKEY_USER, JSON.stringify(res.user));
      });
  }

  getUserInfo() {
    return this.get('/user');
  }

  logout() {
    return new Promise((resolve) => {
      localStorage.removeItem(LSKEY_ACCESS_TOKEN);
      resolve();
    });
  }

  get userIsLoggedIn() {
    return this.user !== null;
  }

  get user() {
    if(this.accessToken === null) {
      localStorage.removeItem(LSKEY_USER);
    }

    return JSON.parse(localStorage.getItem(LSKEY_USER));
  }

  get accessToken() {
    return localStorage.getItem(LSKEY_ACCESS_TOKEN);
  }
};

export default new NixApiService(Config.serverUrl);
