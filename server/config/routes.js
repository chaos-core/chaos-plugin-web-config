const HomeController = require('../controllers/home.controller');
const LoginController = require('../controllers/login.controller');
const DataController = require('../controllers/data.controller');

const filters = require('./filters');

function Routes() {
  let home = new HomeController();
  let login = new LoginController();
  let data = new DataController();

  return {
    'GET  /': home.index,

    'POST /login': login.login,
    'GET  /user': [filters.authorize, login.userInfo],

    'GET /data/read/:guildId/:keyword': data.read,
  }
};

module.exports = Routes;
