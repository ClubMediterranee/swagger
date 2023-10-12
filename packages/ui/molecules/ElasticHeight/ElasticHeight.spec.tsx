import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { ElasticHeight } from './ElasticHeight';

describe('<ElasticHeight />', () => {
  it('keeps the content in the DOM even when closed', () => {
    render(
      <ElasticHeight>
        <p>Awesome content</p>
      </ElasticHeight>,
    );

    const content = screen.getByText('Awesome content');

    expect(content).toBeInTheDocument();
  });

  it('shows the content when open', async () => {
    const TestComponent = () => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div role="presentation">
          {/* eslint-disable-next-line jest/no-conditional-in-test */}
          <ElasticHeight className={isOpen ? '' : 'h-0'}>
            <p>Awesome content</p>
          </ElasticHeight>
          <button onClick={() => setIsOpen(true)}>open</button>
        </div>
      );
    };

    render(<TestComponent />);
    const component = screen.getByRole('presentation');
    const button = screen.getByRole('button');
    await act(() => userEvent.click(button));

    expect(component).toMatchSnapshot('open elasticheight');
  });
});
