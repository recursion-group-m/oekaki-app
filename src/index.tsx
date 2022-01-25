import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.css";

const ROUTER_BASENAME = process.env.NODE_ENV === "development" ? "/" : "/oekaki-app";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={ROUTER_BASENAME}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
