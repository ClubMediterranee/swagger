import { open } from "../../../utils/open";

export function authPopup(url: string, swaggerUIRedirectOauth2: any) {
  (window as any)["swaggerUIRedirectOauth2"] = swaggerUIRedirectOauth2;

  return open(url, { target: "oidc" });
}

export function logoutPopup(
  url: string,
  opts: {
    callback: () => void;
    idToken?: string;
    postLogoutRedirectUrl?: string;
  }
) {
  const { idToken, postLogoutRedirectUrl, callback } = opts;
  (window as any)["swaggerUILogoutRedirectOauth2"] = () => {
    delete (window as any)["swaggerUILogoutRedirectOauth2"];
    callback();
  };

  const logoutUrl = new URL(url);

  idToken && logoutUrl.searchParams.set("id_token_hint", idToken);
  postLogoutRedirectUrl && logoutUrl.searchParams.set("post_logout_redirect_uri", postLogoutRedirectUrl);

  open(logoutUrl.toString(), { target: "oidc" });
}
