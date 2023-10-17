import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import libAssetsPlugin from "@laynezh/vite-plugin-lib-assets";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://clubmediterranee.github.io/swagger/latest",
  plugins: [react()],
  build: {
    outDir: "../../dist/latest/swagger-ui-v3",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});
