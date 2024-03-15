import classnames from "classnames";
import { HTMLAttributes, PropsWithChildren } from "react";

export function HeaderColumns({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      {...props}
      className={classnames("m mb-24 flex columns-5 justify-center gap-x-40", props.className)}
      role="menu"
      aria-label="desktop-menuItem"
    >
      {children}
    </div>
  );
}

export function HeaderColumn({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...props} className={classnames("text-b3 break-inside-avoid-column", className)} role="menuitem">
      {children}
    </div>
  );
}
