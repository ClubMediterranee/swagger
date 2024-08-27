import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import classnames from "classnames";
import React, { CSSProperties, PropsWithChildren, useState } from "react";

export function DisabledFieldComponent({
  style,
  value,
  children,
  copy,
  className
}: PropsWithChildren<{ style?: CSSProperties; copy?: string; className?: string; value?: string }>) {
  const [isCopied, set] = useState(false);
  return (
    <div style={style} className={classnames("text-sans flex items-center mb-12 bg-lightSand gap-8 rounded-16 text-b5", className)}>
      <div className="w-1/3 p-12 flex items-center ">{children}</div>
      <div className="w-2/3 p-12 flex items-center bg-lightSand-active rounded-r-16 overflow-auto">
        <div className="flex flex-col w-full group relative">
          <code className={"whitespace-pre"}>{value || "********"}</code>
          {copy && (
            <div className={"absolute bottom-0 right-0 group-hover:opacity-100 opacity-10 transition-opacity"}>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(copy || "");
                  set(true);
                  setTimeout(() => {
                    set(false);
                  }, 1000);
                }}
              >
                {isCopied ? "Copied!" : "Copy"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
