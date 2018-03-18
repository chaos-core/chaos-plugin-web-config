import React, { Component } from 'react';
import {connect} from 'react-redux';

import {SET_SERVER} from "../actions/server.actions";

import LeftPanel from "../components/servers/left-panel";
import RightPanel from "../components/servers/right-panel";

import './server.page.scss';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: () => dispatch(SET_SERVER(ownProps.match.params.id))
});

class ServerPageView extends Component {
  render() {
    return(
      <div className={"server-page"}>
        <LeftPanel/>
        <RightPanel/>
      </div>
    );
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
