import {combineReducers} from "redux";

import {routerReducer} from "react-router-redux";
import serverReducer from "./server.reducer";
import authReducer from "./auth.reducer";

export default combineReducers({
  server: serverReducer,
  router: routerReducer,
  auth: authReducer,
});
