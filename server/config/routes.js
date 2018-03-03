const HomeController = require('../controllers/home.controller');
const LoginController = require('../controllers/login.controller');
const DataController = require('../controllers/data.controller');

function Routes() {
  let home = new HomeController();
  let login = new LoginController();
  let data = new DataController();

  return {
    'GET  /': home.index,

    'POST /login': login.login,
    'GET  /user': login.userInfo,

    'GET /data/read/:guildId/:keyword': data.read,
  }
};

module.exports = Routes;
