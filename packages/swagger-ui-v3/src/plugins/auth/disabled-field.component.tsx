import classnames from "classnames";
import React, { PropsWithChildren } from "react";

export function DisabledFieldComponent({ value, children, className }: PropsWithChildren<{ className?: string; value?: string }>) {
  return (
    <div className={classnames("text-sans flex items-center mb-12 bg-lightSand gap-8 rounded-16 text-b5", className)}>
      <div className="w-1/3 p-12 flex items-center ">{children}</div>
      <div className="w-2/3 p-12 flex items-center bg-lightSand-active rounded-r-16">
        <code>{value || "********"}</code>
      </div>
    </div>
  );
}
