import React, { Component } from 'react';
import queryString from 'query-string';

import NixApiService from "../lib/nix-api-service";

class LoginVerifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifying: true,
    };
  }

  render() {
    return (
      <div className="page login-verify">
        { this.state.verifying
          ? (<div>Working...</div>)
          : (<div>Errored!</div>)
        }
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
      .then(() => this.props.history.push('/servers'))
      .catch((error) => {
        this.setState({verifying: false});
        console.error(error);
      })
  }
}

export default LoginVerifyPage;
