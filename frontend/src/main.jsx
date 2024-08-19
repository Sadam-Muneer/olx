import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-6lyosx3ek7jwoo4s.us.auth0.com"
      clientId="Tci26sekKSRJ0HNTKj9tOmip3rKKBn5N"
      authorizationParams={{
        redirect_uri: "http://localhost:5173",
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      <MantineProvider>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
