const Rx = require('rx');

class ModulesController {
  index(req, res) {
    let nix = req.app.locals.nix;
    let guildId = req.params.id;

    let ModuleService = nix.getService('core', 'ModuleService');

    Rx.Observable
      .from(Object.values(ModuleService.modules))
      .flatMap((module) =>
        ModuleService
          .isModuleEnabled(guildId, module.name)
          .map((isEnabled) => ({ module, isEnabled }))
      )
      .map(({module, isEnabled}) => ({
        name: module.name,
        enabled: isEnabled
      }))
      .toArray()
      .subscribe(
        (modules) => {
          if (modules) {
            return res.json({modules});
          }
          else {
            return res.status(400).json({error: "Server not found"});
          }
        },
        (error) => handleError(res, error),
      );
  }
}

module.exports = ModulesController;
