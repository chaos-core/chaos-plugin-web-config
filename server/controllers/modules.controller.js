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

  view(req, res) {
    let nix = req.app.locals.nix;
    let server = res.locals.server;
    let moduleName = req.params.moduleName;

    let ModuleService = nix.getService('core', 'ModuleService');

    return Rx.Observable.of(moduleName)
      .map((moduleName) => ModuleService.getModule(moduleName))
      .flatMap((module) =>
        ModuleService.isModuleEnabled(server.id, module.name)
          .map((isEnabled) => {
            module.enabled = isEnabled;
            return module;
          })
      )
      .map((module) => ({
        name: module.name,
        enabled: module.enabled,
        actions: module.configActions,
      }))
      .subscribe(
        (module) => {
          res.json({ module });
        },
        (error) => {
          switch (error.message) {
            case 'Module does not exist':
              return res.status(404).json({error: "Module not found"});
            default:
              throw error;
          }
        }
      )
  }

  edit(req, res) {

  }
}

module.exports = ModulesController;
