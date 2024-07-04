import classnames from "classnames";
import { PropsWithChildren } from "react";

export function Container({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classnames("relative xl:pb-0 sm:py-20 lg:py-40 text-black", className)}>
      <div className="-z-1 pointer-events-none absolute inset-0 xl:bottom-40 bg-lightSand" />
      {children}
    </div>
  );
}
