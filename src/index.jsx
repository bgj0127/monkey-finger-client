import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CookiesProvider } from "react-cookie";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>
);
