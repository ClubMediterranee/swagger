import { render, screen } from '@testing-library/react';

import { Link } from './Link';

describe('<Link />', () => {
  it('renders the label', () => {
    render(<Link label="Label" href="aaaa" />);
    expect(screen.getByRole('link')).toHaveTextContent('Label');
  });

  it("renders the label (but properly, even if it's multiline and has multiple words)", () => {
    render(<Link label="Label hello how are you on this fine morning?" href="aaaa" />);
    expect(screen.getByRole('link')).toHaveTextContent(
      'Label hello how are you on this fine morning?',
    );
  });

  it('renders the link with its href', () => {
    render(<Link label="Label" href="aaaa" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'aaaa');
  });

  it('renders an icon', () => {
    render(<Link label="Label" href="aaaa" icon="ArrowDefaultRight" />);
    expect(screen.getByTestId('icon-ArrowDefaultRight')).toBeInTheDocument();
  });
});
