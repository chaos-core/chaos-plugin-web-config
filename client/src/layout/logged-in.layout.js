import React from 'react';
import { Route, Redirect } from 'react-router';

import ConnectedSwitch from "../components/shared/connected-switch";

import ServersPage from '../pages/servers.page';
import ServerPage from '../pages/server.page';
import UserInfo from '../components/shared/user-info';

import './logged-in.layout.scss';

const LoggedInLayout = () => (
  <div className={"layout logged-in"}>
    <UserInfo/>
    <ConnectedSwitch>
      <Route path='/servers' component={ServersPage}/>
      <Route path='/server/:id' component={ServerPage}/>
      {/* redirect if no route matches */}
      <Redirect to='/servers'/>
    </ConnectedSwitch>
  </div>
);

export default LoggedInLayout;
