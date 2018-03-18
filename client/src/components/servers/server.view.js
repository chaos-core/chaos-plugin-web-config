import React from 'react';

import "./server.scss";
import DiscordIcon from "../shared/discord-icon";

const ServerView = ({server, onClick}) => (
  <div className={"btn server"} onClick={onClick}>
    <DiscordIcon alt={server.name} type={'guild'} guildId={server.id} iconId={server.iconId}/>
    <div className={"name"}>{server.name}</div>
  </div>
);

export default ServerView;
