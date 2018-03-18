import React from 'react';

import "./discord-login-btn.scss";

import discordLogo from "./discord-logo.svg";

const DiscordLoginBtnView = ({onClick}) => (
  <div className="btn discord-login-btn" onClick={onClick}>
    <img alt={"Discord"} src={discordLogo}/>
  </div>
);

export default DiscordLoginBtnView;
