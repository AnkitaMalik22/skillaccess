import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId="629174978997-9d2jpna5g3315r0utd9qpnsoj6ft1842.apps.googleusercontent.com"
        redirectUri="http://localhost:3000/collage/dashboard">

      <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
