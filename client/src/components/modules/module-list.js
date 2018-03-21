import React, {Component} from 'react';
import {connect} from "react-redux";

import NixApiClient from '../../lib/nix-api-client';

import Loading from '../shared/loading';
import Module from './module';

const mapStateToProps = (state, ownProps) => ({
  server: state.server,
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

class ModuleListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      modules: [],
    }
  }

  render() {
    return (
      <div className={"module-list"}>
        {
          this.state.fetching
            ? <Loading/>
            : this.renderList()
        }
      </div>
    );
  }

  renderList() {
    return this.state
      .modules
      .map((module, index) => (
        <Module key={index} module={module}/>
      ));
  }

  componentDidMount() {
    this.fetchModules();
  }

  fetchModules() {
    NixApiClient
      .fetchModules(this.props.server.id)
      .then((modules) => this.setState({
        fetching: false,
        modules,
      }))
  }
}

const ModuleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleListView);

export default ModuleList;
