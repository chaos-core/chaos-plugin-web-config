const Rx = require('rx');

const Server = require('../models/server');

class ServersController {
  index(req, res) {
    let nix = req.app.locals.nix;
    let userId = res.locals.userId;

    Rx.Observable
      .from(nix.discord.guilds.array())
      .map((guild) => new Server(nix, guild))
      .flatMap((server) => server.isUserAnAdmin(userId).filter(Boolean).mapTo(server))
      .map((server) => server.toJson())
      .toArray()
      .subscribe((servers) => {
        res.json({ servers });
      });
  }

  view(req, res) {
    let nix = req.app.locals.nix;
    let userId = res.locals.userId;
    let guildId = req.params.id;

    Rx.Observable
      .of(nix.discord.guilds.get(guildId))
      .filter(Boolean)
      .map((guild) => new Server(nix, guild))
      .flatMap((server) => server.isUserAnAdmin(userId).filter(Boolean).map(() => server))
      .map((server) => server.toJson())
      .defaultIfEmpty(undefined)
      .subscribe((server) => {
        if (server) {
          return res.json({ server });
        }
        else {
          return res.status(404).json({ error: "Server not found" });
        }
      });
  }
}

module.exports = ServersController;
