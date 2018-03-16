import jwt from 'jsonwebtoken';

const initialState = {
  token: localStorage.getItem('auth.token'),
  user: undefined,
  jwt: undefined,
};

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case "AUTH.LOGOUT":
      localStorage.removeItem('auth.token');
      return {
        ...state,
        token: undefined,
        user: undefined,
        jwt: undefined,
      };
    case "AUTH.SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "AUTH.SET_TOKEN":
      localStorage.setItem('auth.token', action.token);
      return {
        ...state,
        token: action.token,
        jwt: jwt.decode(action.token),
      };
    default:
      return state;
  }
}
