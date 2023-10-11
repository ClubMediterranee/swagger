import { render, screen } from '@testing-library/react';

import { Icon } from './Icon';

import { Iconics, Icons } from '../assets/icons';

describe('<Icon />', () => {
  it('shows an icon according to the name prop', () => {
    const iconName = 'ClubMed';
    render(<Icon name={iconName} />);

    const container = screen.getByTestId(`icon-${iconName}`);
    const svg = container.querySelector('svg');
    const use = container.querySelector('use');

    expect(container).toContainHTML('svg');
    expect(svg).toHaveAttribute('viewBox', Icons[iconName].viewBox);
    expect(use).toHaveAttribute('xlink:href', expect.stringContaining(`#${iconName}`));
  });

  it("shows no icon if the name doesn't exist", () => {
    // technically can't happen because of the type, but let's be safe
    const iconName = 'NotAnIcon';
    render(<Icon name={iconName as Iconics} />);
    const container = screen.queryByTestId(`icon-${iconName}`);

    expect(container).toBeNull();
  });

  it('displays the icon according to the width prop', () => {
    const iconName = 'ClubMed';
    const width = '32px';
    render(<Icon name={iconName} width={width} />);

    const container = screen.getByTestId(`icon-${iconName}`);

    expect(container).toHaveStyle({ width });
  });

  it('displays the icon according to the rotation prop', () => {
    const iconName = 'ClubMed';
    const rotation = 90;
    render(<Icon name={iconName} rotation={rotation} />);

    const container = screen.getByTestId(`icon-${iconName}`);
    expect(container.style.rotate).toBe('90deg');
  });

  it('displays the icon according to the color prop', () => {
    const iconName = 'ClubMed';
    const color = 'red';
    render(<Icon name={iconName} color={color} />);

    const container = screen.getByTestId(`icon-${iconName}`);

    expect(container).toHaveClass(`text-${color}`);
  });

  it('displays the icon according to the className prop', () => {
    const iconName = 'ClubMed';
    const className = 'my-custom-class';
    render(<Icon name={iconName} className={className} />);

    const container = screen.getByTestId(`icon-${iconName}`);

    expect(container).toHaveClass(className);
  });

  it('should return when the icon is unknown', () => {
    const iconName = 'unknown_icon';
    const container = screen.queryByTestId(`icon-${iconName}`);
    expect(container).toBeNull();
  });
});
