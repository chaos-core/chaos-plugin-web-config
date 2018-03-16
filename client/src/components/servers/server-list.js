import React, {Component} from 'react';

import NixApiClient from '../../lib/nix-api-client';

import Server from './server';

class ServerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      servers: [],
    }
  }

  render() {
    return (
      <div>
        Server List

        <ul>
          {
            this.state.fetching
            ? <li>Loading Servers...</li>
            : this.renderList()
          }
        </ul>
      </div>
    );
  }

  renderList() {
    return this.state
      .servers
      .map((server, index) => (
        <li key={index}>
          <Server server={server}/>
        </li>
      ));
  }

  componentDidMount() {
    this.fetchServers();
  }

  fetchServers() {
    NixApiClient
      .fetchServers()
      .then((servers) => this.setState({
        fetching: false,
        servers,
      }))
  }
};

export default ServerList;
