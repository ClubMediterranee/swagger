const { resolve } = require('path')

// eslint-disable-next-line node/exports-style
module.exports = (webpackConfig, { isEnvProduction, paths }) => {
  // if (isEnvProduction) {
  //   webpackConfig.target = 'web'
  //   webpackConfig.entry = `${paths.appSrc}/bundle.js`
  //
  //   webpackConfig.output = {
  //     path: resolve(__dirname, '../../releases'),
  //     filename: 'clubmed-swagger-ui.js',
  //     // libraryTarget: 'window'
  //     // globalObject: 'this',
  //     library: 'ClubmedSwaggerUI'
  //   }
  //
  //   delete webpackConfig.optimization.splitChunks
  //   delete webpackConfig.optimization.runtimeChunk
  // }

  return webpackConfig
}
