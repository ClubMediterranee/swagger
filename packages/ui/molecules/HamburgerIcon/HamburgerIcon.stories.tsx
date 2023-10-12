import { StoryFn, Meta } from '@storybook/react';
import { useState } from 'react';

import { HamburgerIcon } from './HamburgerIcon';

export default {
  title: 'UI-Library/Component/Molecules/HamburgerIcon',
  component: HamburgerIcon,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof HamburgerIcon>;

const Template: StoryFn<typeof HamburgerIcon> = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <button
      onClick={() => {
        setIsActive(!isActive);
      }}
    >
      <HamburgerIcon isActive={isActive} />
    </button>
  );
};

export const Default = Template.bind({});
