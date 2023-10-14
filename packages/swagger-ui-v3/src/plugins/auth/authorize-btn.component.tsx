import React from "react";
import {Button} from "@clubmed/ui/molecules/Buttons";
import {System} from "../../interfaces/System";


export default function AuthorizeBtn(props: System & {
  isAuthorized: boolean,
  showPopup: boolean,
  onClick: () => void
}) {
  let {isAuthorized, showPopup, onClick, getComponent} = props;

  //must be moved out of button component
  const AuthorizationPopup = getComponent("authorizationPopup", true);

  return (
    <div className="auth-wrapper">
      <Button
        theme="blackStroke"
        variant="icon"
        icon="PeopleSingle"
        onClick={onClick}
        label={isAuthorized ? "Hello" : "Authorize"}
      ></Button>

      {showPopup && <AuthorizationPopup/>}
    </div>
  );
}
