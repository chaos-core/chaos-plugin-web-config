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

    // Attach error handler
    this.app.use(this.handleError.bind(this));
  }

  listen(callback) {
    this.app.listen(this.config.port, callback);
  }

  handleError(error, req, res, next) {
    let route = req.route.path;
    let method = req.method;

    let errorMessage = `Error for ${method} ${route}: ${error.name} - ${error.message}`;

    if (error.stack) {
      errorMessage += `\n${error.stack}`;
    }

    this.nix.logger.error(`NixModWeb: ${errorMessage}`);

    res.status(500).json({ error: error.message });
  }
}

module.exports = ApiServer;
