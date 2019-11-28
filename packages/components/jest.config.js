module.exports = {
  ...require('@reswagger/webpack/jest.config')(),
  "collectCoverageFrom": [
    "!src/App.js",
    "!src/i18n.js",
    "!src/setupProxy.js",
    "!src/store.js",
    "!src/index.js",
    "!src/config.js",
    "!src/rootReducer.js",
    "src/**/*.js"
  ]
}
