const initialState = {
  currentId: undefined,
  list: {},
};

const serverReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SERVERS.SET_SERVER':
      return {
        ...state,
        currentServer: action.payload.server,
      };
    default:
      return state;
  }
};

export default serverReducer;
