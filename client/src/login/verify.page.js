import React, { Component } from 'react';
import queryString from 'query-string';

import NixApiService from "../nix-api-service";

class LoginVerifyPage extends Component {
  render() {
    return (
      <div className="page login-verify">
        Working...
      </div>
    );
  }

  componentDidMount() {
    this.verifyToken();
  }

  verifyToken() {
    let params = queryString.parse(this.props.location.search);
    let discordToken = params.code;

    NixApiService.login(discordToken)
      .then(() => {
        this.props.history.push('/servers')
      })
  }
}

export default LoginVerifyPage;
