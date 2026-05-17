import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { UserProvider } from "./context/UserProvider.jsx";
import "./index.css";
import ScrollToTop from "./ScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <BrowserRouter basename="/">
        <ScrollToTop/>
          <App />
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
);
