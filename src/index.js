import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GitHubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Auth0Provider
      domain="dev-h52jjkxa88m6rm6j.us.auth0.com"
      clientId="p4azpPe9pha0TajuzRECkyIBVlj6XI6j"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <GitHubProvider>
        <App />
      </GitHubProvider>
    </Auth0Provider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
