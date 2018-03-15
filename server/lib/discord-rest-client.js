const Request = require('request-promise');

const discordUrl = 'https://discordapp.com/api';

class DiscordWebClient {
  constructor(discordToken) {
    this.discordToken = discordToken;
  }

  handleDiscordError(error) {
    throw {
      name: 'DiscordAPIError',
      message: error.message,
      code: error.code
    }
  }

  get(path) {
    return Request
      .get({
        url: discordUrl + path,
        headers: { 'Authorization': `Bearer ${this.discordToken}` }
      })
      .then((response) => JSON.parse(response))
      .catch((response) => {
        let error = JSON.parse(response.error);
        this.handleDiscordError(error);
      });
  }

  static verifyCode({ clientId, clientSecret, code, redirectUri }) {
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
    return this.get(`/users/@me`);
  }
}

module.exports = DiscordWebClient;
