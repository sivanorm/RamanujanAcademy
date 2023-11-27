import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FireBaseAuthProvider } from "./Authentications/firebase/Context/firebase-auth-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FireBaseAuthProvider>
        <App />
      </FireBaseAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
