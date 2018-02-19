'use strict';
const Nix = require('nix-core');

const config = require('./config/nix/config.js');

let nix = new Nix(config);

nix.addModule(require('./module'));

nix.listen().subscribe();
