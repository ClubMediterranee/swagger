import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from './Switch';

describe('<Switch />', () => {
  it('passes down its className prop', () => {
    render(<Switch isChecked={false} className="my-custom-class" />);

    const container = screen.getByRole('switch');

    expect(container).toHaveClass('my-custom-class');
  });

  it('passes down its labeledBy prop', () => {
    render(<Switch isChecked={false} labeledBy="my-custom-data-testid" />);

    const container = screen.getByLabelText('my-custom-data-testid');

    expect(container).toBeInTheDocument();
  });

  it('passes down its isChecked prop', () => {
    render(<Switch isChecked={true} />);

    const container = screen.getByRole('switch');

    expect(container).toBeChecked();
  });

  it('passes down its isDisabled prop', () => {
    render(<Switch isChecked={false} isDisabled />);

    const container = screen.getByRole('switch');

    expect(container).toBeDisabled();
  });

  it('should call onClick when clicked', async () => {
    const onClick = jest.fn();
    render(<Switch isChecked={false} onClick={({ target }) => onClick(target)} />);

    const container = screen.getByRole('switch');
    await userEvent.click(container);

    expect(onClick).toHaveBeenCalledWith(container);
  });
});
