import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from './login/login.page';

import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={LoginPage}/>
          { /* redirect if no route matches */ }
          <Redirect to='/login'/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
