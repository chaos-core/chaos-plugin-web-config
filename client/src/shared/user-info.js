import React, {Component} from 'react';

import StateService from '../lib/state-service';
import NixApiService from "../lib/nix-api-service";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentWillMount() {
    StateService.getUser()
      .then((user) => this.setState({user}))
  }

  render() {
    if (this.state.user === null) {
      return (
        <div className="user-info">
          Loading...
        </div>
      );
    }
    else {
      return (
        <div className="user-info">
          <span>{this.state.user.username}</span>
          <div className={`btn btn-small`} onClick={this.handleLogout.bind(this)}>Logout</div>
        </div>
      );
    }
  }

  handleLogout(e) {
    e.preventDefault();

    NixApiService.logout()
      .then(() => {
        if (this.props.onLogout) {
          this.props.onLogout();
        }
      })
  }
}

export default UserInfo;
