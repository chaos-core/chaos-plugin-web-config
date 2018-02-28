const NixApiController = require('../lib/nix-api-controller');

class HomeController extends NixApiController {
  index(req, res) {
    res.send('Hello World');
  }
}

module.exports = HomeController;
