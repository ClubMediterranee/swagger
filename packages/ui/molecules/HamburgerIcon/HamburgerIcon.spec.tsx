import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { HamburgerIcon } from './HamburgerIcon';

describe('<HamburgerIcon />', () => {
  const TestComponent = () => {
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

  it('renders an HamburgerIcon', async () => {
    render(<TestComponent />);
    expect(screen.queryByTestId('HamburgerIcon')).toBeInTheDocument();
    await act(() => userEvent.click(screen.getByRole('button')));
    expect(screen.queryByTestId('HamburgerIcon-active')).toBeInTheDocument();
  });
});
