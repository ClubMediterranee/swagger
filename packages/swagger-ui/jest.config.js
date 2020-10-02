// eslint-disable-next-line node/exports-style
module.exports = {
  ...require('@clubmed/webpack/jest.config')('swagger-ui'),
  'collectCoverageFrom': [
    '!src/App.js',
    '!src/i18n.js',
    '!src/setupProxy.js',
    '!src/store.js',
    '!src/index.js',
    '!src/config.js',
    '!src/rootReducer.js',
    'src/**/*.js'
  ]
}
