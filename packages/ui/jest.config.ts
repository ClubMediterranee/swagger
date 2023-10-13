import type {Config} from "jest";

import globalConfig from "@clubmed/workspace/jest/jest.config";

const config: Config = {
  ...globalConfig,
  roots: [
    "<rootDir>/atoms",
    "<rootDir>/molecules",
    "<rootDir>/organisms",
    "<rootDir>/hooks",
    "<rootDir>/contexts"
  ],
  collectCoverageFrom: [
    "{atoms,molecules,organisms,hooks,contexts}/**/*.{js,jsx,ts,tsx}",
    "!**/*.stories.tsx",
    "!**/*/index.ts",
    "!**/icons.ts",
    "!**/*.d.ts",
    "!**/*.themes.{ts,ts}",
    "!mocks/**",
    "!__mock__/**",
    "!__generated__/**"
  ],
  coverageThreshold: {
    global: {
      branches: 87.39,
      functions: 72.97,
      lines: 94.23,
      statements: 94.23
    }
  }
};

export default config;
