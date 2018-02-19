const ApiController = require('../api-controller');

class DataController extends ApiController {
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
