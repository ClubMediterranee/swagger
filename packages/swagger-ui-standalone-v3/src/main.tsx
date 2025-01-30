import "./patch-window.ts";
import "@clubmed/swagger-ui-plugins/styles/index.css";
import "swagger-ui-react/swagger-ui.css";
import "@clubmed/trident-ui/style.css";

import { IconsProvider } from "@clubmed/trident-icons";
import Actions from "@clubmed/trident-icons/svg/Actions";
import Brand from "@clubmed/trident-icons/svg/Brand";
import Utilities from "@clubmed/trident-icons/svg/Utilities";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

const baseName = (window as any).basename || "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IconsProvider icons={[Brand, Actions, Utilities]}>
      <Router basename={baseName}>
        <App />
      </Router>
    </IconsProvider>
  </StrictMode>
);
