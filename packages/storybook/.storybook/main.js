const { dirname, join, resolve } = require('path')
const componentDir = dirname(require.resolve('@clubmed/components'))
const yarnWorkspaces = require('@clubmed/webpack/config/yarn-workspaces')
const paths = require('@clubmed/webpack/config/paths')

const rootDir = join(__dirname, '..', 'src')
const pathToInlineSvg = resolve(componentDir, 'components/src/statics/svg')
const pathToFonts = resolve(componentDir, 'components/src/fonts')
const workspaces = yarnWorkspaces.init(paths)

module.exports = {
  'stories': [
    join(rootDir, '**/*.stories.mdx'),
    join(rootDir, '**/*.stories.@(js|jsx|ts|tsx)'),
    join(componentDir, 'components/**/*.stories.mdx'),
    join(componentDir, 'components/**/*.story.mdx'),
    join(componentDir, 'components/**/*.story.@(js|jsx|ts|tsx)'),
    join(componentDir, 'components/**/*.stories.@(js|jsx|ts|tsx)')
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-knobs'
  ],
  webpackFinal: (config) => {
    const rules = config.module.rules

    const includedPaths = workspaces.paths
      .filter(o => !o.match('webpack'))

    const svgLoaderRule = rules.find(rule => rule.test.test('.svg'))
    svgLoaderRule.exclude = pathToInlineSvg

    rules.forEach(rule => {
      if (rule.test.test('.css')) {
        rule.use[2] = {
          loader: require.resolve('postcss-loader'),
          options: {
            // postcssOptions: {
            ident: 'postcss',
            plugins: require('@clubmed/webpack/postcss.config').plugins,
            // },
            sourceMap: true
          }
        }
      }

      if (rule.test.test('.js')) {
        rule.use[0].loader = require.resolve('babel-loader')
      }
    })

    rules.unshift({
      test: /\.svg$/,
      exclude: [
        `${pathToFonts}/**`
      ],
      use: [require.resolve('@svgr/webpack'), require.resolve('url-loader')]
    })

    return config
  }
}