const express = require('express');

const HomeController = require('../controllers/home.controller');
const DataController = require('../controllers/data.controller');
const LoginController = require('../controllers/login.controller');

module.exports = function (nix) {
  let router = express.Router();

  let controllers = {
    "home": new HomeController(nix),
    "data": new DataController(nix),
    "login": new LoginController(nix),
  };

  const routes = {
    'GET  /': 'home.index',

    'POST /login': 'login.login',
    'GET  /user': 'login.userInfo',

    'GET /data/read/:guildId/:keyword': 'data.read',
  };

  Object
    .entries(routes)
    .map(([key, value]) => {
      let [method, path] = key.split(/ +/);
      let [controller, action] = value.split('.');

      nix.logger.debug(`NixModWeb: Adding route: ${method} ${path} => ${controller}.${action}`);

      method = method.toLowerCase();
      controller = controllers[controller];
      action = controller[action].bind(controller);

      router[method](path, action);
    });

  return router;
};
