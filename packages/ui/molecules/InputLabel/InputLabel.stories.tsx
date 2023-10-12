import { StoryFn, Meta } from '@storybook/react';

import { InputLabel } from './InputLabel';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI-Library/Component/Molecules/InputLabel',
  component: InputLabel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof InputLabel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof InputLabel> = (args) => {
  return (
    <div style={{ width: '280px', maxWidth: '100vw' }}>
      <InputLabel {...args} id="id" />
    </div>
  );
};

export const With_label = Template.bind({});
With_label.args = {
  label: 'Label',
};

export const With_label_and_description = Template.bind({});
With_label_and_description.args = {
  label: 'Label',
  description: 'Additional informations',
};
