import { StoryFn, Meta } from '@storybook/react';

import { Link } from './Link';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI-Library/Component/Molecules/Link',
  component: Link,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Link>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Link> = (args) => {
  return (
    <div style={{ maxWidth: 200 }}>
      <Link {...args} href="https://google.fr" className="font-semibold" />
    </div>
  );
};

export const Base = Template.bind({});
Base.args = {
  label: 'Label',
};

export const With_icon = Template.bind({});
With_icon.args = {
  label: 'Label',
  icon: 'ArrowTailRight',
};

export const Multiline_with_icon = Template.bind({});
Multiline_with_icon.args = {
  label: 'Label ipsum dolor sit amet consectetur adipisicing elit elit elit elit elit elit elit.',
  icon: 'ArrowTailRight',
};
