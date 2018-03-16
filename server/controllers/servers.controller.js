const Rx = require('rx');

class ServersController {
  index(req, res) {
    let nix = req.app.locals.nix;
    let userId = res.locals.userId;

    Rx.Observable
      .from(nix.discord.guilds.array())
      .flatMap((guild) => filterUserIsAdmin(nix, guild, userId))
      .map((guild) => ({
        id: guild.id,
        name: guild.name,
        iconId: guild.icon,
      }))
      .toArray()
      .subscribe((guilds) => {
        res.json({ servers: guilds });
      });
  }
}

function filterUserIsAdmin(nix, guild, userId) {
  return Rx.Observable
    .of('')
    .flatMap(() => guild.fetchMember(userId))
    .map((member) => ({guild, member}))
    .flatMap((context) => nix.permissionsService.filterHasPermission(context, 'config'))
    .map(() => guild);
}

module.exports = ServersController;
