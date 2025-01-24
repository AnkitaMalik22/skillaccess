import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        redirectUri="http://localhost:3000/college/dashboard"
      >
        {/* redirectUri= "https://skillaccessclient.netlify.app/college/dashboard" */}
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
    <Toaster position="top-center" />
  </Provider>
  // </React.StrictMode>
);
