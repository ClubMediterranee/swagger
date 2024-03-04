import type { Config } from "tailwindcss";
// @ts-ignore
import {tailwindPreset} from "@clubmed/trident-ui/tailwind";

export default {
  presets: [
    tailwindPreset
  ],
  content: [
    "./index.html",
    "../ui/**/*.{ts,tsx,css}",
    "../../node_modules/**/trident-ui/**/*.js",
    "../../../node_modules/**/trident-ui/**/*.js"
  ]
} satisfies Config;
