import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import React from "react";

import { System } from "../../interfaces/System";

export function AuthorizeOperationBtn(props: System & { isAuthorized: boolean; onClick: () => void }) {
  let { isAuthorized } = props;

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
      icon="PeopleSingle"
      className={"pointer-events-auto me-auto transition-opacity size-32 text-b6 mx-12"}
    />
  );
}
