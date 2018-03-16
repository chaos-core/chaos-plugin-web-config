import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import store from "./lib/redux-store";
import history from "./lib/history";

import MainLayout from './layout/main.layout';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MainLayout/>
    </ConnectedRouter>
  </Provider>
);

export default App;
