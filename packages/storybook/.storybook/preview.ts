import "@clubmed/trident-ui/style.css";
import { withIconsProvider } from "./decorators/with-icon-provider";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Preview } from "@storybook/react";

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
};
export const tags = ["autodocs"];

export default {
  parameters,
  decorators: [withIconsProvider]
} satisfies Preview;
