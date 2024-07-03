import "./patch-window.ts";
import "@clubmed/swagger-ui-plugins/styles/index.css";
import "swagger-ui-react/swagger-ui.css";
import "@clubmed/trident-ui/style.css";
import "@clubmed/trident-ui/fonts/Brand/tui-brand.css";
import "@clubmed/trident-ui/fonts/Actions/tui-actions.css";
import "@clubmed/trident-ui/fonts/Utilities/tui-utilities.css";
import "@clubmed/trident-ui/fonts/Socials/tui-socials.css";

import { IconsProvider } from "@clubmed/trident-ui/atoms/Icons";
import Actions from "@clubmed/trident-ui/atoms/Icons/svg/Actions";
import Brand from "@clubmed/trident-ui/atoms/Icons/svg/Brand";
import Socials from "@clubmed/trident-ui/atoms/Icons/svg/Socials";
import Utilities from "@clubmed/trident-ui/atoms/Icons/svg/Utilities";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

const baseName = (window as any).basename || "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IconsProvider icons={[Brand, Actions, Utilities, Socials]}>
      <Router basename={baseName}>
        <App />
      </Router>
    </IconsProvider>
  </StrictMode>
);
