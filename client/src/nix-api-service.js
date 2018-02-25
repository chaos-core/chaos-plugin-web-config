import Request from 'request-promise';

import Config from './config';

let accessToken = null;

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
        accessToken = response.access_token;
      });
  }

  static get userIsLoggedIn() {
    return accessToken !== null;
  }
};

export default NixApiService;
