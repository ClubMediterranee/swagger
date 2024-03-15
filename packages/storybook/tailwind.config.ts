// @ts-ignore
import { tailwindPreset } from "@clubmed/trident-ui/tailwind";
import type { Config } from "tailwindcss";

export default {
  presets: [tailwindPreset as any],
  content: [
    "./index.html",
    "../ui/**/*.{ts,tsx,css}",
    "../../node_modules/**/trident-ui/**/*.js",
    "../../../node_modules/**/trident-ui/**/*.js"
  ]
} satisfies Config;
