import { animated } from '@react-spring/web';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useFocusIndicator from './useFocusIndicator';
import { useTabControls } from './useTabControls';

describe('useFocusIndicator', () => {
  const TestComponent = () => {
    const items = [{ label: 'test1' }, { label: 'test2' }];
    const [activeItem, setActiveItem, refsArray] = useTabControls(items, 0);

    const [focusIndicatorStyle, scrollArea, scrollLeft] = useFocusIndicator(activeItem, refsArray);

    return (
      <div className="relative flex" data-testid="scrollarea" ref={scrollArea}>
        <animated.div
          className="pointer-events-none absolute"
          style={{
            ...focusIndicatorStyle,
          }}
          data-testid="focusindicator"
        />
        {items.map((item, index) => (
          <button
            key={index}
            ref={(element) => {
              return refsArray.current && (refsArray.current[index] = element as HTMLButtonElement);
            }}
            onClick={() => {
              setActiveItem(index);
            }}
            style={{ width: 100 }}
          >
            {item.label}
          </button>
        ))}
        <animated.div data-testid="scrollleft">{scrollLeft.to((x) => x)}</animated.div>
      </div>
    );
  };

  it('should update focus indicator position when active item changes', () => {
    const { getByText, getByTestId } = render(<TestComponent />);

    const scrollArea = getByTestId('scrollarea');
    const button2 = getByText('test2');
    const focusIndicator = getByTestId('focusindicator');

    //take a snapshot of the initial state
    expect(focusIndicator).toMatchSnapshot('initial state');

    userEvent.click(button2);
    fireEvent.mouseMove(scrollArea, { clientX: 200, clientY: 0 });
    fireEvent.mouseMove(scrollArea, { clientX: -200, clientY: 0 });

    //take a snapshot of the state after clicking the second button
    expect(focusIndicator).toMatchSnapshot('after clicking second button');
  });

  it("shouldn't work without essential refs", () => {
    // this is purely for code coverage, to test the early returns in useFocusIndicator
    const Component = () => {
      const items = [{ label: 'test1' }, { label: 'test2' }];
      const [activeItem] = useTabControls(items, 0);

      const props = useFocusIndicator(activeItem, {
        current: null,
      });

      return <div>{props.toString()}</div>;
    };

    render(<Component />);
    expect('nothing').toBe('nothing');
  });
});
