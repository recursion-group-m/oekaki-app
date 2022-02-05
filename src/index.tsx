import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Config from "./configs";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain={Config.domain} clientId={Config.clientId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
