
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
import "leaflet/dist/leaflet.css";
import "./utils/fixLeafletIcons";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
