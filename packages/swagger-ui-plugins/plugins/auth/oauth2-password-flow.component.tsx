import { FormControl } from "@clubmed/trident-ui/molecules/Forms/FormControl";
import { Password } from "@clubmed/trident-ui/molecules/Forms/Password";
import { Radio, RadioGroup } from "@clubmed/trident-ui/molecules/Forms/Radios";
import { TextField } from "@clubmed/trident-ui/molecules/Forms/TextField";
import React from "react";

import { DisabledFieldComponent } from "./disabled-field.component";
import { useOAuth2 } from "./use-oauth2.hook";

export function Oauth2PasswordFlow({ username, passwordType, isAuthorized, setState }: ReturnType<typeof useOAuth2>) {
  return (
    <div>
      <div className={"mb-16"}>
        {isAuthorized ? (
          <DisabledFieldComponent value={username}>User name:</DisabledFieldComponent>
        ) : (
          <TextField
            id="oauth_username"
            label={"User name"}
            type="text"
            name="username"
            value={username}
            onChange={setState}
            disabled={isAuthorized}
          />
        )}
      </div>
      <div className={"mb-16"}>
        {isAuthorized ? (
          <DisabledFieldComponent>Password:</DisabledFieldComponent>
        ) : (
          <Password label="Password:" id="oauth_password" type="password" name="password" onChange={setState} />
        )}
      </div>

      <div>
        {isAuthorized ? (
          <DisabledFieldComponent>Client credentials location:</DisabledFieldComponent>
        ) : (
          <div className="bg-lightSand py-16 rounded-16 mb-16">
            <FormControl label={"Client credentials location:"} id="password_type">
              <RadioGroup
                aria-labelledby={"password_type"}
                name="password_type"
                onChange={setState}
                value={passwordType}
                className={"ml-16"}
              >
                <Radio value="basic">Authorization header</Radio>
                <Radio value="request-body">Request body</Radio>
              </RadioGroup>
            </FormControl>
          </div>
        )}
      </div>
    </div>
  );
}
