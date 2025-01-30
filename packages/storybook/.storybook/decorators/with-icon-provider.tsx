import { IconsProvider } from "@clubmed/trident-icons";
import Actions from "@clubmed/trident-icons/svg/Actions";
import Brand from "@clubmed/trident-icons/svg/Brand";
import Utilities from "@clubmed/trident-icons/svg/Utilities";
import { StoryFn } from "@storybook/react";

export function withIconsProvider(Story: StoryFn) {
  return (
    <IconsProvider icons={[Actions, Brand, Utilities]}>
      <Story />
    </IconsProvider>
  );
}
