const NixApiController = require('../lib/nix-api-controller');
const DiscordRestClient = require('../lib/discord-rest-client');

class LoginController extends NixApiController {
  login(req, res) {
    DiscordRestClient
      .validateCode({
        clientId: this.nix.config.discordApp.client_id,
        clientSecret: this.nix.config.discordApp.client_secret,
        code: req.body.code,
        redirectUri: this.nix.config.webServer.clientUrl + '/login/verify',
      })
      .then((response) => {
        res
          .status(200)
          .json({
            msg: 'Verified',
            access_token: response.access_token
          });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({
            msg: 'error',
            error
          });
      });
  }

  userInfo(req, res) {
    let authToken = req.header('Authorization');

    if(!authToken) {
      return res
        .status(401)
        .json({
          error: "Authorization header missing"
        })
    }

    let discordClient = new DiscordRestClient(authToken);

    discordClient.me()
      .then((data) => {
        return res
          .status(200)
          .json({
            user: {
              username: `${data.username}#${data.discriminator}`,
              id: data.id,
              avatar_id: data.avatar
            },
          });
      })
  }
}

module.exports = LoginController;
