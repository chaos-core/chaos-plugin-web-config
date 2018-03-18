import {connect} from "react-redux";
import {push} from "react-router-redux";

import ChangeServerBtnView from './change-server-btn.view';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(push('/servers')),
});

const ChangeServerBtn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeServerBtnView);

export default ChangeServerBtn;
