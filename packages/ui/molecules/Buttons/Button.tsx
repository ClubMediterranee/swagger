import {animated} from "@react-spring/web";
import classNames from "classnames";
import {FunctionComponent, MouseEvent, MouseEventHandler, ReactNode, useCallback} from "react";

import {rootClassName, variants} from "./Button.helpers";
import {themes} from "./Button.themes";
import {ButtonContent} from "./ButtonContent";

import {Iconics} from "../../atoms/Icon";
import {useSafeBoop} from "../../hooks/useSafeBoop";

export type CommonButtonProps = {
  /**
   * Button themes defining background color and text/icon color
   */
  theme?: "yellow" | "white" | "black" | "whiteStroke" | "blackStroke";
  /**
   * Is it a text button? An icon button? An arrow button?
   */
  variant?: "text" | "textSmall" | "icon" | "arrow";
  /**
   * Background Color override
   * Ideally please use ONLY for the "white" and "black" themes
   */
  backgroundOverride?: string;
  /**
   * Additional class names
   */
  className?: string;
  /**
   * Button title
   */
  title?: string;
  /**
   * Button contents
   */
  label?: string;
  /**
   * Optional children (you might never use this, please actually try to avoid it)
   */
  children?: ReactNode;
  /**
   * Optional icon name
   */
  icon?: Iconics;
  /**
   * Data test id
   */
  dataTestId?: string;
  /**
   * Group name
   * Used to group buttons together (you might not need this)
   */
  groupName?: string;
};

interface ButtonProps extends CommonButtonProps {
  /**
   * Optional click handler
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Button tabIndex
   *
   * @default 0
   */
  tabIndex?: number;
  /**
   * Is the button disabled?
   */
  isDisabled?: boolean;
  /**
   * Data test id
   */
  dataTestId?: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
                                                         theme: themeName = "yellow",
                                                         backgroundOverride,
                                                         variant = "text",
                                                         className,
                                                         label,
                                                         children,
                                                         title,
                                                         icon,
                                                         onClick,
                                                         tabIndex = 0,
                                                         isDisabled = false,
                                                         dataTestId,
                                                         groupName = ""
                                                       }) => {
  const shouldShowLabel = variant === "text" || variant === "textSmall";
  const layout = variants[variant];
  const theme = themes(themeName, backgroundOverride, groupName);
  const [boopStyle, boopTrigger] = useSafeBoop({
    scale: 0.98,
    springConfig: {tension: 280, friction: 20}
  });
  const handleOnClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      boopTrigger();
      onClick?.(e);
    },
    [onClick, boopTrigger]
  );

  return (
    <animated.button
      data-name="Button"
      data-testid={dataTestId}
      type="button"
      className={classNames(rootClassName, theme, layout, variant, className, {
        "pointer-events-none": isDisabled
      })}
      disabled={isDisabled}
      style={boopStyle}
      onClick={handleOnClick}
      tabIndex={isDisabled ? -1 : tabIndex}
      title={title || label}
      aria-label={title || label}
    >
      <ButtonContent shouldShowLabel={shouldShowLabel} label={label} icon={icon}>
        {children}
      </ButtonContent>
    </animated.button>
  );
};
