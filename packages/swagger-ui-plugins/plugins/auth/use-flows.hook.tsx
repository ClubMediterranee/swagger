import { useLocalStorage } from "@clubmed/ui/hooks/storage/useLocaleStorage";
import { List, Map } from "immutable";
import { useState } from "react";

import { System } from "../../interfaces/System";

export interface UseFlowsOptions extends System {
  flows: List<Map<string, any>>;
}

const FlowsLabels: Record<string, any> = {
  implicit: (
    <div>
      <span className="line-through">Implicit</span> <small className={"block text-gray"}>deprecated</small>
    </div>
  ),
  authorization_code: "Authorization Code"
};

export function useFlows({ flows: flowsSchemes, specSelectors, authSelectors }: UseFlowsOptions) {
  const authConfigs = authSelectors.getConfigs() || {};
  const { value: flow, setItem: setFlow } = useLocalStorage("preferred_flow", flowsSchemes.first().get("flow"));

  const isPkceCodeGrant = !!authConfigs.usePkceWithAuthorizationCodeGrant;

  const flows: { label: string; value: string }[] = flowsSchemes
    .filter((schema) => (authConfigs.allowedFlows ? authConfigs.allowedFlows.includes(schema!.get("flow")) : true))
    .map((schema) => {
      const name = schema!.get("flow");

      if (name === "authorization_code" && isPkceCodeGrant) {
        return {
          label: (
            <div>
              {FlowsLabels[name]} <small className={"block text-gray"}>with PCKE</small>
            </div>
          ),
          value: name
        };
      }

      return { label: FlowsLabels[name], value: name };
    })
    .toArray();

  const schema = flowsSchemes.find((schema) => schema!.get("flow") === flow);

  const { isOAS3 } = specSelectors;

  let oidcUrl = isOAS3() ? schema.get("openIdConnectUrl") : null;

  // Auth type consts
  const AUTH_FLOW_IMPLICIT = "implicit";
  const AUTH_FLOW_PASSWORD = "password";
  const AUTH_FLOW_ACCESS_CODE = isOAS3() ? (oidcUrl ? "authorization_code" : "authorizationCode") : "accessCode";
  const AUTH_FLOW_APPLICATION = isOAS3() ? (oidcUrl ? "client_credentials" : "clientCredentials") : "application";
  const flowToDisplay = flow === AUTH_FLOW_ACCESS_CODE && isPkceCodeGrant ? flow + " with PKCE" : flow;

  return {
    oidcUrl,
    authConfigs,
    isPkceCodeGrant,
    flowToDisplay,
    schema,
    flow,
    setFlow,
    flows,
    AUTH_FLOW_IMPLICIT,
    AUTH_FLOW_PASSWORD,
    AUTH_FLOW_ACCESS_CODE,
    AUTH_FLOW_APPLICATION
  };
}
