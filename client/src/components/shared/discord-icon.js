import React from 'react';

import './discord-icon.scss';

const DiscordIcon = (props) => (
  <img className={`discord-icon discord-icon-${props.type} ${props.className}`} alt={props.alt} src={getUrl(props)}/>
);

function getUrl(options) {
  let base = 'https://cdn.discordapp.com/';

  switch (options.type) {
    case "emoji":
      return base + `emojis/${options.iconId}.png`;
    case "guild":
      return base + `icons/${options.guildId}/${options.iconId}.png`;
    case "user":
      return base + `avatars/${options.userId}/${options.iconId}.png`;
    case "app":
      return base + `app-icons/${options.appId}/${options.iconId}.png`;
    case "placeholder":
      return "http://via.placeholder.com/128x128.png";
    default:
      return undefined;
  }
}

export default DiscordIcon;
