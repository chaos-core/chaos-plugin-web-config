const ApiController = require('../api-controller');
const DiscordRestClient = require('../lib/discord-rest-client');

class LoginController extends ApiController {
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
}

module.exports = LoginController;
