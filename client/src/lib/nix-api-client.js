import Request from 'request-promise';

import Config from '../config';

import {push} from 'react-router-redux';
import {LOGOUT, SET_TOKEN} from "../actions/auth.actions";

import store from './redux-store';

class NixApiClient {
  handleErrorResponse(errorResponse) {
    switch (errorResponse.statusCode) {
      case 401:
        store.dispatch(LOGOUT());
        store.dispatch(push('/'));
        return;
      default:
        throw errorResponse;
    }
  }

  post(path, data) {
    return Request
      .post({
        url: Config.serverUrl + path,
        json: true,
        body: data,
        headers: { Authorization: store.getState().auth.token },
      })
      .catch((error) => this.handleErrorResponse(error));
  }

  get(path) {
    return Request
      .get({
        url: Config.serverUrl + path,
        json: true,
        headers: { Authorization: store.getState().auth.token },
      })
      .catch((error) => this.handleErrorResponse(error));
  }

  login(discordToken) {
    return this.post('/login', { code: discordToken })
      .then((res) => store.dispatch(SET_TOKEN(res.accessToken)));
  }

  getUser() {
    return this.get('/user').then((response) => response.user);
  }

  fetchServers() {
    return this.get('/servers').then((response) => response.servers);
  }

  fetchServer(serverId) {
    return this.get(`/server/${serverId}`).then((response) => response.server);
  }
}

export default new NixApiClient();
