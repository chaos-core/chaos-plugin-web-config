const Path = require('path');
const Rx = require('rx');

const ApiServer = require('./server/api-server');

class WebServerService {
  constructor(nix) {
    this.nix = nix;
    this.config = Object.assign({
      port: 3000,
      serveClient: true,
      clientUrl: 'https://localhost:3000',
      clientSrc: Path.resolve(__dirname, './client/build'),
    }, nix.config.webServer);

    this.apiServer = new ApiServer(this.nix, this.config)
  }

  onNixListen() {
    this.nix.logger.info(`NixModWeb: Starting web server...`);

    let ready$ = new Rx.Subject();
    this.apiServer.listen(this.config.port, () => {
      ready$.onNext(true);
      ready$.onCompleted();
    });
    return ready$;
  }
}

module.exports = {
  name: 'webserver',
  services: [
    WebServerService,
  ],
};
