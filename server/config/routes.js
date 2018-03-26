const HomeController = require('../controllers/home.controller');
const LoginController = require('../controllers/login.controller');
const DataController = require('../controllers/data.controller');
const ServersController = require('../controllers/servers.controller');
const ModulesController = require('../controllers/modules.controller');

const filters = require('./filters');

function Routes() {
  let home = new HomeController();
  let login = new LoginController();
  let data = new DataController();
  let servers = new ServersController();
  let modules = new ModulesController();

  return {
    'GET /': home.index,

    'POST /login': login.login,
    'GET /user': [
      filters.authorize,
      login.userInfo
    ],

    'GET /servers': [
      filters.authorize,
      servers.index
    ],
    'GET /server/:guildId': [
      filters.authorize,
      filters.userIsAdmin,
      servers.view
    ],

    'GET /server/:guildId/modules': [
      filters.authorize,
      filters.userIsAdmin,
      modules.index
    ],
    'GET /server/:guildId/:moduleName': [
      filters.authorize,
      filters.userIsAdmin,
      modules.view
    ],
    'PATCH /server/:guildId/:moduleName/enable': [
      filters.authorize,
      filters.userIsAdmin,
      modules.enable
    ],

    'GET /data/read/:guildId/:keyword': data.read,
  }
}

module.exports = Routes;
