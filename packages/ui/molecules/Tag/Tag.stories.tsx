import { StoryFn, Meta } from '@storybook/react';

import { Tag } from './Tag';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI-Library/Component/Molecules/Tag',
  component: Tag,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Tag>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Tag> = (args) => (
  <div className="bg-pearl p-32">
    <Tag {...args} icon="ArrowDefaultRight" />
  </div>
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
  label: 'Base Tag',
};
