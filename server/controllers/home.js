const ApiController = require('../api-controller');

class HomeController extends ApiController {
  index(req, res) {
    res.send('Hello World');
  }
}

module.exports = HomeController;
