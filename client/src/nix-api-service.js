let userLoggedIn = false;

class NixApiService {
  static login(discordToken) {
    userLoggedIn = true;

    return new Promise((resolve) => resolve());
  }

  static get userIsLoggedIn() {
    return userLoggedIn;
  }
};

export default NixApiService;
