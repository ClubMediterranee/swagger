import "./patch-window.ts";
import "@clubmed/trident-ui/style.css";
import "@clubmed/trident-ui/fonts/Brand/tui-brand.css";
import "@clubmed/trident-ui/fonts/Actions/tui-actions.css";
import "@clubmed/trident-ui/fonts/Utilities/tui-utilities.css";

import { IconsProvider } from "@clubmed/trident-ui/atoms/Icons";
import Actions from "@clubmed/trident-ui/atoms/Icons/svg/Actions";
import Brand from "@clubmed/trident-ui/atoms/Icons/svg/Brand";
import Utilities from "@clubmed/trident-ui/atoms/Icons/svg/Utilities";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <IconsProvider icons={[Brand, Actions, Utilities]}>
      <App />
    </IconsProvider>
  </StrictMode>
);
