class DataController {
  read(req, res) {
    req.app.locals.nix.dataService
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
