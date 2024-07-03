import { Button, CommonButtonProps } from "@clubmed/trident-ui/molecules/Buttons/Button";
import classnames from "classnames";
import { Fragment, HTMLAttributes } from "react";

import { ButtonAnchor } from "../../molecules/Button/ButtonAnchor";
import { Link as BaseLink } from "../../molecules/Link/Link";
import { HeaderSectionProps } from "./HeaderSection";

export interface HeaderPanelProps extends CommonButtonProps, HTMLAttributes<HTMLDivElement> {
  isActive: boolean;
  url?: string;
  target?: string;
  Link?: HeaderSectionProps["Link"];
}

export function HeaderPanel({
  Link = BaseLink,
  url,
  label,
  variant,
  icon,
  isActive,
  onFocus,
  onBlur,
  children,
  ...props
}: HeaderPanelProps) {
  const Btn = url ? ButtonAnchor : Button;
  return (
    <Fragment>
      <div {...props}>
        <Btn
          component={Link}
          label={label}
          variant={variant}
          icon={icon}
          target={props.target}
          theme="blackStroke"
          onBlur={(e) => onBlur?.(e as any)}
          onFocus={(e) => onFocus?.(e as any)}
          className={classnames("hidden border-0 md:inline-block", {
            "cursor-pointer": !!url,
            "cursor-default": !url
          })}
          href={url || undefined}
        />

        <div
          className={classnames("absolute inset-x-0 top-full bg-white px-20 py-40", {
            hidden: !isActive
          })}
        >
          {children}
        </div>
      </div>
    </Fragment>
  );
}
