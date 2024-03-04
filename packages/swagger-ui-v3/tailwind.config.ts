import {dirname} from "path";
import {tailwindPreset} from "@clubmed/trident-ui/tailwind";


const config = {
  important: '.swagger-ui',
  presets: [
    tailwindPreset
  ],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../node_modules/**/trident-ui/**/*.js",
    "./node_modules/**/trident-ui/**/*.js",
    `${dirname(require.resolve("@clubmed/ui"))}/{assets,atoms,contexts,molecules,organisms}/**/*.{ts,tsx}`,

  ],
  safelist: [
    "margin"
  ]
};

export default config;
