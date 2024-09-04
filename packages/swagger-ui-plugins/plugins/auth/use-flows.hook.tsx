import { useLocalStorage } from "@clubmed/ui/hooks/storage/useLocaleStorage";
import { List, Map } from "immutable";

import { AllowedFlowOpts, System } from "../../interfaces/System";

export interface UseFlowsOptions extends System {
  flows: List<Map<string, any>>;
  schemaName: string;
  allowedFlows?: AllowedFlowOpts[];
}

const FlowsLabels: Record<string, any> = {
  implicit: (
    <div>
      <span className="line-through">Implicit</span> <small className={"block text-gray"}>deprecated</small>
    </div>
  ),
  authorization_code: (
    <div>
      Authorization code <small className={"block text-gray"}>using PCKE</small>
    </div>
  ),
  client_credentials: (
    <div>
      Client credentials <small className={"block text-gray"}>application token</small>
    </div>
  )
};

export function useFlows({ flows: flowsSchemes, specSelectors, authSelectors, schemaName, allowedFlows }: UseFlowsOptions) {
  const authConfigs = authSelectors.getConfigs() || {};
  const defaultFlow = allowedFlows && allowedFlows.length ? allowedFlows[0].flow : flowsSchemes.first().get("flow");

  const { value: flow, setItem: setFlow } = useLocalStorage("preferred_flow", defaultFlow);

  const isPkceCodeGrant = !!authConfigs.usePkceWithAuthorizationCodeGrant;

  let flows: { label: string; value: string }[] = flowsSchemes
    .filter((schema) => (allowedFlows ? allowedFlows.some(({ flow }) => flow === schema!.get("flow")) : true))
    .map((schema) => {
      const name = schema!.get("flow");

      return { label: FlowsLabels[name], value: name };
    })
    .toArray();

  if (allowedFlows) {
    const weights = allowedFlows.reduce(
      (acc, { flow, id }) => {
        return {
          ...acc,
          [flow]: id
        };
      },
      {} as Record<string, number>
    );

    flows = flows.sort((a, b) => {
      return weights[a.value] - weights[b.value];
    });
  }

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
