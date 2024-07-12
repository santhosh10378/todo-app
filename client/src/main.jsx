import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ReduxProvider from "./components/providers/ReduxProvider.jsx";
import "./index.css";
import ToasterProvider from "./components/providers/ToasterProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider>
      <ToasterProvider />
      <App />
    </ReduxProvider>
  </React.StrictMode>
);
