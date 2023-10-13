import {dirname} from "path";
import preset from "@clubmed/ui/tailwind.preset";


const config = {
  important: '.swagger-ui',
  presets: [
    preset
  ],
  content: [
    "./src/**/*.{ts,tsx}",
    `${dirname(require.resolve("@clubmed/ui"))}/{assets,atoms,contexts,molecules,organisms}/**/*.{ts,tsx}`
  ],
  safelist: [
    "margin"
  ]
};

export default config;
