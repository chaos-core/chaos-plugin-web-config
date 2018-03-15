import Request from 'request-promise';
import jwt from 'jsonwebtoken';

import Config from '../config';

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
        console.log("JWT:", jwt.decode(res.accessToken));

        localStorage.setItem(LSKEY_ACCESS_TOKEN, res.accessToken);
        return this.getUser()
      })
      .then((res) => {
        localStorage.setItem(LSKEY_USER, JSON.stringify(res.user));
      });
  }

  getUser() {
    return this.get('/user')
      .then((response) => response.user);
  }

  logout() {
    return new Promise((resolve) => {
      localStorage.removeItem(LSKEY_ACCESS_TOKEN);
      resolve();
    });
  }

  get userIsLoggedIn() {
    return this.accessToken !== null;
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
