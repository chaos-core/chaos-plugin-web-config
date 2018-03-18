import {connect} from "react-redux";

import {push} from "react-router-redux";

import ServerHeaderView from "./server-header.view";

const mapStateToProps = (state) => ({
  server: state.server
});

const mapDispatchToProps = (dispatch) => ({
  onChangeServer: () => dispatch(push('/servers'))
});

const ServerHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerHeaderView);

export default ServerHeader;
