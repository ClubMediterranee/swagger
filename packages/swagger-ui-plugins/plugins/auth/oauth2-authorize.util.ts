import Im from "immutable";
// @ts-ignore
import randomBytes from "randombytes";
// @ts-ignore
import shaJs from "sha.js";

import { InitOAuthOptions } from "../../interfaces/System";

export interface OAuth2AuthorizeOptions {
  auth: any;
  authActions: any;
  errActions: any;
  configs: any;
  authConfigs: InitOAuthOptions;
  currentServer?: any;
}

function b64toB64UrlEncoded(str: string) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function generateCodeVerifier() {
  return b64toB64UrlEncoded(randomBytes(32).toString("base64"));
}

export function createCodeChallenge(codeVerifier: string) {
  return b64toB64UrlEncoded(shaJs("sha256").update(codeVerifier).digest("base64"));
}

export function oauth2Authorize({ auth, authActions, errActions, configs, authConfigs = {} }: OAuth2AuthorizeOptions) {
  const { schema, scopes, name, clientId } = auth;
  const flow = schema.get("flow");
  const authorizationUrl = schema.get("authorizationUrl");
  const url = new URL(authorizationUrl);
  const params = url.searchParams;

  switch (flow) {
    case "password":
      authActions.authorizePassword(auth);
      return;

    case "application":
      authActions.authorizeApplication(auth);
      return;

    case "accessCode":
      params.set("response_type", "code");
      break;

    case "implicit":
      params.set("response_type", "id_token token");
      break;

    case "clientCredentials":
    case "client_credentials":
      // OAS3
      authActions.authorizeApplication(auth);
      return;

    case "authorizationCode":
    case "authorization_code":
      // OAS3
      params.set("response_type", "code");
      break;
  }

  if (typeof clientId === "string") {
    params.set("client_id", clientId);
  }

  const redirectUrl = authConfigs.redirectUrl || configs.oauth2RedirectUrl;

  if (!redirectUrl) {
    errActions.newAuthErr({
      authId: name,
      source: "validation",
      level: "error",
      message: "oauth2RedirectUrl configuration is not passed. Oauth2 authorization cannot be performed."
    });
    return;
  }

  params.set("redirect_uri", redirectUrl);

  let scopesArray = [];

  if (Array.isArray(scopes)) {
    scopesArray = scopes;
  } else if (Im.List.isList(scopes)) {
    scopesArray = scopes.toArray();
  }

  if (scopesArray.length > 0) {
    const scopeSeparator = authConfigs.scopeSeparator || " ";

    params.set("scope", scopesArray.join(scopeSeparator));
  }

  const state = btoa(String(new Date().getTime()));

  params.set("state", state);

  if (typeof authConfigs.realm !== "undefined") {
    params.set("realm", authConfigs.realm);
  }

  if (
    (flow === "authorizationCode" || flow === "authorization_code" || flow === "accessCode") &&
    authConfigs.usePkceWithAuthorizationCodeGrant
  ) {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = createCodeChallenge(codeVerifier);

    params.set("code_challenge", codeChallenge);
    params.set("code_challenge_method", "S256");

    // storing the Code Verifier so it can be sent to the token endpoint
    // when exchanging the Authorization Code for an Access Token
    auth.codeVerifier = codeVerifier;
  }

  const { additionalQueryStringParams } = authConfigs;

  for (let key in additionalQueryStringParams) {
    if (typeof additionalQueryStringParams[key] !== "undefined") {
      params.set(key, additionalQueryStringParams[key]);
    }
  }

  // pass action authorizeOauth2 and authentication data through window
  // to authorize with oauth2

  let callback;
  if (flow === "implicit") {
    callback = authActions.preAuthorizeImplicit;
  } else if (authConfigs.useBasicAuthenticationWithAccessCodeGrant) {
    callback = authActions.authorizeAccessCodeWithBasicAuthentication;
  } else {
    callback = authActions.authorizeAccessCodeWithFormParams;
  }

  authActions.authPopup(url, {
    auth: auth,
    state: state,
    redirectUrl: redirectUrl,
    callback: callback,
    errCb: errActions.newAuthErr
  });
}
