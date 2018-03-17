import React, { Component } from 'react';
import {connect} from 'react-redux';

import {SET_SERVER} from "../actions/servers.actions";

import Loading from '../components/shared/loading';
import ChangeServerBtn from "../components/servers/change-server-btn";

const mapStateToProps = (state, ownProps) => ({
  server: state.servers.currentServer,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: () => dispatch(SET_SERVER({ id: ownProps.match.params.id }))
});

class ServerPageView extends Component {
  render() {
    if (!this.props.server) {
      return (<Loading />)
    }
    else {
      return (
        <div className={"server-page"}>
          Current Server: {this.props.server.id}
          <ChangeServerBtn/>
        </div>
      );
    }
  }

  componentDidMount() {
    this.props.onMount()
  }
}

const ServerPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerPageView);

export default ServerPage;
