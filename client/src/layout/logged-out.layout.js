import React from 'react';
import { Route, Redirect } from 'react-router';

import ConnectedSwitch from "../components/shared/connected-switch";

import LoginPage from "../pages/login.page";
import LoginVerifyPage from "../pages/verify.page";

const LoggedOutLayout = () => (
  <div>
    <ConnectedSwitch>
      <Route exact path='/login' component={LoginPage}/>
      <Route exact path='/login/verify' component={LoginVerifyPage}/>
      {/* redirect if no route matches */}
      <Redirect to='/login'/>
    </ConnectedSwitch>
  </div>
);

export default LoggedOutLayout;
