import React, {Component} from 'react';
import {connect} from "react-redux";

import {SET_SERVER} from "../actions/server.actions";

import ServerList from '../components/servers/server-list';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: () => dispatch(SET_SERVER(null))
});

class ServersPageView extends Component {
  render() {
    return (
      <div className="page servers">
        <ServerList/>
      </div>
    );
  }

  componentDidMount() {
    this.props.onMount()
  }
}

const ServersPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServersPageView);

export default ServersPage;
