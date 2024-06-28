import { tailwindPreset } from "@clubmed/trident-ui/tailwind";
import { dirname } from "path";

const config = {
  presets: [tailwindPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../node_modules/**/trident-ui/**/*.js",
    "./node_modules/**/trident-ui/**/*.js",
    `${dirname(require.resolve("@clubmed/ui"))}/**/*.{ts,tsx}`
  ],
  safelist: ["margin"]
};

export default config;
