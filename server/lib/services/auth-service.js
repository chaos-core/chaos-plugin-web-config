class AuthService {
  getAuthToken(req) {
    return req.header('Authorization');
  }

  authorize(req) {
    return new Promise(
      (resolve, reject) => {
        let authToken = this.getAuthToken(req);

        if (!authToken) {
          return reject({
            name: "MissingAuthTokenError",
            message: "Invalid Authorization header",
          });
        }

        return resolve(true);
      });
  }
}

module.exports = AuthService;
