import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    minify: true,
    outDir: "../../dist/latest/features-and-fix",
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') return 'main.bundle.css';
          return assetInfo.name!;
        },
      }
    }
  },
  server: {
    proxy: {
      "/doc/v3/swagger.json": "https://api.integ.clubmed.com"
    }
  }
});
