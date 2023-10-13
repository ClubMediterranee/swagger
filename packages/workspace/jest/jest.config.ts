/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */

import {Config} from "jest";

const config: Config = {
  coverageProvider: "v8",
  coveragePathIgnorePatterns: [],
  coverageReporters: ["clover", "json", "lcov", "text", "json-summary"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [require.resolve("./jest.setup.ts")],
  preset: "ts-jest",
  transformIgnorePatterns: [],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "\\.svg": "jest-transform-stub",
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

export default config;
