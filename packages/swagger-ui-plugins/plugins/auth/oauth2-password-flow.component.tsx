import { FormControl } from "@clubmed/trident-ui/ui/forms/FormControl";
import { Password } from "@clubmed/trident-ui/ui/forms/password/Password";
import { Radio, RadioGroup } from "@clubmed/trident-ui/ui/forms/radios/index";
import { TextField } from "@clubmed/trident-ui/ui/forms/TextField";
import React from "react";

import { DisabledFieldComponent } from "./disabled-field.component";
import { useOAuth2 } from "./use-oauth2.hook";

export function Oauth2PasswordFlow({
  username,
  passwordType,
  isAuthorized,
  setState
}: Pick<ReturnType<typeof useOAuth2>, "username" | "passwordType" | "isAuthorized" | "setState">) {
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
            onChange={(_, value) => setState("username", value)}
            disabled={isAuthorized}
          />
        )}
      </div>
      <div className={"mb-16"}>
        {isAuthorized ? (
          <DisabledFieldComponent>Password:</DisabledFieldComponent>
        ) : (
          <Password
            label="Password:"
            id="oauth_password"
            type="password"
            name="password"
            onChange={(_, value) => setState("password", value)}
          />
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
                onChange={(_, value) => setState("password_type", value)}
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
