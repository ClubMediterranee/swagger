export default {
  stories: [
    "../stories/**/*.stories.mdx",
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
  addons: ["@storybook/addon-a11y", "@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react-vite",
  typescript: {
    reactDocgen: "react-docgen"
  },
  docs: {
    autodocs: true
  },
  core: {
    disableTelemetry: true
  }
};
