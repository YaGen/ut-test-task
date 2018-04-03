import React from "react";
import classNames from "classnames";

export default ({ value, isCurrentLetter, isErrorLetter }) => (
  <div
    className={classNames({
      letter: true,
      "current-letter": isCurrentLetter,
      "error-letter": isErrorLetter
    })}
  >
    {value}
  </div>
);
