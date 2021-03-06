module.exports = {
  plugins: [
    require('postcss-omit-import-tilde'),
    require('postcss-import'),
    require('tailwindcss')(require.resolve('./tailwind.config')),
    require('postcss-at-rules-variables'),
    require('postcss-flexbugs-fixes'),
    require('postcss-each'),
    require('postcss-for'),
    require('postcss-mixins'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      // Use stage 2 features + custom-properties
      // See https://preset-env.cssdb.org/features
      stage: 2,
      features: {
        'color-mod-function': {
          unresolved: 'warn'
        },
        'custom-media-queries': {
          preserve: false,
          extensions: {
            // Take every screen defined in tailwind config
            // and generate a custom media for it (e.g `{ '--md': '(min-width: XXX)' }`)
            ...Object
              .entries(require('./tailwind.config').theme.screens)
              .reduce(
                (customMedia, [mediaName, minWidth]) => ({
                  ...customMedia,
                  [`--${mediaName}`]: `(min-width: ${minWidth})`
                }),
                {}
              )
          }
        },
        'custom-properties': {
          preserve: false,
          appendVariables: false,
          warnings: false
        },
        'matches-pseudo-class': true,
        'nesting-rules': true,
        'not-pseudo-class': true
      }
    }),
    require('postcss-calc')({
      preserve: false
    }),
    require('postcss-reporter'),
    require('postcss-color-function')
  ]
}
