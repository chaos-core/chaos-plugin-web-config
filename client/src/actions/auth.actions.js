function LOGOUT() {
  return {
    type: 'AUTH.LOGOUT',
  };
}

function SET_USER(user) {
  return {
    type: 'AUTH.SET_USER',
    user: user,
  };
}

function SET_TOKEN(newToken) {
  return {
    type: 'AUTH.SET_TOKEN',
    token: newToken,
  };
}

export {
  LOGOUT,
  SET_USER,
  SET_TOKEN,
}
