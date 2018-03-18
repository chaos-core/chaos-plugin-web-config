import React from 'react';

import "./server.scss";

const ServerView = ({server, onClick}) => (
  <div className={"btn server"} onClick={onClick}>
    <img className={"server-icon"} alt={`${server.name} icon`} src={serverIconUrl(server)}/>
    <div className={"name"}>{server.name}</div>
  </div>
);

function serverIconUrl(server) {
  return `https://cdn.discordapp.com/icons/${server.id}/${server.iconId}.png`;
}

export default ServerView;
