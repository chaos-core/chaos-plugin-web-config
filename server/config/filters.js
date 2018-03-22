const Rx = require('rx');

const Server = require('../models/server');

module.exports = {
  authorize(req, res, next) {
    let JwtManager = req.app.locals.services.JwtManager;

    return JwtManager
      .getAuthToken(req)
      .then((authToken) => JwtManager.decodeToken(authToken))
      .then((payload) => {
        res.locals.jwt = payload;
        res.locals.userId = payload.userId;
        next();
      })
      .catch((error) => {
        switch (error.name) {
          case "MissingAuthTokenError":
          case "TokenExpiredError":
          case "JsonWebTokenError":
            return res
              .status(401)
              .json({error: "Not authorized"});
          default:
            return next(error);
        }
      });
  },

  userIsAdmin(req, res, next) {
    let nix = req.app.locals.nix;
    let userId = res.locals.userId;
    let guildId = req.params.guildId;

    return Rx.Observable
      .of(nix.discord.guilds.get(guildId))
      .flatMap((guild) =>
        Rx.Observable.if(
          () => guild,
          Rx.Observable.of(guild).map((guild) => new Server(nix, guild)),
          Rx.Observable.throw({name: "GuildNotFound"}),
        )
      )
      .flatMap((server) =>
        server.isUserAnAdmin(userId)
          .flatMap((isAdmin) =>
            Rx.Observable.if(
              () => isAdmin,
              Rx.Observable.of(server),
              Rx.Observable.throw({name: "NotAuthorized"})
            )
          )
      )
      .subscribe(
        (server) => {
          res.locals.server = server;
          next();
        },
        (error) => {
          switch (error.name) {
            case "NotAuthorized":
            case "GuildNotFound":
              return res.status(404).json({error: "Guild not found"});
            default:
              throw next(error);
          }
        }
      )
  },
};
