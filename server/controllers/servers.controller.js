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

  view(req, res) {
    let nix = req.app.locals.nix;
    let guildId = req.params.id;

    Rx.Observable
      .of(nix.discord.guilds.get(guildId))
      .map((guild) => {
        if (!guild) { throw {
          name: "GuildNotFoundError",
          message: `Guild with id '${guildId}' was not found`};
        }
        return guild;
      })
      .subscribe(
        (guild) => {
          res.json({
            server: {
              id: guild.id,
              name: guild.name,
            },
          });
        },
        (error) => {
          switch(error.name) {
            case "GuildNotFoundError":
              return res
                .status(400)
                .json({error: error.message});
            default:
              throw error;
          }
        }
      );
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
