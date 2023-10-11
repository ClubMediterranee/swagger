import type { Config } from 'tailwindcss';

const config = {
  presets: [require('./tailwind.preset')],
  content: ['./doc/**/*.mdx', './lib/**/*.{ts,tsx,mdx}'],
} satisfies Config;

export default config;
