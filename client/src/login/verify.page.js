import React, {Component} from 'react';
import queryString from 'query-string';

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
    console.log(params);
  }
}

export default LoginVerifyPage;
