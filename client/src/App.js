import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from './login/login.page';
import LoginVerifyPage from "./login/verify.page";
import ServersPage from "./servers/servers.page";

import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={LoginPage}/>
          <Route exact path='/login/verify' component={LoginVerifyPage}/>
          <Route path='/servers' component={ServersPage}/>
          { /* redirect if no route matches */ }
          <Redirect to='/login'/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
