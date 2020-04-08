// eslint-disable-next-line node/exports-style
module.exports = (webpackConfig, { isEnvProduction, paths }) => {
  webpackConfig.resolve.alias['vue'] = 'vue/dist/vue.esm.js'

  return webpackConfig
}
