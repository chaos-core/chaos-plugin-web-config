const Rx = require('rx');
const express = require('express');

const ApiServer = require('../../server/api-server');

class WebServerService {
  constructor(nix) {
    this.nix = nix;
    this.config = Object.assign({
      port: 3000,
      useInternalClient: true,
    }, nix.config.webServer);
  }

  onNixListen() {
    this.nix.logger.info(`NixModWeb: Starting web server...`);

    this.createApp();

    let ready$ = new Rx.Subject();
    this.app.listen(this.config.port, () => {
      ready$.onNext(true);
      ready$.onCompleted();
    });
    return ready$;
  }

  createApp() {
    this.app = express();

    this.app.use('/api', new ApiServer(this.nix));

    if (this.config.serveClient) {
      this.app.use(express.static('build'));
    }
  }
}

module.exports = WebServerService;
