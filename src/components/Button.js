import React from "react";

export default ({ value, clickHandler }) => (
  <div className="button" onClick={clickHandler}>
    {value}
  </div>
);
