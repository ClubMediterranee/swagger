// @ts-ignore
import { tailwindPreset } from "@clubmed/trident-ui/tailwind";
import type { Config } from "tailwindcss";

const config = {
  presets: [tailwindPreset as unknown as Config],
  content: ["./doc/**/*.mdx", "./**/*.{ts,tsx,mdx}", "./node_modules/@clubmed/trident-ui/**/*.js"]
} satisfies Config;

export default config;
