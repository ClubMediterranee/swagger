import { Button } from "@clubmed/trident-ui/ui/buttons/Button";
import React from "react";

import { System } from "../../interfaces/System";

export function AuthorizeOperationBtn(props: System & { isAuthorized: boolean; onClick: () => void }) {
  let { isAuthorized } = props;

  return (
    <Button
      aria-expanded={isAuthorized}
      title={isAuthorized ? "authorization button locked" : "authorization button unlocked"}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        props.onClick();
      }}
      size="small"
      variant="circle"
      theme="solid"
      color={isAuthorized ? "black" : "white"}
      icon="PeopleSingle"
      className={"pointer-events-auto me-auto transition-opacity size-32 text-b6 mx-12"}
    />
  );
}
