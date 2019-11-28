const path = require('path')
const pathToInlineSvg = path.resolve(__dirname, '../../components/src/statics/svg')
const pathToFonts = path.resolve(__dirname, '../../components/src/fonts')
const yarnWorkspaces = require('@clubmed/webpack/config/yarn-workspaces')
const paths = require('@clubmed/webpack/config/paths')
const workspaces = yarnWorkspaces.init(paths)
// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = ({ config }) => {
  const rules = config.module.rules

  const includedPaths = workspaces.paths
    .filter(o => !o.match('webpack'))

  rules.forEach(rule => {
    if (rule.test.test('.css')) {
      rule.use[2] = {
        loader: 'postcss-loader',
        ident: 'postcss',
        options: {
          plugins: () => require('@clubmed/webpack/postcss.config').plugins
        }
      }
    }

    if (rule.test.test('.js')) {
      rule.include.push(includedPaths)
      rule.use[0].loader = require.resolve('babel-loader')
    }
  })

  const svgLoaderRule = rules.find(rule => rule.test.test('.svg'))
  svgLoaderRule.exclude = pathToInlineSvg

  rules.unshift({
    test: /\.svg$/,
    exclude: [
      pathToFonts
    ],
    use: [require.resolve('@svgr/webpack'), require.resolve('url-loader')]
  })

  return config
}
