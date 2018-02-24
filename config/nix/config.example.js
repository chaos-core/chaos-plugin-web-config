const Path = require('path');

module.exports = {
  ownerUserId: "ownerUserId",
  loginToken: "loginToken",

  webServer: {
    port: 3000,
  },

  logger: {
    level: 'info',
  },

  dataSource: {
    type: 'disk',
    dataDir: Path.join(__dirname, '../data'),
  },
};
