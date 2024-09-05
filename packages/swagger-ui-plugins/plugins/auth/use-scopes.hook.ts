import { Map } from "immutable";
import { useState } from "react";

import { AllowedFlowOpts, AuthSelectors, InitOAuthOptions } from "../../interfaces/System";
import { useAllowedFlows } from "./user-allowed-flows.hook";

export function useScopes({
  schema,
  auth,
  allowedFlows,
  authConfigs,
  flow
}: {
  flow: string;
  auth?: Map<string, any>;
  schema: Map<string, any>;
  authSelectors: AuthSelectors;
  schemaName: string;
  allowedFlows?: AllowedFlowOpts[];
  authConfigs: InitOAuthOptions;
}) {
  const { defaultSelectedScopes = [] } = authConfigs;

  const allowedScopes =
    allowedFlows && allowedFlows.length
      ? allowedFlows.find((allowedFlow) => allowedFlow.flow === flow)?.scopes || authConfigs.allowedScopes
      : undefined;

  let scopesOptions = [...(schema.get("allowedScopes")! || schema.get("scopes")!)].map(([scope, description]) => {
    return { scope, description };
  });

  if (allowedScopes) {
    scopesOptions = scopesOptions.filter(({ scope }) => allowedScopes.includes(scope));
  }

  const [scopes, setScopes] = useState<string[]>(() => {
    let scopes =
      (auth && auth.get("scopes")) ||
      authConfigs.scopes ||
      scopesOptions.filter(({ scope }) => defaultSelectedScopes.includes(scope)).map(({ scope }) => scope);

    if (typeof scopes === "string") {
      scopes = scopes.split(authConfigs.scopeSeparator || " ");
    }

    return scopes;
  });

  const selectScopes = (all: boolean) => {
    if (all) {
      setScopes(scopesOptions.map(({ scope }) => scope));
    } else {
      setScopes([]);
    }
  };

  return {
    scopes,
    setScopes,
    scopesOptions: scopesOptions.sort((a, b) => a.scope.localeCompare(b.scope)),
    selectScopes
  };
}
