const Path = require('path');

module.exports = {
  ownerUserId: "ownerUserId",
  loginToken: "loginToken",

  webServer: {
    port: 3000,
    clientUrl: 'https://localhost:3000',

    discordClientId: 'some_string',
    discordClientSecret: 'some_string',

    oAuthRedirectPath: '/login/verify',

    tokenSecret: 'some_string',
  },

  logger: {
    level: 'info',
  },

  dataSource: {
    type: 'disk',
    dataDir: Path.join(__dirname, '../data'),
  },
};
