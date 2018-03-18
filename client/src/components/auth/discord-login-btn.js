import {connect} from 'react-redux'
import queryString from 'query-string';

import Config from '../../config';

import DiscordLoginBtnView from './discord-login-btn.view';

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    let params = queryString.stringify({
      client_id: Config.discord.clientId,
      redirect_uri: window.location.origin + '/login/verify',
      response_type: 'code',
      scope: 'identify',
    });

    let url = `https://discordapp.com/api/oauth2/authorize?${params}`;
    window.location = url;
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiscordLoginBtnView);
