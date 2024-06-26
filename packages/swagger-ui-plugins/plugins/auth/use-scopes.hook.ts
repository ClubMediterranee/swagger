import { Map } from "immutable";
import { useState } from "react";

import type { InitOAuthOptions } from "../../interfaces/System";

export function useScopes({
  schema,
  auth,
  authConfigs
}: {
  auth?: Map<string, any>;
  schema: Map<string, any>;
  authConfigs: InitOAuthOptions;
}) {
  const { allowedScopes, defaultSelectedScopes = [] } = authConfigs;
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
