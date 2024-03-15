import { getSemanticConfig } from "@cmflow/cli";

process.env.PRODUCTION_BRANCH = "main";
process.env.DEVELOP_BRANCH = "main";
process.env.DEPLOY_ON_DOCKER = "false";

export default {
  ...getSemanticConfig(),
  npmPublish: false,
  // eslint-disable-next-line no-template-curly-in-string
  tagFormat: "v${version}"
};
