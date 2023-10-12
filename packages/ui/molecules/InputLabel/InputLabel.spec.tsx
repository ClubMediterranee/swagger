import { render, screen } from '@testing-library/react';

import { InputLabel } from './InputLabel';

describe('<InputLabel />', () => {
  it('renders the label', () => {
    render(<InputLabel label="Label" id="id" />);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<InputLabel label="Label" description="Description" id="id" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
