import React, {Component} from 'react';

import DiscordLoginBtn from "./discord-login-btn";

class LoginPage extends Component {
  render() {
    return (
      <div className="page login">
        <DiscordLoginBtn/>
      </div>
    );
  }
}

export default LoginPage;
