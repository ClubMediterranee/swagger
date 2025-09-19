import { Button } from "@clubmed/trident-ui/molecules/Buttons/v2/Button";
import { useConfig } from "@clubmed/ui/contexts/config.context";
import { useEffect } from "react";

import { System } from "../../interfaces/System";

export default function AuthorizeBtn(
  props: System & {
    isAuthorized: boolean;
    showPopup: boolean;
    onClick: () => void;
  }
) {
  let { isAuthorized, showPopup, onClick, getComponent } = props;
  const { config, setConfig } = useConfig();
  //must be moved out of button component
  const AuthorizationPopup = getComponent("authorizationPopup", true);

  useEffect(() => {
    setConfig({
      ...config,
      isAuthorized
    });
  }, [isAuthorized]);

  return (
    <div className="auth-wrapper">
      <Button
        id="authorize-button"
        variant="circle"
        theme="outline"
        color="black"
        icon="PeopleSingle"
        onClick={onClick}
        aria-label={isAuthorized ? "Connected" : "Authorize"}
      />

      {showPopup && <AuthorizationPopup />}
    </div>
  );
}
