'use strict';
const Nix = require('nix-core');

const config = require('./config/nix/config.js');

let nix = new Nix(config);

nix.addModule(require('./index.js'));

nix.listen().subscribe();
