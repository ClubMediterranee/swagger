import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

process.env.TZ = "UTC";

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    include: ["**/*.spec.{ts,tsx}"],
    globals: true,
    environment: "jsdom",
    exclude: ["**/node_modules/**", "**/tests/e2e/**"],
    setupFiles: ["./vitest.setup.ts"],
    clearMocks: true,
    outputFile: {
      junit: "../../reports/test-ui-results.xml"
    },
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json", "html"],
      all: true,
      include: ["hooks/**/*.{ts,tsx}", "molecules/**/*.{ts,tsx}", "organisms/**/*.{ts,tsx}"],
      thresholds: {
        autoUpdate: true,
        statements: 67.25,
        branches: 80,
        functions: 65.51,
        lines: 67.25
      },
      exclude: ["**/*.spec.{ts,tsx}", "**/node_modules/**", "**/*.stories.{ts,tsx}", "**/index.ts", "**/*.helpers.ts", "**/*.template.tsx"]
    }
  }
});
