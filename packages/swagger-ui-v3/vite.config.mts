import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import  { plugin as mdPlugin, Mode } from "vite-plugin-markdown";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    mdPlugin({
      mode: [Mode.MARKDOWN, Mode.TOC]
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
      "/doc/v3/swagger.json": "https://api.integ.clubmed.com"
    }
  }
});
