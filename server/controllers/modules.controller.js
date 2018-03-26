const Module = require("../models/module");

class ModulesController {
  index(req, res) {
    let server = res.locals.server;

    return server.getModules()
      .map((module) => module.toJson())
      .toArray()
      .subscribe(
        (module) => {
          res.json({ modules: module });
        }
      );
  }

  view(req, res) {
    let nix = req.app.locals.nix;
    let server = res.locals.server;
    let moduleName = req.params.moduleName;

    return Module.getModule(nix, moduleName, server)
      .map((module) => module.toJson())
      .subscribe(
        (module) => {
          res.json({module });
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

  enable(req, res) {
    let nix = req.app.locals.nix;
    let server = res.locals.server;
    let moduleName = req.params.moduleName;

    return Module.getModule(nix, moduleName, server)
      .flatMap((module) => {
        let moduleService = nix.getService("core", "ModuleService");
        return moduleService.enableModule(server.id, module.name)
      })
      .subscribe(
        () => {
          res.status(200).json({enabled: true});
        },
        (error) => {
          switch (error.message) {
            case 'Module does not exist':
              return res.status(404).json({error: "Module not found"});
            case 'Module is already enabled':
              return res.status(200).json({ enabled: true });
            default:
              throw error;
          }
        }
      );
  }

  disable(req, res) {
    let nix = req.app.locals.nix;
    let server = res.locals.server;
    let moduleName = req.params.moduleName;

    return Module.getModule(nix, moduleName, server)
      .flatMap((module) => {
        let moduleService = nix.getService("core", "ModuleService");
        return moduleService.disableModule(server.id, module.name)
      })
      .subscribe(
        () => {
          return res.status(200).json({enabled: false});
        },
        (error) => {
          switch (error.name) {
            case "ModuleCanNotBeDisabled":
              return res.status(400).json({ error: `Module '${moduleName}' can not be disabled` });
            default:
              break; // and check the error message
          }

          switch (error.message) {
            case 'Module does not exist':
              return res.status(404).json({error: "Module not found"});
            case 'Module is already disabled':
              return res.status(200).json({enabled: false});
            default:
              throw error;
          }
        }
      );
  }
}

module.exports = ModulesController;
