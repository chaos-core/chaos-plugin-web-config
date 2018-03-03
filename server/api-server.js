const express = require('express');
const fallback = require('express-history-api-fallback');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./lib/router');

class ApiServer {
  constructor(nix, config) {
    this.nix = nix;
    this.config = config;

    this.app = express();

    // Attach locals
    this.app.locals = {
      nix: this.nix,
      config: this.config,
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

  get locals() {
    return this.app.locals;
  }

  set locals(value) {
    this.app.locals = value;
  }
}

module.exports = ApiServer;
