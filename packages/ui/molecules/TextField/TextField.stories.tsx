import { StoryFn, Meta } from '@storybook/react';

import { TextField } from './TextField';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI-Library/Component/Molecules/TextField',
  component: TextField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof TextField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof TextField> = (args) => {
  return (
    <div style={{ width: '280px', maxWidth: '100vw' }} dir="ltr">
      <div className="text-red text-green pe-[52px] pe-[84px] ps-[52px]"></div>
      <TextField {...args} />
    </div>
  );
};

export const Base = Template.bind({});
