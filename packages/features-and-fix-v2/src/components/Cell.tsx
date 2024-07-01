import { PropsWithChildren } from "react";

export function Cell({ children }: PropsWithChildren<{}>) {
  return (
    <div>
      <div className={"w-[400px] flex flex-col p-16 gap-y-16 rounded-16"}>
        <h3 className="pl-8 font-serif text-ultramarine">{children}</h3>
      </div>
    </div>
  );
}
