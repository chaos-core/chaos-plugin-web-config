import React from 'react';

import "./server.scss";

function serverIconUrl(server) {
  return `https://cdn.discordapp.com/icons/${server.id}/${server.iconId}.png`;
}

const Server = ({server}) => (
  <div className={"btn server"}>
    <img className={"server-icon"} alt={`${server.name} icon`} src={serverIconUrl(server)}/>
    <div className={"name"}>{server.name}</div>
  </div>
);

export default Server;
