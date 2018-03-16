import React from 'react';
import { Route, Redirect } from 'react-router';

import ConnectedSwitch from "../components/shared/connected-switch";

import ServersPage from '../pages/servers.page';
import UserInfo from '../components/shared/user-info';

import './logged-in.layout.scss';

const LoggedInLayout = () => (
  <div className={"layout logged-in"}>
    <UserInfo/>
    <ConnectedSwitch>
      <Route exact path='/servers' component={ServersPage}/>
      {/* redirect if no route matches */}
      <Redirect to='/servers'/>
    </ConnectedSwitch>
  </div>
);

export default LoggedInLayout;
