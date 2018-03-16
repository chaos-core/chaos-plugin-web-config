import {routerReducer} from "react-router-redux";

import authReducer from "./auth.reducer";

export default {
  router: routerReducer,
  auth: authReducer,
};
