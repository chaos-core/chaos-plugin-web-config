import React from 'react';
import {connect} from 'react-redux';

import Loading from '../shared/loading';
import ServerHeader from "../servers/server-header";

import './left-panel.scss';

const mapStateToProps = (state) => ({
  server: state.server,
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

const LeftPanelView = ({server}) => {
  if (!server) {
    return (
      <div className={"left-panel"}>
        <Loading/>
      </div>
    )
  }
  else {
    return (
      <div className={"left-panel"}>
        <ServerHeader/>
      </div>
    );
  }
};

const LeftPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftPanelView);

export default LeftPanel;
