import {System} from "../../interfaces/System";
import {Button} from "@clubmed/ui/molecules/Buttons";
import React from "react";

export function AuthorizeOperationBtn(props: System & { isAuthorized: boolean, onClick: () => void }) {
  let {isAuthorized} = props;

  return (
    <Button
      variant={"smallIcon" as any}
      aria-expanded={isAuthorized}
      title={isAuthorized ? "authorization button locked" : "authorization button unlocked"}
      onClick={(e) => {
        e.stopPropagation();
        props.onClick();
      }}
      theme={isAuthorized ? "black" : "white"}
      icon={"PeopleSingle"}
      className={"pointer-events-auto me-auto transition-opacity h-32 w-32 text-b6 mx-12"}
    />
  );
}
