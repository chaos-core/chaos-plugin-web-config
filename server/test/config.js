module.exports = {
  ownerUserId: '193881375382700033',
  loginToken: 'MzYzNzI5ODkxNTI4NjcxMjQy.DLFdcA.nuDSFNme_mC_E4WONoOnRrzLyc0',

  webServer: {
    port: 3001,
    serveClient: false,
    clientUrl: 'http://localhost:3000',

    oAuthRedirectPath: '/login/verify',

    discordClientId: '363729891528671242',
    discordClientSecret: 't6C-sX7sITvlXgYx520FuSmaqI3bsZHi',

    // Use password to encrypt Web Tokens
    tokenSecret: 'w5cWE8jN0UdzJLwVNJuxyhMQ40yxcZ5LG0u7sfkP',
  },

  logger: {
    level: 'silly',
  },
};
