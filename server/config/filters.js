module.exports = {
  authorize(req, res, next) {
    let JwtManager = req.app.locals.services.JwtManager;

    return JwtManager
      .getAuthToken(req)
      .then((authToken) => JwtManager.decodeToken(authToken))
      .then((payload) => {
        res.locals.jwt = payload;
        res.locals.userId = payload.userId;
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
