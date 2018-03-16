import React, {Component} from 'react';

import Server from './server';

class ServerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servers: [1,2,3,4,5,6],
    }
  }

  render() {
    return (
      <div>
        Server List

        {this.state.servers.map((server, index) => (
          <Server key={index} server={server}/>
        ))}
      </div>
    );
  }
};

export default ServerList;
