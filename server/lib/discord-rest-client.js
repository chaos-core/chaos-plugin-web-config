const Request = require('request-promise');

const discordUrl = 'https://discordapp.com/api';

class DiscordWebClient {
  constructor(authToken) {
    this.authToken = authToken;
  }

  static validateCode({ clientId, clientSecret, code, redirectUri }) {
    let data = {
      'client_id': clientId,
      'client_secret': clientSecret,
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': redirectUri
    };

    return Request
      .post(`${discordUrl}/oauth2/token`, { form: data })
      .then((response) => JSON.parse(response));
  }

  me() {

  }
}

module.exports = DiscordWebClient;
