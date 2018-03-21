const Path = require('path');
const Rx = require('rx');

const ApiServer = require('./api-server');

class WebServerService {
  constructor(nix) {
    this.nix = nix;
    this.config = Object.assign({
      port: 3000,
      clientUrl: 'https://localhost:3000',

      serveClient: true,
      clientSrc: Path.resolve(__dirname, './client/build'),

      discordClientId: null,
      discordClientSecret: null,
      discordApiUrl: 'https://discordapp.com/api',

      oAuthRedirectPath: '/login/verify',

      tokenSecret: null,
    }, nix.config.webServer);

    this.apiServer = new ApiServer(this.nix, this.config)
  }

  onNixListen() {
    this.nix.logger.info(`NixModWeb: Starting web server...`);

    let ready$ = new Rx.Subject();
    this.apiServer.listen(() => {
      ready$.onNext(true);
      ready$.onCompleted();
    });
    return ready$;
  }
}

module.exports = WebServerService;
