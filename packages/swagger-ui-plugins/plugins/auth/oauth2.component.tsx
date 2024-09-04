import { Icon } from "@clubmed/trident-ui/atoms/Icons";
import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { Checkbox, Checkboxes } from "@clubmed/trident-ui/molecules/Forms/Checkboxes";
import { FormControl } from "@clubmed/trident-ui/molecules/Forms/FormControl";
import { Password } from "@clubmed/trident-ui/molecules/Forms/Password";
import { Radio, RadioGroup } from "@clubmed/trident-ui/molecules/Forms/Radios";
import { Switch } from "@clubmed/trident-ui/molecules/Forms/Switch";
import { ClientIdField } from "@clubmed/ui/organisms/Forms/ClientIdField";
import React from "react";

import { decodeToken } from "../../utils/decode-token";
import { DisabledFieldComponent } from "./disabled-field.component";
import { Oauth2PasswordFlow } from "./oauth2-password-flow.component";
import { OAuth2Props, useOAuth2 } from "./use-oauth2.hook";

export function Oauth2Component(props: OAuth2Props) {
  const hookProps = useOAuth2(props);
  const {
    name,
    accessToken,
    oidcUrl,
    schema,
    appName,
    clientSecret,
    clientId,
    selectScopes,
    authorize,
    logout,
    close,
    scopes,
    scopesOptions,
    setState,
    flow,
    flows,
    isValid,
    isAuthorized,
    errors,
    isPkceCodeGrant,
    AUTH_FLOW_ACCESS_CODE,
    AUTH_FLOW_IMPLICIT,
    AUTH_FLOW_PASSWORD,
    AUTH_FLOW_APPLICATION
  } = hookProps;
  let { getComponent } = props;
  const AuthError = getComponent("authError");
  const Markdown = getComponent("Markdown", true);

  let description = schema.get("description");

  const shouldShowSecret =
    flow === AUTH_FLOW_APPLICATION || (!isPkceCodeGrant && (flow === AUTH_FLOW_ACCESS_CODE || flow === AUTH_FLOW_PASSWORD));

  return (
    <div className={"flex flex-col"}>
      <div className={"mb-24 max-w-[718px]"}>
        {isAuthorized && (
          <div className={"flex items-center justify-center gap-8 mb-16 bg-green text-white p-8 rounded-16"}>
            <Icon name="CheckOutlined" width="24px" />
            Authorized
          </div>
        )}
        {appName ? <DisabledFieldComponent value={appName}>Application:</DisabledFieldComponent> : null}
        {description && (
          <div className="text-serif mb-12 py-4 text-b4">
            <Markdown source={"test\nhello world"} />
          </div>
        )}
        {oidcUrl && <DisabledFieldComponent value={oidcUrl}>OpenID Connect URL:</DisabledFieldComponent>}
        {(flow === AUTH_FLOW_IMPLICIT || flow === AUTH_FLOW_ACCESS_CODE) && (
          <DisabledFieldComponent value={schema.get("authorizationUrl")}>Authorization URL:</DisabledFieldComponent>
        )}
        {(flow === AUTH_FLOW_PASSWORD || flow === AUTH_FLOW_ACCESS_CODE || flow === AUTH_FLOW_APPLICATION) && (
          <DisabledFieldComponent value={schema.get("tokenUrl")}>Token URL:</DisabledFieldComponent>
        )}
        {!isAuthorized ? (
          <div className="bg-lightSand py-16 rounded-16 mb-16">
            <FormControl label={"Select a flow:"} id={"flow"}>
              <RadioGroup aria-labelledby={"flow"} name={"flow"} onChange={setState} className={"ml-16"} value={flow}>
                {flows.map(({ label, value }) => {
                  return (
                    <Radio key={value} value={value}>
                      {label}
                    </Radio>
                  );
                })}
              </RadioGroup>
            </FormControl>
          </div>
        ) : null}
        {flow === AUTH_FLOW_PASSWORD ? <Oauth2PasswordFlow {...hookProps} /> : null}
        {(!isAuthorized || (isAuthorized && clientId)) && (
          <div className="mb-16">
            {isAuthorized ? (
              <DisabledFieldComponent>Client ID:</DisabledFieldComponent>
            ) : (
              <ClientIdField
                label="Client ID:"
                id={`client_id_${name}`}
                type={"text"}
                required={true}
                name="client_id"
                minLength={0}
                debounceTimeout={350}
                onChange={setState}
              />
            )}
          </div>
        )}
        {shouldShowSecret && (
          <div className="mb-16">
            {isAuthorized ? (
              <DisabledFieldComponent>Client Secret:</DisabledFieldComponent>
            ) : (
              <>
                <Password
                  label="Client Secret:"
                  id={`client_secret_${flow}`}
                  value={clientSecret}
                  type="password"
                  data-name="clientSecret"
                  name={"client_secret"}
                  required={true}
                  onChange={setState}
                />
              </>
            )}
          </div>
        )}
        {scopesOptions && scopesOptions.length ? (
          !isAuthorized ? (
            <div className="bg-lightSand py-16 rounded-16 mb-16 relative">
              <div className={"absolute right-16 top-12"}>
                <Switch onChange={(_, all) => selectScopes(all)}>
                  <small>Select all</small>
                </Switch>
              </div>
              <FormControl label={"Select scopes"} id="scopes" required={true}>
                <Checkboxes
                  aria-labelledby="scopes"
                  name="scopes"
                  className={"flex flex-wrap gap-12 ml-16"}
                  value={scopes}
                  onChange={setState}
                >
                  {scopesOptions.map(({ scope, description }) => {
                    return (
                      <Checkbox key={scope} value={scope} className={"items-center mb-0"} title={description}>
                        {scope}
                      </Checkbox>
                    );
                  })}
                </Checkboxes>
              </FormControl>
            </div>
          ) : null
        ) : null}
        {isAuthorized && accessToken ? (
          <DisabledFieldComponent
            copy={accessToken}
            value={JSON.stringify(decodeToken(accessToken), null, 2)}
            style={{ maxWidth: "718px" }}
          >
            Access Token:
          </DisabledFieldComponent>
        ) : null}
        {errors.valueSeq().map((error, key) => {
          return <AuthError error={error} key={key} />;
        })}
      </div>

      <div className={"flex items-center justify-center gap-12"}>
        {isAuthorized ? (
          <Button theme="blackStroke" onClick={logout} aria-label="Remove authorization">
            Logout
          </Button>
        ) : (
          <Button onClick={authorize} disabled={!isValid} aria-label="Apply given OAuth2 credentials">
            Authorize
          </Button>
        )}
        <Button theme="black" onClick={close}>
          Close
        </Button>
      </div>
    </div>
  );
}
