import "./patch-window.ts";
import "@clubmed/trident-ui/style.css";

import { IconsProvider } from "@clubmed/trident-icons";
import Actions from "@clubmed/trident-icons/svg/Actions";
import Brand from "@clubmed/trident-icons/svg/Brand";
import Utilities from "@clubmed/trident-icons/svg/Utilities";
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
