import { render, screen } from '@testing-library/react';

import { Tag } from './Tag';

describe('<Tag />', () => {
  it('show the label as text', () => {
    render(<Tag label="Awesome Tag" />);

    const tag = screen.getByRole('note');

    expect(tag).toHaveTextContent('Awesome Tag');
  });

  it("should show the icon and no label if displayMode is 'icon'", () => {
    render(<Tag label="Awesome Tag" displayMode="icon" icon="Diamond" />);

    const tag = screen.getByRole('note');
    const icon = tag.querySelector('[data-testid="icon-Diamond"]');

    expect(icon).toBeInTheDocument();
    expect(tag).not.toHaveTextContent('Awesome Tag');
  });

  it('should show the icon and label if displayMode is "both"', () => {
    render(<Tag label="Awesome Tag" displayMode="both" icon="Diamond" />);

    const tag = screen.getByRole('note');
    const icon = tag.querySelector('[data-testid="icon-Diamond"]');

    expect(icon).toBeInTheDocument();
    expect(tag).toHaveTextContent('Awesome Tag');
  });

  it('should show the label and no icon if displayMode is "label"', () => {
    render(<Tag label="Awesome Tag" displayMode="label" icon="Diamond" />);

    const tag = screen.getByRole('note');
    const icon = tag.querySelector('[data-testid="icon-Diamond"]');

    expect(icon).not.toBeInTheDocument();
    expect(tag).toHaveTextContent('Awesome Tag');
  });

  it("should show the label in a circle if displayMode is 'monogram'", () => {
    render(<Tag label="Awesome Tag" displayMode="monogram" />);

    const tag = screen.getByRole('note');

    expect(tag).toHaveClass('p-4');
    expect(tag).toHaveTextContent('Awesome Tag');
  });

  it('should apply text, border and background colors', () => {
    render(<Tag label="Awesome Tag" color="black" backgroundColor="white" border="red" />);

    const tag = screen.getByRole('note');

    expect(tag).toHaveClass('bg-white border-red text-black');
  });

  it('should apply text, border and background colors reversed if shouldInvertColors', () => {
    render(
      <Tag
        label="Awesome Tag"
        color="black"
        border="red"
        backgroundColor="white"
        shouldInvertColors
      />,
    );

    const tag = screen.getByRole('note');

    expect(tag).toHaveClass('bg-black border-black text-white');
  });
});
