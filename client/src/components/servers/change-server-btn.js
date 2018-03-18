import React from 'react';
import {connect} from "react-redux";
import {push} from "react-router-redux";

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(push('/servers')),
});

const ChangeServerBtnView = ({onClick}) => (
  <div>
    <div className={"btn btn-small"} onClick={onClick}>Change Server</div>
  </div>
);

const ChangeServerBtn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeServerBtnView);

export default ChangeServerBtn;
