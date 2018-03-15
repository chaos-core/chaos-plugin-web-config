import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import DiscordLoginBtn from "./discord-login-btn";
import NixApiService from "../lib/nix-api-service";

class LoginPage extends Component {
  render() {
    if (NixApiService.userIsLoggedIn) {
      return (<Redirect to={`/servers`}/>);
    }

    return (
      <div className="page login">
        <DiscordLoginBtn/>
      </div>
    );
  }
}

export default LoginPage;
