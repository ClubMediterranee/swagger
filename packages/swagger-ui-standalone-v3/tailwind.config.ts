import { tailwindPreset } from "@clubmed/trident-ui/tailwind";
import { dirname } from "path";

const config = {
  important: ".swagger-ui",
  presets: [tailwindPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../node_modules/**/trident-ui/**/*.js",
    "./node_modules/**/trident-ui/**/*.js",
    `${dirname(require.resolve("@clubmed/ui"))}/**/*.{ts,tsx}`,
    `${dirname(require.resolve("@clubmed/swagger-ui-plugins"))}/**/*.{ts,tsx}`
  ],
  safelist: ["margin"]
};

export default config;
