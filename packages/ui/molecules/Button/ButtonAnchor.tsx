import { type CommonButtonProps } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { rootClassName, variants } from "@clubmed/trident-ui/molecules/Buttons/Button.helpers";
import { themes } from "@clubmed/trident-ui/molecules/Buttons/Button.themes";
import { ButtonContent } from "@clubmed/trident-ui/molecules/Buttons/ButtonContent";
import classNames from "classnames";
import type { AnchorHTMLAttributes, FunctionComponent } from "react";

import { Link } from "../Link/Link";

interface ButtonAnchorProps extends CommonButtonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  component?: FunctionComponent;
}

export const ButtonAnchor: FunctionComponent<ButtonAnchorProps> = ({
  theme = "yellow",
  backgroundOverride,
  variant = "text",
  className,
  label,
  children,
  title,
  icon,
  dataTestId,
  href,
  groupName = "",
  component: Cmp = Link,
  ...rest
}) => {
  const showLabel = variant === "text";
  const layout = variants[variant];
  const style = themes(theme, backgroundOverride, groupName);

  return (
    <Cmp
      data-name="ButtonAnchor"
      data-testid={dataTestId}
      className={classNames(rootClassName, style, layout, variant, className)}
      title={title || label}
      href={href}
      {...rest}
    >
      <ButtonContent showLabel={showLabel} label={label} icon={icon}>
        {children}
      </ButtonContent>
    </Cmp>
  );
};
