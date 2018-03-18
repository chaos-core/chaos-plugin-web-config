import {routerMiddleware} from "react-router-redux";
import {applyMiddleware, createStore, compose} from "redux";
import thunk from 'redux-thunk';

import history from './history';
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    )
  )
);

export default store;
