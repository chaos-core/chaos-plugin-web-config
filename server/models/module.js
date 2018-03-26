const Rx = require('rx');

class Module {
  static getModule(nix, moduleName, server) {
    let ModuleService = nix.getService('core', 'ModuleService');

    return Rx.Observable.of(moduleName)
      .map((moduleName) => ModuleService.getModule(moduleName))
      .map((module) => new Module(nix, module))
      .flatMap((module) =>
        ModuleService.isModuleEnabled(server.id, module.name)
          .map((isEnabled) => {
            module._enabled = isEnabled;
            return module;
          })
      )
  }

  constructor(nix, module) {
    this.nix = nix;
    this.module = module;
    this._enabled = null;
  }

  get name() {
    return this.module.name;
  }

  get enabled() {
    return this._enabled;
  }

  get configActions() {
    return this.module.configActions;
  }

  get canBeDisabled() {
    return this.module.canBeDisabled;
  }

  toJson() {
    return {
      name: this.name,
      enabled: this.enabled,
      actions: this.configActions,
      canBeDisabled: this.canBeDisabled,
    }
  }
}

module.exports = Module;
