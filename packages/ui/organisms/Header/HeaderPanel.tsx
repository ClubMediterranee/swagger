import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { ButtonAnchor } from "@clubmed/trident-ui/molecules/Buttons/ButtonAnchor";
import classnames from "classnames";
import { Fragment, HTMLAttributes } from "react";

export interface HeaderPanelProps extends HTMLAttributes<HTMLDivElement> {
  isActive: boolean;
  url?: string;
  label: string;
}

export function HeaderPanel({ url, label, isActive, onFocus, onBlur, children, ...props }: HeaderPanelProps) {
  const Btn = url ? ButtonAnchor : Button;
  return (
    <Fragment>
      <div {...props}>
        <Btn
          label={label}
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
