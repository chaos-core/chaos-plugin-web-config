import NixApiService from './nix-api-service';

class StateService {
  constructor () {
    this._user = null;
  }

  getUser() {
    return new Promise((resolve, reject) => {
      if (this._user) {
        return resolve(this._user);
      }

      NixApiService.getUser()
        .then((user) => {
          this._user = user;
          resolve(this._user);
        })
        .catch((e) => reject(e));
    })
  }
}

export default new StateService();
