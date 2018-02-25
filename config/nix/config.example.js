const Path = require('path');

module.exports = {
  ownerUserId: "ownerUserId",
  loginToken: "loginToken",

  discordApp: {
    client_id: 'some_id',
    client_secret: 'some_string',
  },

  webServer: {
    port: 3000,
    clientUrl: 'http://localhost:3000'
  },

  logger: {
    level: 'info',
  },

  dataSource: {
    type: 'disk',
    dataDir: Path.join(__dirname, '../data'),
  },
};
