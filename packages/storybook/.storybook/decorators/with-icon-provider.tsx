import { IconsProvider } from "@clubmed/trident-ui/atoms/Icons";
import Actions from "@clubmed/trident-ui/atoms/Icons/svg/Actions";
import Brand from "@clubmed/trident-ui/atoms/Icons/svg/Brand";
import Utilities from "@clubmed/trident-ui/atoms/Icons/svg/Utilities";
import { StoryFn } from "@storybook/react";

export function withIconsProvider(Story: StoryFn) {
  return (
    <IconsProvider icons={[Actions, Brand, Utilities]}>
      <Story />
    </IconsProvider>
  );
}
