import "./index.css";
import "swagger-ui-react/swagger-ui.css";
import "@clubmed/trident-ui/style.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

const baseName = (window as any).basename || "/";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router basename={baseName}>
      <App />
    </Router>
  </React.StrictMode>
);
