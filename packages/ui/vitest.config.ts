import {defineConfig} from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

process.env.TZ = "UTC";

export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  test: {
    include: [
      "**/*.spec.{ts,tsx}"
    ],
    globals: true,
    environment: "jsdom",
    exclude: [
      "**/node_modules/**",
      "**/tests/e2e/**"
    ],
    setupFiles: [
      "./vitest.setup.ts"
    ],
    clearMocks: true,
    outputFile: {
      junit: "../../reports/test-ui-results.xml"
    },
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json", "html"],
      all: true,
      include: [
        "**/*.{ts,tsx}"
      ],
      thresholds: {
        autoUpdate: true,
        statements: 75,
        branches: 85.65,
        functions: 78.31,
        lines: 75
      },
      exclude: [
        "**/interfaces/**",
        "**/*.styles.ts",
        "**/node_modules/**",
        "**/tests/**",
        "**/__mock__",
        "**/templates/index.ts",
        "**/stylesConfig.ts",
        "**/icons/**",
        "**/*.d.ts",
        "**/PDFWorkers.ts",
        "src/index.ts"
      ]
    }
  }
});
