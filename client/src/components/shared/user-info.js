import React from 'react';
import {connect} from "react-redux";

import {LOGOUT} from "../../actions/auth.actions";

const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogout: () => dispatch(LOGOUT()),
});

const UserInfoView = ({user, onLogout}) => (
  <div className="user-info">
    <span>{user.username}</span>
    <div className={`btn btn-small`} onClick={onLogout}>Logout</div>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfoView);
