import { Icon } from "@clubmed/trident-ui/atoms/Icons";
import { Button } from "@clubmed/trident-ui/molecules/Buttons/Button";
import { Checkbox, Checkboxes } from "@clubmed/trident-ui/molecules/Forms/Checkboxes";
import { FormControl } from "@clubmed/trident-ui/molecules/Forms/FormControl";
import { Password } from "@clubmed/trident-ui/molecules/Forms/Password";
import { Radio, RadioGroup } from "@clubmed/trident-ui/molecules/Forms/Radios";
import { Switch } from "@clubmed/trident-ui/molecules/Forms/Switch";
import { ClientIdField } from "@clubmed/ui/organisms/Forms/ClientIdField";
import React from "react";

import { DisabledFieldComponent } from "./disabled-field.component";
import { Oauth2PasswordFlow } from "./oauth2-password-flow.component";
import { OAuth2Props, useOAuth2 } from "./use-oauth2.hook";

function ScopesLabel({ onChange }: { onChange: (all: boolean) => void }) {
  return (
    <span className={"flex w-full mr-16"}>
      <span className={"flex-1"}>Select scopes:</span>
      <Switch onChange={(_, all) => onChange(all)}>
        <small>Select all</small>
      </Switch>
    </span>
  );
}

export function Oauth2Component(props: OAuth2Props) {
  const hookProps = useOAuth2(props);
  const {
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
  return (
    <div className={"flex flex-col"}>
      <div className={"mb-24"}>
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
            <FormControl label={"Select a flow:"} id="flow">
              <RadioGroup aria-labelledby={"flow"} name="flow" onChange={setState} value={flow} className={"ml-16"}>
                {flows.map(({ label, value }) => (
                  <Radio key={value} value={value} checked={flow === value}>
                    {label}
                  </Radio>
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        ) : null}

        {flow === AUTH_FLOW_PASSWORD ? <Oauth2PasswordFlow {...hookProps} /> : null}

        {(flow === AUTH_FLOW_APPLICATION || flow === AUTH_FLOW_IMPLICIT || flow === AUTH_FLOW_ACCESS_CODE || flow === AUTH_FLOW_PASSWORD) &&
          (!isAuthorized || (isAuthorized && clientId)) && (
            <div className="mb-16">
              {isAuthorized ? (
                <DisabledFieldComponent>Client ID:</DisabledFieldComponent>
              ) : (
                <ClientIdField
                  label="Client ID:"
                  id={`client_id_${flow}`}
                  type={"text"}
                  required={flow === AUTH_FLOW_PASSWORD}
                  value={clientId}
                  name="client_id"
                  minLength={0}
                  debounceTimeout={350}
                  onChange={setState}
                />
              )}
            </div>
          )}

        {!isPkceCodeGrant && (flow === AUTH_FLOW_APPLICATION || flow === AUTH_FLOW_ACCESS_CODE || flow === AUTH_FLOW_PASSWORD) && (
          <div className="mb-16">
            {isAuthorized ? (
              <DisabledFieldComponent>Client Secret:</DisabledFieldComponent>
            ) : (
              <Password
                label="Client Secret:"
                id={`client_secret_${flow}`}
                value={clientSecret}
                type="password"
                data-name="clientSecret"
                onChange={setState}
              />
            )}
          </div>
        )}

        {!isAuthorized && scopesOptions && scopesOptions.length ? (
          <div className="bg-lightSand py-16 rounded-16 mb-16">
            <FormControl label={<ScopesLabel onChange={(all: boolean) => selectScopes(all)} />} id="scopes">
              <Checkboxes
                aria-labelledby="scopes"
                name="scopes"
                className={"flex flex-wrap gap-12 ml-16"}
                value={scopes}
                onChange={setState}
              >
                {scopesOptions.map(({ scope, description }) => {
                  return (
                    <Checkbox value={scope} className={"items-center mb-0"} title={description}>
                      {scope}
                    </Checkbox>
                  );
                })}
              </Checkboxes>
            </FormControl>
          </div>
        ) : null}

        {errors.valueSeq().map((error, key) => {
          return <AuthError error={error} key={key} />;
        })}
      </div>

      <div className={"flex items-center justify-center gap-12"}>
        {isValid &&
          (isAuthorized ? (
            <Button theme="blackStroke" onClick={logout} aria-label="Remove authorization">
              Logout
            </Button>
          ) : (
            <Button onClick={authorize} aria-label="Apply given OAuth2 credentials">
              Authorize
            </Button>
          ))}
        <Button theme="black" onClick={close}>
          Close
        </Button>
      </div>
    </div>
  );
}
