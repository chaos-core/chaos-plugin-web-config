import {routerReducer} from "react-router-redux";

import serversReducer from "./servers.reducer";
import authReducer from "./auth.reducer";

export default {
  servers: serversReducer,
  router: routerReducer,
  auth: authReducer,
};
