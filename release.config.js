const { getSemanticConfig } = require('@clubmed/cmflow')

process.env.PRODUCTION_BRANCH = 'master'
process.env.DEVELOP_BRANCH = 'master'

module.exports = {
  ...getSemanticConfig(),
  npmPublish: false,
  // eslint-disable-next-line no-template-curly-in-string
  tagFormat: 'v${version}'
}
