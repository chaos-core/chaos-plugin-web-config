module.exports = {
  authorize(req, res, next) {
    let AuthService = req.app.locals.services.AuthService;

    return AuthService.getAuthToken(req)
      .then((authToken) => AuthService.decodeToken(authToken))
      .then((payload) => {
        res.locals.jwt = payload;
        next();
      })
      .catch((error) => {
        switch (error.name) {
          case "MissingAuthTokenError":
          case "TokenExpiredError":
          case "JsonWebTokenError":
            return res
              .status(401)
              .json({error: "Not authorized"});
          default:
            return next(error);
        }
      });
  },
};
