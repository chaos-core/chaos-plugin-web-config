const DiscordRestClient = require('../lib/discord-rest-client');

class LoginController{
  login(req, res, next) {
    let AuthService = req.app.locals.services.AuthService;

    AuthService
      .loginDiscord(req.body.code)
      .then((jwt) => {
        res
          .status(200)
          .json({
            msg: 'Verified',
            accessToken: jwt,
          });
      })
      .catch((error) => next(error));
  }

  userInfo(req, res, next) {
    let discordToken = res.locals.jwt.discordToken;
    let discordClient = new DiscordRestClient(discordToken);

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
      .catch((error) => {
        switch(error.name) {
          case "DiscordAPIError":
            if (error.message === "401: Unauthorized") {
              return res.status(401).json({error: "Not authorized"});
            }
            else {
              return next(error);
            }
          default:
            return next(error);
        }
      });
  }
}

module.exports = LoginController;
