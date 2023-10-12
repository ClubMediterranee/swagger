import { render, screen } from '@testing-library/react';

import { Loader } from './Loader';

describe('<Loader />', () => {
  it('renders a Loader', () => {
    render(<Loader isVisible label="They see me loadin', they hatin'" />);
    expect(screen.getByRole('alert')).toMatchSnapshot('Loader');
  });
});
