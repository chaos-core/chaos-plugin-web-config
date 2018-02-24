import React, {Component} from 'react';
import queryString from 'query-string';

import Config from '../config';

class DiscordLoginBtn extends Component {
  render() {
    return (
      <div className="button discord-login-btn" onClick={this.loginWithDiscord}>
        Login with Discord
      </div>
    );
  }

  loginWithDiscord() {
    let params = queryString.stringify({
      client_id: Config.discord.clientId,
      redirect_uri: window.location.origin + '/login/verify',
      response_type: 'code',
      scope: 'identify',
    });

    let url = `https://discordapp.com/api/oauth2/authorize?${params}`;
    window.location = url;
  }
}

export default DiscordLoginBtn;
