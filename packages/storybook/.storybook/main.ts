import { dirname, join } from "path";
export default {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    {
      directory: "../../ui/atoms",
      titlePrefix: "Atoms"
    },
    {
      directory: "../../ui/molecules",
      titlePrefix: "Molecules"
    },
    {
      directory: "../../ui/organisms",
      titlePrefix: "Organisms"
    }
  ],
  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions")
  ],
  framework: getAbsolutePath("@storybook/react-vite"),
  typescript: {
    reactDocgen: "react-docgen"
  },
  docs: {},
  core: {
    disableTelemetry: true
  },
  refs: {
    "trident-ui": {
      title: "Trident UI",
      url: "https://develop.trident-ui.pro.clubmed",
      expanded: false
    }
  }
};

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
