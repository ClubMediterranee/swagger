import "./index.css";
import App from "./App";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client";

const baseName = (window as any).basename || "/";

createRoot(document.getElementById("root")!)
  .render(
    <React.StrictMode>
      <BrowserRouter basename={baseName}>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
  );
