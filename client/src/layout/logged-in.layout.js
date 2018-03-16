import React from 'react';
import { Route, Redirect } from 'react-router';

import ConnectedSwitch from "../shared/connected-switch";

import ServersPage from '../components/servers/servers.page';

const LoggedInLayout = () => (
  <div>
    <ConnectedSwitch>
      <Route exact path='/servers' component={ServersPage}/>
      {/* redirect if no route matches */}
      <Redirect to='/servers'/>
    </ConnectedSwitch>
  </div>
);

export default LoggedInLayout;
