module.exports = {
  authorize(req, res, next) {
    let AuthService = req.app.locals.services.AuthService;

    AuthService.authorize(req)
      .then(() => next())
      .catch((error) => next(error));
  },
};
