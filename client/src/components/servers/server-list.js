import React, {Component} from 'react';

import NixApiClient from '../../lib/nix-api-client';

import Server from './server';

import './server-list.scss';

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
      <div className={"server-list"}>
        {
          this.state.fetching
          ? <div>Loading Servers...</div>
          : this.renderList()
        }
      </div>
    );
  }

  renderList() {
    return this.state
      .servers
      .map((server, index) => (
        <Server key={index} server={server}/>
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
