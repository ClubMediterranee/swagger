import { Map } from "immutable";
import { SyntheticEvent, useState } from "react";

import { oauth2Authorize } from "./oauth2-authorize.util";
import { useFlows, UseFlowsOptions } from "./use-flows.hook";
import { useScopes } from "./use-scopes.hook";
import { useAllowedFlows } from "./user-allowed-flows.hook";

export interface OAuth2Props extends UseFlowsOptions {
  authorized: Map<string, Map<string, any>>;
  schemaName: string;
}

export function useOAuth2(props: OAuth2Props) {
  let { authorized, authSelectors, errSelectors, schemaName, flows: flowsSchemes } = props;

  const allowedFlows = useAllowedFlows({ schemaName, authSelectors });
  const flowsProps = useFlows({ ...props, allowedFlows });

  const { authConfigs, setFlow, schema } = flowsProps;
  const auth = authorized && authorized.get(schemaName);
  const authorizedAuth = authSelectors.authorized().get(schemaName);
  const isAuthorized = !!authorizedAuth;
  const accessToken = isAuthorized && auth.get("token") && auth.get("token").get("access_token");
  const idToken = isAuthorized && auth.get("token") && auth.get("token").get("id_token");
  const errors = errSelectors.allErrors().filter((err) => err!.get("authId") === schemaName);
  const isValid = !errors.filter((err) => err!.get("source") === "validation").size;

  const { scopesOptions, scopes, setScopes, selectScopes } = useScopes({
    auth,
    schema,
    authConfigs,
    authSelectors,
    schemaName,
    allowedFlows,
    flow: flowsProps.flow
  });

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
    console.log(name, value);
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
      case "client_id":
        setClientId(value as string);
        break;
      case "client_secret":
        setClientSecret(value as string);
        break;
      case "password":
        setPassword(value as string);
        break;
      case "password_type":
        setPasswordType(value as string);
        break;
      case "username":
        setUsername(value as string);
        break;
    }
  }

  const authorize = () => {
    const { authActions, errActions, getConfigs, authSelectors, oas3Selectors } = props;
    const configs = getConfigs();
    const authConfigs = authSelectors.getConfigs();

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
    let { authActions, getConfigs, errActions } = props;

    errActions.clear({ authId: schemaName, type: "auth", source: "auth" });
    // authActions.logoutWithPersistOption([schemaName]);

    if (schema.get("endSessionUrl")) {
      const authConfigs = authSelectors.getConfigs();
      const redirectUrl = authConfigs.postLogoutRedirectUrl || authConfigs.redirectUrl || getConfigs().oauth2RedirectUrl;

      authActions.logoutPopup(schema.get("endSessionUrl"), {
        idToken,
        postLogoutRedirectUrl: redirectUrl,
        callback() {
          authActions.logoutWithPersistOption([schemaName]);
        }
      });
    }
  };

  function checkIsValid() {
    console.log(flowsProps.flow, clientId, clientSecret);
    switch (flowsProps.flow) {
      case "implicit":
      case "authorization_code":
        return clientId && scopes.length > 0;
      case "password":
        return clientId && scopes.length > 0 && username && password;
      case "client_credentials":
      case "application":
        return clientId && clientSecret && scopes.length > 0;
    }
  }

  return {
    ...flowsProps,
    accessToken,
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
    isValid: isValid ? checkIsValid() : false,
    errors
  };
}
