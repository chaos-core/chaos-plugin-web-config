const Rx = require('rx');

const Server = require('../models/server');

class ServersController {
  index(req, res) {
    let nix = req.app.locals.nix;
    let userId = res.locals.userId;

    Rx.Observable
      .from(nix.discord.guilds.array())
      .map((guild) => new Server(nix, guild))
      .flatMap((server) => server.isUserAnAdmin(userId).filter(Boolean).map(() => server))
      .map((server) => server.toJson())
      .toArray()
      .subscribe((servers) => {
        res.json({ servers });
      });
  }

  view(req, res) {
    let server = res.locals.server;

    return res.json({
      server: server.toJson(),
    });
  }
}

module.exports = ServersController;
