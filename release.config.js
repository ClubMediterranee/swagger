const {getSemanticConfig} = require('@cmflow/cli')

process.env.PRODUCTION_BRANCH = 'master'
process.env.DEVELOP_BRANCH = 'master'
process.env.DEPLOY_ON_DOCKER = false

module.exports = {
  ...getSemanticConfig(),
  npmPublish: false,
  // eslint-disable-next-line no-template-curly-in-string
  tagFormat: 'v${version}'
}
