import React from 'react';

import "./server-header.scss";
import DiscordIcon from "../shared/discord-icon";

const ServerHeaderView = ({server, onChangeServer}) => (
  <div className={"server-header"}>
    <DiscordIcon className={"icon-bot"} alt={"Bot"} type={'placeholder'}/>
    <DiscordIcon className={"icon-server"} alt={server.name} type={'guild'} guildId={server.id} iconId={server.iconId}/>
    <div className={"btn btn-link"} onClick={onChangeServer}>Change Server</div>
  </div>
);

export default ServerHeaderView;
