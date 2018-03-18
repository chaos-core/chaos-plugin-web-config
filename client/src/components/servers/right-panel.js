import React from 'react';
import {connect} from 'react-redux';

import Loading from '../shared/loading';

import './right-panel.scss';

const mapStateToProps = (state) => ({
  server: state.server,
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

const LeftPanelView = ({server}) => {
  if (!server) {
    return (
      <div className={"right-panel"}>
        <Loading/>
      </div>
    )
  }
  else {
    return (
      <div className={"right-panel"}>
        Right Pannel!
      </div>
    );
  }
};

const LeftPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftPanelView);

export default LeftPanel;
