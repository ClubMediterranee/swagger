import { Map } from "immutable";
import { SyntheticEvent, useState } from "react";

import { useFlows, UseFlowsOptions } from "./use-flows.hook";
import { useScopes } from "./use-scopes.hook";

function oauth2Authorize(opts: any) {}

export interface OAuth2Props extends UseFlowsOptions {
  authorized: Map<string, Map<string, any>>;
  schemaName: string;
}

export function useOAuth2(props: OAuth2Props) {
  let { authorized, authSelectors, specSelectors, errSelectors, schemaName, flows: flowsSchemes } = props;

  const flowsProps = useFlows(props);

  const { authConfigs, setFlow, schema } = flowsProps;
  const auth = authorized && authorized.get(schemaName);
  const authorizedAuth = authSelectors.authorized().get(schemaName);
  const isAuthorized = !!authorizedAuth;
  const errors = errSelectors.allErrors().filter((err) => err!.get("authId") === schemaName);
  const isValid = !errors.filter((err) => err!.get("source") === "validation").size;

  const { scopesOptions, scopes, setScopes, selectScopes } = useScopes({ auth, schema, authConfigs });

  const [appName, setAppName] = useState(authConfigs.appName);

  const [clientId, setClientId] = useState(() => {
    return (auth && auth.get("clientId")) || authConfigs.clientId || "";
  });

  const [clientSecret, setClientSecret] = useState(() => {
    return (auth && auth.get("clientSecret")) || authConfigs.clientSecret || "";
  });

  const [username, setUsername] = useState(() => {
    return (auth && auth.get("username")) || "";
  });
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState(() => {
    return (auth && auth.get("passwordType")) || "basic";
  });

  function setState<Type = unknown>(name: string | undefined, value: Type) {
    switch (name) {
      case "flow":
        setFlow(value);
        break;
      case "appName":
        setAppName(value as string);
        break;
      case "scopes":
        setScopes(value as string[]);
        break;
      case "clientId":
        setClientId(value as string);
        break;
      case "clientSecret":
        setClientSecret(value as string);
        break;
      case "password":
        setPassword(value as string);
        break;
      case "passwordType":
        setPasswordType(value as string);
        break;
      case "username":
        setUsername(value as string);
        break;
    }
  }

  const authorize = () => {
    let { authActions, errActions, getConfigs, authSelectors, oas3Selectors } = props;
    let configs = getConfigs();
    let authConfigs = authSelectors.getConfigs();

    errActions.clear({ authId: schemaName, type: "auth", source: "auth" });

    oauth2Authorize({
      auth: {
        appName,
        name: schemaName,
        schema,
        scopes,
        clientId,
        clientSecret,
        username,
        password,
        passwordType
      },
      currentServer: oas3Selectors.serverEffectiveValue(oas3Selectors.selectedServer()),
      authActions,
      errActions,
      configs,
      authConfigs
    });
  };

  const close = (e: SyntheticEvent) => {
    e.preventDefault();
    let { authActions } = props;

    authActions.showDefinitions(false);
  };

  const logout = (e: SyntheticEvent) => {
    e.preventDefault();
    let { authActions, errActions } = props;

    errActions.clear({ authId: schemaName, type: "auth", source: "auth" });
    authActions.logoutWithPersistOption([schemaName]);
  };

  return {
    ...flowsProps,
    name: schemaName,
    flowsSchemes,
    appName,
    setAppName,
    schema,
    scopes,
    setScopes,
    scopesOptions,
    clientId,
    setClientId,
    clientSecret,
    setClientSecret,
    password,
    setPassword,
    passwordType,
    setPasswordType,
    username,
    setUsername,
    close,
    authorize,
    selectScopes,
    logout,
    setState,
    isAuthorized,
    isValid,
    errors
  };
}
