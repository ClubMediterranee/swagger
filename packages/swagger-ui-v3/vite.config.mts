import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { Mode, plugin as mdPlugin } from "vite-plugin-markdown";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    mdPlugin({
      mode: [Mode.MARKDOWN]
    })
  ],
  build: {
    minify: false,
    outDir: "../../dist/latest/swagger-ui-v3",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  server: {
    proxy: {
      "/doc/v3/swagger.json": "https://api.integ.clubmed.com",
      "/doc/swagger.json": "https://www.dataviz.clubmed"
    }
  }
});
