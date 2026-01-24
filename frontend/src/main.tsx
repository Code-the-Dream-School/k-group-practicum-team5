import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "leaflet/dist/leaflet.css";
import "./utils/fixLeafletIcons";
import { I18nProvider } from "./I18n/I18nProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>,
);
