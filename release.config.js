import { getSemanticConfig } from "@cmflow/cli";

process.env.PRODUCTION_BRANCH = "main";
process.env.DEVELOP_BRANCH = "main";
process.env.DEPLOY_ON_DOCKER = "false";

const { parserOpts, writerOpts, ...props } = getSemanticConfig();
export default {
  ...props,
  npmPublish: false,
  // eslint-disable-next-line no-template-curly-in-string
  tagFormat: "v${version}"
};
