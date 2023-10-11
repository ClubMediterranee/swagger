import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('<Button />', () => {
  it('show the label as text', () => {
    render(<Button label="Awesome Button" />);

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Awesome Button');
  });

  it('has a default style', () => {
    render(<Button label="Awesome Button" />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-saffron border-saffron text-black');
    expect(button).toHaveClass('py-12 px-32 text-b3');
  });

  it('has a white style', () => {
    render(<Button label="Awesome Button" theme="white" />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-white border-white text-black');
    expect(button).toHaveClass('py-12 px-32 text-b3');
  });

  it('has a black style', () => {
    render(<Button label="Awesome Button" theme="black" />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-black border-black text-white');
    expect(button).toHaveClass('py-12 px-32 text-b3');
  });

  it('has a whiteStroke style', () => {
    render(<Button label="Awesome Button" theme="whiteStroke" />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-transparent border-white text-white');
    expect(button).toHaveClass('py-12 px-32 text-b3');
  });

  it('has a blackStroke style', () => {
    render(<Button label="Awesome Button" theme="blackStroke" />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-transparent border-black text-black');
    expect(button).toHaveClass('py-12 px-32 text-b3');
  });

  it('has a default variant', () => {
    render(<Button label="Awesome Button" />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('h-auto');
    expect(button).toHaveTextContent('Awesome Button');
  });

  it('has an icon variant', () => {
    render(<Button label="Awesome Button" variant="icon" />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('w-48 h-48');
    expect(button.querySelector('.sr-only')).toHaveTextContent('Awesome Button');
  });

  it('has an arrow variant', () => {
    render(<Button label="Awesome Button" variant="arrow" />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('w-100 h-100');
    expect(button.querySelector('.sr-only')).toHaveTextContent('Awesome Button');
  });

  it('forwards a click event', async () => {
    const onClick = jest.fn();

    render(<Button label="Awesome Button" onClick={({ target }) => onClick(target)} />);

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledWith(button);
  });

  it("doesn't forward a click event when disabled", async () => {
    const onClick = jest.fn();

    render(<Button label="Awesome Button" onClick={({ target }) => onClick(target)} isDisabled />);

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('has a tabindex', () => {
    render(<Button label="Awesome Button" tabIndex={0} />);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('tabindex', '0');
  });

  it('can have an icon', () => {
    render(<Button label="Awesome Button" icon="ArrowDefaultRight" />);
    const button = screen.getByRole('button');
    const icon = button.querySelector('[data-testid="icon-ArrowDefaultRight"]');

    expect(icon).toBeInTheDocument();
  });
});
