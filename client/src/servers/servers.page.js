import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import NixApiService from "../nix-api-service";

class ServersPage extends Component {
  render() {
    if (!NixApiService.userIsLoggedIn) {
      return (<Redirect to={`/login`}/>)
    }

    return (
      <div className="page servers">
        Server list!
      </div>
    );
  }
}

export default ServersPage;
