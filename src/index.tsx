import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.css";

const info = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || "localhost",
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || "0",
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={info.domain}
      clientId={info.clientId}
      redirectUri={`${window.location.origin}${process.env.PUBLIC_URL}/lobby`}
    >
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
