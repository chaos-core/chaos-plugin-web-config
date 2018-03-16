class ServersController {
  index(req, res) {
    res.json({
      servers: [1,2,3,4,5,6]
    });
  }
}

module.exports = ServersController;
