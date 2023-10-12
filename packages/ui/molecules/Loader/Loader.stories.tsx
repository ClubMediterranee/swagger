import { StoryFn, Meta } from '@storybook/react';

import { useState } from 'react';

import { Loader } from './Loader';

export default {
  title: 'UI-Library/Component/Molecules/Loader',
  component: Loader,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Loader>;

const Template: StoryFn<typeof Loader> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <div
          className="h-screen w-screen object-cover"
          style={{
            backgroundImage: "url('https://fakeimg.pl/1000x1000')",
            backgroundSize: 'cover',
          }}
        />
      </button>
      <Loader {...args} isVisible={isOpen} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'This is like elevator music but for your eyes. Please wait while we load your content.',
};
