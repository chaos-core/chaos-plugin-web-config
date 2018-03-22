const Module = require("./module");

const Rx = require('rx');

class Server {
  constructor(nix, guild) {
    this.nix = nix;
    this.guild = guild;
  }

  get id() {
    return this.guild.id;
  }

  get name() {
    return this.guild.name;
  }

  get icon() {
    return this.guild.icon;
  }

  isUserAnAdmin(userId) {
    let permissionsService = this.nix.permissionsService;

    return Rx.Observable
      .fromPromise(this.guild.fetchMember(userId))
      .map((member) => ({
        guild: this.guild,
        member: member,
      }))
      .flatMap((context) => permissionsService.hasPermission(context, 'config'));
  }

  getModules() {
    let ModuleService = this.nix.getService('core', 'ModuleService');

    return Rx.Observable
      .from(Object.values(ModuleService.modules))
      .flatMap((module) => Module.getModule(this.nix, module.name, this));
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      iconId: this.icon,
    }
  }
};

module.exports = Server;
