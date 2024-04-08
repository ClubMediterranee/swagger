import { List, Map } from "immutable";
import { useState } from "react";

import { System } from "../../interfaces/System";

export interface UseFlowsOptions extends System {
  flows: List<Map<string, any>>;
}

export function useFlows({ flows: flowsSchemes, specSelectors, authSelectors }: UseFlowsOptions) {
  const authConfigs = authSelectors.getConfigs() || {};
  const [flow, setFlow] = useState(() => flowsSchemes.first().get("flow"));

  const flows: { label: string; value: string }[] = flowsSchemes
    .map((schema) => {
      return { label: schema!.get("flow"), value: schema!.get("flow") };
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
  const isPkceCodeGrant = !!authConfigs.usePkceWithAuthorizationCodeGrant;
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
