const express = require('express');
const fallback = require('express-history-api-fallback');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./lib/router');
const AuthService = require('./lib/services/auth-service');

class ApiServer {
  get locals() {
    return this.app.locals;
  }

  constructor(nix, config) {
    this.nix = nix;
    this.config = config;

    this.app = express();

    // Attach locals
    this.app.locals = {
      nix: this.nix,
      config: this.config,
      services: {
        AuthService: new AuthService({tokenSecret: this.config.tokenSecret}),
      },
    };

    // Middleware
    this.app.use(bodyParser.json());
    this.app.use(cors({
      origin: this.config.clientUrl,
    }));

    // Routes
    this.app.use('/api', router(this.nix));

    // Static client
    if (this.config.serveClient) {
      this.app.use(express.static(this.config.clientSrc));
      this.app.use(fallback('index.html', {root: this.config.clientSrc}));
    }
  }

  listen(callback) {
    this.app.listen(this.config.port, callback);
  }


  }
}

module.exports = ApiServer;
