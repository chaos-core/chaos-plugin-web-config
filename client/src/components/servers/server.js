import React from 'react';

const Server = ({server}) => (
  <div>
    <div>{server.name}</div>
    <div><small>{server.id}</small></div>
  </div>
);

export default Server;
