const Rx = require('rx');

class ModulesController {
  index(req, res) {
    let nix = req.app.locals.nix;
    let server = res.locals.server;

    let ModuleService = nix.getService('core', 'ModuleService');
    return  Rx.Observable.from(Object.values(ModuleService.modules))
      .flatMap((module) =>
        ModuleService.isModuleEnabled(server.id, module.name)
          .map((isEnabled) => ({
            name: module.name,
            enabled: isEnabled
          }))
      )
      .toArray()
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
