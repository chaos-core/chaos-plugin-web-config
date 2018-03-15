const DiscordRestClient = require('../discord-rest-client');
const jwt = require('jsonwebtoken');

ALGORITHM = "HS256";

class AuthService {
  constructor(app, config) {
    this.app = app;
    this.config = config;
  }

  getAuthToken(req) {
    return new Promise(
      (resolve, reject) => {
        let authToken = req.header('Authorization');

        if (!authToken) {
          return reject({
            name: "MissingAuthTokenError",
            message: "Invalid Authorization header",
          });
        }

        return resolve(authToken);
      });
  }

  loginDiscord(discordCode) {
    let redirectUri = this.config.clientUrl + this.config.oAuthRedirectPath;

    return DiscordRestClient
      .verifyCode({
        clientId: this.config.discordClientId,
        clientSecret: this.config.discordClientSecret,
        code: discordCode,
        redirectUri: redirectUri,
      })
      .then((response) => {
        return this.createToken({
          discordToken: response.access_token,
        }, {
          expiresIn: response.expires_in
        });
      })
  }

  createToken(payload, options) {
    return new Promise(
      (resolve, reject) => {
        options.algorithm = ALGORITHM;

        jwt.sign( payload, this.config.tokenSecret, options, (err, token) => {
          err ? reject(err) : resolve(token);
        });
      }
    )
  }

  decodeToken(token) {
    return new Promise(
      (resolve, reject) => {
        let options = {
          algorithms: [ALGORITHM],
        };

        jwt.verify(token, this.config.tokenSecret, options, (err, payload) => {
          err ? reject(err) : resolve(payload);
        })
      }
    )
  }
}

module.exports = AuthService;
