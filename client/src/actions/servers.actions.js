import NixApiClient from '../lib/nix-api-client';

const SET_SERVER = (server) => ({
  type: 'SERVERS.SET_SERVER',
  payload: { server },
});

const FETCH_SERVER = (serverId) => (dispatch) => {
  NixApiClient
    .fetchServer(serverId)
    .then((server) => dispatch(SET_SERVER(server)));
};

export {
  SET_SERVER,
  FETCH_SERVER,
}
