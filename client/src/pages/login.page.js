import React from 'react';

import DiscordLoginBtn from "../components/discord-login-btn/discord-login-btn";

import "./login.page.scss";

const LoginPage = () => (
  <div className="page login">
    <img className={"bot-avatar"} alt={"Bot Avatar"} src={"http://via.placeholder.com/256x256"}/>
    <div>Please login with</div>
    <DiscordLoginBtn/>
  </div>
);

export default LoginPage;
