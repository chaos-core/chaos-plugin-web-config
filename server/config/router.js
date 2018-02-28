const express = require('express');

const HomeController = require('../controllers/home.controller');
const DataController = require('../controllers/data.controller');
const LoginController = require('../controllers/login.controller');

module.exports = function (nix) {
  let router = express.Router();

  let home = new HomeController(nix);
  let data = new DataController(nix);
  let login = new LoginController(nix);

  router.get('/', (req, res) => home.index(req, res));

  router.post('/login', (req, res) => login.login(req, res));
  router.get('/user', (req, res) => login.userInfo(req, res));

  router.get('/data/read/:guildId/:keyword', (req, res) => data.read(req, res));

  return router;
};


