import type {Config} from "tailwindcss";
import {tailwindPreset} from "@clubmed/trident-ui/tailwind";

const config = {
  presets: [tailwindPreset as unknown as Config],
  content: ["./doc/**/*.mdx", "./lib/**/*.{ts,tsx,mdx}", "./node_modules/@clubmed/trident-ui/**/*.js"]
} satisfies Config;

export default config;
