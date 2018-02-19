const express = require('express');

const HomeController = require('./controllers/home');
const DataController = require('./controllers/data');

module.exports = function (nix) {
  let router = express.Router();

  let home = new HomeController(nix);
  let data = new DataController(nix);

  router.get('/', (req, res) => home.index(req, res));

  router.get('/data/read/:guildId/:keyword', (req, res) => data.read(req, res));

  return router;
};


