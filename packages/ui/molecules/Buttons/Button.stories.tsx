import { Meta, StoryFn } from '@storybook/react';

import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI-Library/Component/Molecules/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Button> = (args) => (
  <div className="bg-pearl p-32">
    <Button {...args} icon="ArrowDefaultRight" />
  </div>
);

export const Yellow = Template.bind({});
Yellow.args = {
  theme: 'yellow',
  label: 'Yellow Button',
};

export const White = Template.bind({});
White.args = {
  theme: 'white',
  label: 'White Button',
};

export const Black = Template.bind({});
Black.args = {
  theme: 'black',
  label: 'Black Button',
};

export const WhiteStroke = Template.bind({});
WhiteStroke.args = {
  theme: 'whiteStroke',
  label: 'WhiteStroke Button',
};

export const BlackStroke = Template.bind({});
BlackStroke.args = {
  theme: 'blackStroke',
  label: 'BlackStroke Button',
};

export const Yellow_TextSmall = Template.bind({});
Yellow_TextSmall.args = {
  theme: 'yellow',
  label: 'Yellow Button',
  variant: 'textSmall',
};

export const White_TextSmall = Template.bind({});
White_TextSmall.args = {
  theme: 'white',
  label: 'White Button',
  variant: 'textSmall',
};

export const Black_TextSmall = Template.bind({});
Black_TextSmall.args = {
  theme: 'black',
  label: 'Black Button',
  variant: 'textSmall',
};

export const WhiteStroke_TextSmall = Template.bind({});
WhiteStroke_TextSmall.args = {
  theme: 'whiteStroke',
  label: 'WhiteStroke Button',
  variant: 'textSmall',
};

export const BlackStroke_TextSmall = Template.bind({});
BlackStroke_TextSmall.args = {
  theme: 'blackStroke',
  label: 'BlackStroke Button',
  variant: 'textSmall',
};

export const Yellow_Icon = Template.bind({});
Yellow_Icon.args = {
  theme: 'yellow',
  label: 'Yellow Button',
  variant: 'icon',
};

export const White_Icon = Template.bind({});
White_Icon.args = {
  theme: 'white',
  label: 'White Button',
  variant: 'icon',
};

export const Black_Icon = Template.bind({});
Black_Icon.args = {
  theme: 'black',
  label: 'Black Button',
  variant: 'icon',
};

export const WhiteStroke_Icon = Template.bind({});
WhiteStroke_Icon.args = {
  theme: 'whiteStroke',
  label: 'WhiteStroke Button',
  variant: 'icon',
};

export const BlackStroke_Icon = Template.bind({});
BlackStroke_Icon.args = {
  theme: 'blackStroke',
  label: 'BlackStroke Button',
  variant: 'icon',
};

export const Yellow_Arrow = Template.bind({});
Yellow_Arrow.args = {
  theme: 'yellow',
  label: 'Yellow Button',
  variant: 'arrow',
};

export const White_Arrow = Template.bind({});
White_Arrow.args = {
  theme: 'white',
  label: 'White Button',
  variant: 'arrow',
};

export const Black_Arrow = Template.bind({});
Black_Arrow.args = {
  theme: 'black',
  label: 'Black Button',
  variant: 'arrow',
};

export const WhiteStroke_Arrow = Template.bind({});
WhiteStroke_Arrow.args = {
  theme: 'whiteStroke',
  label: 'WhiteStroke Button',
  variant: 'arrow',
};

export const BlackStroke_Arrow = Template.bind({});
BlackStroke_Arrow.args = {
  theme: 'blackStroke',
  label: 'BlackStroke Button',
  variant: 'arrow',
};
