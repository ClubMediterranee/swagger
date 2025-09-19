import classnames from "classnames";
import type { ComponentPropsWithoutRef, FunctionComponent } from "react";

export type HeaderProps = ComponentPropsWithoutRef<"header">;

export const Header: FunctionComponent<HeaderProps> = ({ children, className, ...attrs }) => {
  return (
    <header
      {...attrs}
      className={classnames("flex items-center justify-between gap-x-8 overflow-x-clip bg-white p-8 ps-20 lg:px-20", className)}
      role="banner"
    >
      {children}
    </header>
  );
};
