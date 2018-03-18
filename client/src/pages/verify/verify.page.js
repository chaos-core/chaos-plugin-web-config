import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from "react-router-redux";
import queryString from "query-string";

import NixApiService from "../../lib/nix-api-client";

import Loading from "../../components/shared/loading";

const mapStateToProps = (state, ownProps) => ({
  location: state.router.location
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onVerified: () => dispatch(push('/')),
});

class LoginVerifyPageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifying: true,
    };
  }

  render() {
    return (
      <div className="page login-verify">
        {
          this.state.verifying
          ? (<Loading/>)
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
      .then(() => this.props.onVerified())
      .catch((error) => {
        this.setState({verifying: false});
        console.error(error);
      })
  }
}

const LoginVerifyPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginVerifyPageView);

export default LoginVerifyPage;
