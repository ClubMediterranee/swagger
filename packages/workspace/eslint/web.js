module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:jsx-a11y/strict",
    "plugin:prettier/recommended",
    "plugin:cypress/recommended"
  ],
  plugins: ["prettier", "react-hooks"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "prettier/prettier": "error",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-pause": "error",
    "testing-library/no-unnecessary-act": "warn",
    "testing-library/prefer-screen-queries": "warn",
    "testing-library/prefer-presence-queries": "warn",
    "testing-library/no-wait-for-multiple-assertions": "warn",
    "testing-library/no-node-access": ["warn", { allowContainerFirstChild: true }],
    "testing-library/no-render-in-setup": "warn"
  }
};
