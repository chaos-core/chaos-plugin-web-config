const initialState = null;

const serverReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SERVER.SET_SERVER':
      return action.payload.server;
    default:
      return state;
  }
};

export default serverReducer;
