import React from 'react';
import {connect} from 'react-redux';

import Loading from '../../components/shared/loading';
import ServerHeader from "../../components/servers/server-header";
import ModuleList from "../../components/modules/module-list";

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
        <ModuleList/>
      </div>
    );
  }
};

const LeftPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftPanelView);

export default LeftPanel;
