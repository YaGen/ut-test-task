import React from "react";
import ReactDOM from "react-dom";
import createStore from "redux-zero";
import { Provider } from "redux-zero/react";
import "./styles.css";

import App from "./App";

const initialState = {
  appStarted: false,
  task: ""
};
const store = createStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
