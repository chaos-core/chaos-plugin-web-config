import React from "react";

import "./module.scss";

const Module = ({module}) => (
  <div className={"module"}>
    <span className={"name"}>{module.name}</span>
    <span className={"enabled-flag"}>{module.enabled ? "✓" : "✘"}</span>
  </div>
);

export default Module;
