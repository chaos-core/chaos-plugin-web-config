import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import NixApiService from "../nix-api-service";
import UserInfo from "../shared/user-info";

class ServersPage extends Component {
  render() {
    if (!NixApiService.userIsLoggedIn) {
      return (<Redirect to={`/login`}/>)
    }

    return (
      <div className="page servers">
        <UserInfo onLogout={this.handleLogout.bind(this)}/>
        Server list!
      </div>
    );
  }

  handleLogout() {
    this.props.history.push('/');
  }
}

export default ServersPage;
