import { StoryFn, Meta } from '@storybook/react';

import { useState } from 'react';

import { Switch } from './Switch';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI-Library/Component/Molecules/Controls/Switch',
  component: Switch,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Switch>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Switch> = (args) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Switch
      {...args}
      isChecked={isChecked}
      onClick={() => {
        setIsChecked(!isChecked);
      }}
    />
  );
};

export const Base = Template.bind({});
