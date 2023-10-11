/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const { join } = require("path");
const fixPath = require("normalize-path");
const packageDir = join(__dirname, "..", "..");

module.exports = {
  roots: ["<rootDir>/src"],
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["<rootDir>/src/**"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  coverageReporters: ["clover", "json", "lcov", "text", "json-summary"],
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    ".json",
    "index.ts",
    "interfaces/",
    "/node_modules/",
    "__mock__",
    "__snapshots__",
    "src/config",
    "src/bin",
    "fixture.ts",
    "Server.ts",
    ".spec.ts"
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],

  // The test environment that will be used for testing
  testEnvironment: "node",
  globalTeardown: `${__dirname}/teardown.js`,
  // The glob patterns Jest uses to detect test files
  // testMatch: ["**/src/**/__tests__/**/*.[jt]s?(x)", "**/src/**/?(*.)+(spec|test).[tj]s?(x)"],
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", require("./swc.node.json")]
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$", "^.+\\.module\\.(css|sass|scss)$"],
  moduleNameMapper: {
    "^@clubmed/domain/src/(.*)$": fixPath(join(packageDir, "domain/src/$1")),
    "^@clubmed/(.*)$": fixPath(join(packageDir, "$1/src"))
  },

  // The paths to modules that run some code to configure or set up the testing environment before each test
  reporters: ["default", "jest-junit"]
};
