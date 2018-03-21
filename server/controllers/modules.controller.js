const Rx = require('rx');

const Server = require('../models/server');

class ModulesController {
  index(req, res) {
    let nix = req.app.locals.nix;
    let guildId = req.params.id;
    let userId = res.locals.userId;

    let ModuleService = nix.getService('core', 'ModuleService');

    return Rx.Observable
      .of(nix.discord.guilds.get(guildId))
      .flatMap((guild) =>
        Rx.Observable.if(
          () => guild,
          Rx.Observable.of(guild).map((guild) => new Server(nix, guild)),
          Rx.Observable.throw({ name: "GuildNotFound" }),
        )
      )
      .flatMap((server) =>
        server.isUserAnAdmin(userId)
          .flatMap((isAdmin) =>
            Rx.Observable.if(
              () => isAdmin,
              Rx.Observable.of(server),
              Rx.Observable.throw({ name: "NotAuthorized" })
            )
          )
      )
      .flatMap((server) =>
        Rx.Observable
          .from(Object.values(ModuleService.modules))
          .flatMap((module) =>
            ModuleService.isModuleEnabled(server.id, module.name)
              .map((isEnabled) => ({
                name: module.name,
                enabled: isEnabled
              }))
          )
          .toArray()
      )
      .subscribe(
        (modules) => {
          res.json({ modules });
        },
        (error) => {
          switch (error.name) {
            case "NotAuthorized":
            case "GuildNotFound":
              return res.status(404).json({ error: "Guild not found" });
            default:
              throw error;
          }
        }
      );
  }
}

module.exports = ModulesController;
