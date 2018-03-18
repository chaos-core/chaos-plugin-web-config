import React, { Component } from 'react';
import {connect} from 'react-redux';

import {SET_SERVER} from "../actions/server.actions";

import Loading from '../components/shared/loading';
import ServerHeader from "../components/servers/server-header";

const mapStateToProps = (state) => ({
  server: state.server,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: () => dispatch(SET_SERVER(ownProps.match.params.id))
});

class ServerPageView extends Component {
  render() {
    if (!this.props.server) {
      return (<Loading />)
    }
    else {
      return (
        <div className={"server-page"}>
          <ServerHeader/>
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
