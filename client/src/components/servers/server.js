import {connect} from "react-redux";
import {push} from "react-router-redux";

import ServerView from "./server.view";

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(push(`/server/${ownProps.server.id}`)),
});

const Server = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerView);

export default Server;
