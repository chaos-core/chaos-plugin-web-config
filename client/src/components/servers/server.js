import React from 'react';
import {connect} from "react-redux";
import {push} from "react-router-redux";

import "./server.scss";

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(push(`/server/${ownProps.server.id}`)),
});


function serverIconUrl(server) {
  return `https://cdn.discordapp.com/icons/${server.id}/${server.iconId}.png`;
}

const ServerView = ({server, onClick}) => (
  <div className={"btn server"} onClick={onClick}>
    <img className={"server-icon"} alt={`${server.name} icon`} src={serverIconUrl(server)}/>
    <div className={"name"}>{server.name}</div>
  </div>
);

const Server = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerView);

export default Server;
