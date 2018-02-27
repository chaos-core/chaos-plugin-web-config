import React, {Component} from 'react';

import NixApiService from "../nix-api-service";

class UserInfo extends Component {
  render() {
    if (!NixApiService.userIsLoggedIn) {
      return null;
    }

    return (
      <div className="user-info">
        <span>User this logged in</span>
        <div className={`btn btn-small`} onClick={this.handleLogout.bind(this)}>Logout</div>
      </div>
    );
  }

  handleLogout(e) {
    e.preventDefault();

    NixApiService.logout()
      .then(() => {
        if (this.props.onLogout) {
          this.props.onLogout();
        }
      })
  }
}

export default UserInfo;
