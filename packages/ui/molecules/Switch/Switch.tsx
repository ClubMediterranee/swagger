import {animated, useSpring} from "@react-spring/web";
import classnames from "classnames";
import {CSSProperties} from "react";

import {bouncyInterpolation} from "../../utils/animations/interpolations";
import {useValue} from "../../hooks/form/useValue";

interface SwitchProps {
  name?: string;
  /**
   * The class name to apply to the button.
   */
  className?: string;
  /**
   * The data-testid to apply to the button.
   * This is used for testing purposes.
   * */
  labeledBy?: string;
  /**
   * Whether the switch is checked or not.
   * */
  value: boolean;
  /**
   * Whether the switch is disabled or not.
   * */
  isDisabled?: boolean;
  /**
   * The width of the switch.
   * */
  width?: number;

  onChange?(name: string, value: boolean): void;

  /**
   * The tab index of the switch.
   * */
  tabIndex?: number;
}

const useSwitch = ({value, isDisabled, onChange, name}: SwitchProps) => {
  const props = useValue<boolean>({initialValue: value, onChange, name: name!});

  const {x, opacity} = useSpring({
    to: {
      x: props.value ? 1 : 0,
      opacity: props.value ? -0.25 : 1 // timing stuff
    },
    config: {
      tension: 200,
      friction: 30
    }
  });
  const handleClick = () => {
    if (!isDisabled) {
      props.setValue(!props.value);
    }
  };

  return {...props, x, opacity, handleClick};
};

export function Switch(props: SwitchProps) {
  const {
    className,
    labeledBy,
    isDisabled,
    width = 56,
    tabIndex = 0
  } = props;
  const {value, x, opacity, handleClick} = useSwitch(props);

  const buttonStyle = {height: (width * 4) / 7, width};
  return (
    <button
      className={classnames(
        className,
        "rounded-pill flex items-center transition-colors duration-200",
        {"bg-grey": !value},
        {"bg-saffron": value}
      )}
      aria-label={labeledBy}
      type="button"
      style={buttonStyle}
      tabIndex={tabIndex}
      onClick={handleClick}
      data-name="Switch"
      role="switch"
      aria-checked={!!value}
      disabled={isDisabled}
    >
      <animated.svg
        viewBox="0 0 24 24"
        style={
          {
            "--translate": x.to(
              bouncyInterpolation(
                `((${width}px / 14) + 0px)`,
                `((${width}px / 14) + ${(width * 3) / 7}px)`,
                0.1,
                width / 28 // nominally 2px for 56px width but just in case
              )
            ),
            transform: "translateX(calc(var(--translate) * var(--xDirCoefficient)))"
          } as CSSProperties
        }
        width={(width * 3) / 7}
      >
        <g>
          <circle cx={12} cy={12} r={12} fill="hsl(var(--color-white))"/>
          <animated.circle
            cx={12}
            cy={12}
            r={4}
            style={{opacity}}
            fill="hsl(var(--color-grey))"
          />
        </g>
      </animated.svg>
    </button>
  );
}
