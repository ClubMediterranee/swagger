import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useTabControls } from './useTabControls';

describe('useTabControls', () => {
  const TestComponent = () => {
    const callback = jest.fn();
    const items = [{ label: 'test1' }, { label: 'test2' }];
    const [activeItem, setActiveItem, refsArray, goToNext, goToPrev] = useTabControls(
      items,
      0,
      callback,
    );

    return (
      <div>
        {items.map((item, index) => (
          <button
            key={index}
            ref={(element) => {
              return refsArray.current && (refsArray.current[index] = element as HTMLButtonElement);
            }}
            onClick={() => {
              setActiveItem(index);
            }}
          >
            {item.label}
          </button>
        ))}
        <button onClick={goToNext}>next</button>
        <button onClick={goToPrev}>prev</button>
        <div data-testid="indexindicator">{activeItem}</div>
      </div>
    );
  };

  it('should update active item when clicking a button', async () => {
    const { getByText, getByTestId } = render(<TestComponent />);

    const button1 = getByText('test1');
    const button2 = getByText('test2');
    const next = getByText('next');
    const prev = getByText('prev');
    const indexIndicator = getByTestId('indexindicator');

    expect(indexIndicator).toHaveTextContent('0');

    await act(() => userEvent.click(button2));

    expect(indexIndicator).toHaveTextContent('1');

    await act(() => userEvent.click(next));

    expect(indexIndicator).toHaveTextContent('0');

    await act(() => userEvent.click(prev));

    expect(indexIndicator).toHaveTextContent('1');

    await act(() => userEvent.click(button1));

    expect(indexIndicator).toHaveTextContent('0');
  });

  it('should update active item when using keyboard nav', () => {
    const { getByText, getByTestId } = render(<TestComponent />);

    const button1 = getByText('test1');
    const button2 = getByText('test2');
    const indexIndicator = getByTestId('indexindicator');

    expect(indexIndicator).toHaveTextContent('0');

    button1.focus();
    fireEvent.keyDown(button1, { which: 39 });

    expect(indexIndicator).toHaveTextContent('1');

    fireEvent.keyDown(button2, { which: 37 });

    expect(indexIndicator).toHaveTextContent('0');

    fireEvent.keyDown(button1, { which: 38 });

    expect(indexIndicator).toHaveTextContent('1');

    fireEvent.keyDown(button2, { which: 40 });

    expect(indexIndicator).toHaveTextContent('0');

    fireEvent.keyDown(button2, { which: 36 });

    expect(indexIndicator).toHaveTextContent('0');

    fireEvent.keyDown(button2, { which: 35 });

    expect(indexIndicator).toHaveTextContent('1');

    fireEvent.keyDown(button2, { which: 123 });

    expect(indexIndicator).toHaveTextContent('1');
  });
});
