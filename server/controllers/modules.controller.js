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

  edit(req, res) {

  }
}

module.exports = ModulesController;
