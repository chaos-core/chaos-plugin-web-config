const Rx = require('rx');

class ServersController {
  index(req, res) {
    let nix = req.app.locals.nix;
    let userId = res.locals.userId;

    Rx.Observable
      .from(nix.discord.guilds.array())
      .flatMap((guild) => filterUserIsAdmin(nix, guild, userId))
      .map((guild) => filterGuildProps(guild))
      .toArray()
      .subscribe((guilds) => {
        res.json({ servers: guilds });
      });
  }

  view(req, res) {
    let nix = req.app.locals.nix;
    let userId = res.locals.userId;
    let guildId = req.params.id;

    Rx.Observable
      .of(nix.discord.guilds.get(guildId))
      .filter((guild) => guild)
      .flatMap((guild) => filterUserIsAdmin(nix, guild, userId))
      .map((guild) => filterGuildProps(guild))
      .defaultIfEmpty(null)
      .subscribe(
        (server) => {
          if (server) {
            return res.json({ server });
          }
          else {
            return res.status(400).json({ error: "Server not found" });
          }
        },
        (error) => handleError(res, error),
      );
  }
}

function handleError(res, error) {
  switch (error.name) {
    case "GuildNotFoundError":
      return res
        .status(400)
        .json({error: error.message});
    default:
      throw error;
  }
}

function filterGuildProps(guild) {
  return {
    id: guild.id,
    name: guild.name,
    iconId: guild.icon,
  }
}

function filterUserIsAdmin(nix, guild, userId) {
  return Rx.Observable
    .fromPromise(guild.fetchMember(userId))
    .map((member) => ({ guild, member }))
    .flatMap((context) => nix.permissionsService.filterHasPermission(context, 'config'))
    .map(() => guild);
}

module.exports = ServersController;
