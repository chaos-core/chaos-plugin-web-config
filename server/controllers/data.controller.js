const NixApiController = require('../lib/nix-api-controller');

class DataController extends NixApiController {
  read(req, res) {
    this.nix.dataService
      .getGuildData(req.params.guildId, req.params.keyword)
      .subscribe(
        (data) => {
          res.send({data});
        },
        (error) => {
          res.send({error});
        },
      );
  }
}

module.exports = DataController;
