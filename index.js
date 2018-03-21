module.exports = {
  name: 'webserver',
  canBeDisabled: false,
  services: [
    require('./server/web-server-service'),
  ],
};
