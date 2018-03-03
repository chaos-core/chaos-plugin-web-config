const express = require('express');
const routes = require('../config/routes');

function Router(nix) {
  let router = express.Router();

  Object
    .entries(routes())
    .map(([key, routeFunctions]) => {
      let [method, path] = key.split(/ +/);
      nix.logger.debug(`NixModWeb: Adding route: ${method} ${path}`);

      router[method.toLowerCase()](path, routeFunctions);
    });

  return router;
};

module.exports = Router;
