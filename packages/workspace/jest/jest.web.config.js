/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */

const { dirname, join } = require("path");
module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.stories.tsx",
    "!src/**/*.themes.ts",
    "!src/**/icons.ts",
    "!src/**/*.d.ts",
    "!src/mocks/**",
    "!src/__mock__/**",
    "!src/__generated__/**",
  ],
  coveragePathIgnorePatterns: [],
  coverageReporters: ["clover", "json", "lcov", "text", "json-summary"],
  globalSetup: `${__dirname}/globalSetup.js`,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [require.resolve("./setupTest.js")],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", require("./swc.web.json")],
    "^.+\\.css$": require.resolve("./cssTransform.js"),
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": require.resolve("./fileTransform.js")
  },
  transformIgnorePatterns: [
    //"[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
    //"!node_modules/@juggle/resize-observer"
  ],
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    "^uuid$": "uuid",
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  moduleFileExtensions: [
    // Place tsx and ts to beginning as suggestion from Jest team
    // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
    "tsx",
    "ts",
    "web.js",
    "js",
    "web.ts",
    "web.tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"]
};
