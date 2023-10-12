import { render, screen } from '@testing-library/react';

import { TextField } from './TextField';

describe('<TextField />', () => {
  it('renders the label', () => {
    render(<TextField label="Label" id="id" />);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<TextField label="Label" description="Description" id="id" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders the placeholder', () => {
    render(<TextField placeholder="Placeholder" id="id" />);
    expect(screen.getByPlaceholderText('Placeholder')).toBeInTheDocument();
  });

  it('renders the error message', () => {
    render(<TextField status="error" errorMessage="Error message" id="id" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<TextField icon="CalendarDefault" id="id" />);
    expect(screen.getByTestId('icon-CalendarDefault')).toBeInTheDocument();
  });

  it('renders the dropdown icon if hasDropdown', () => {
    render(<TextField hasDropdown id="id" />);
    expect(screen.getByTestId('icon-ArrowDefaultDown')).toBeInTheDocument();
  });

  it('renders the disabled input', () => {
    render(<TextField placeholder="Placeholder" isDisabled id="id" />);
    expect(screen.queryByPlaceholderText('Placeholder')).toHaveAttribute('disabled');
  });

  it('renders the error input', () => {
    render(<TextField placeholder="Placeholder" status="error" id="id" />);
    expect(screen.queryByPlaceholderText('Placeholder')).toHaveClass('border-red');
  });

  it('renders the success input', () => {
    render(<TextField placeholder="Placeholder" status="success" id="id" />);
    expect(screen.queryByPlaceholderText('Placeholder')).toHaveClass('border-green');
  });

  it('renders the default input', () => {
    render(<TextField placeholder="Placeholder" id="id" />);
    expect(screen.queryByPlaceholderText('Placeholder')).toHaveClass('border-lightGrey');
  });
});
