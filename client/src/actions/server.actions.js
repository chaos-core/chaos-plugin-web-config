import NixApiClient from '../lib/nix-api-client';

const SET_SERVER = (serverId) => ((dispatch) => {
  if (serverId) {
    return NixApiClient
      .fetchServer(serverId)
      .then((server) => dispatch({
        type: 'SERVER.SET_SERVER',
        payload: {server},
      }))
  }
  else {
    dispatch({
      type: 'SERVER.SET_SERVER',
      payload: {server: null},
    });

    return Promise.resolve();
  }
});

export {
  SET_SERVER,
}
