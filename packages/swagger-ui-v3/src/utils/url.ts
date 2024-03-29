import { sanitizeUrl as braintreeSanitizeUrl } from "@braintree/sanitize-url";
// @ts-ignore
import cssEscape from "css.escape";

export function isAbsoluteUrl(url: string) {
  return url.match(/^(?:[a-z]+:)?\/\//i); // Matches http://, HTTP://, https://, ftp://, //example.com,
}

export function addProtocol(url: string) {
  if (!url.match(/^\/\//i)) return url; // Checks if protocol is missing e.g. //example.com

  return `${window.location.protocol}${url}`;
}

export function buildBaseUrl(selectedServer: string, specUrl: string) {
  if (!selectedServer) return specUrl;
  if (isAbsoluteUrl(selectedServer)) return addProtocol(selectedServer);

  return new URL(selectedServer, specUrl).href;
}

export function buildUrl(url: string, specUrl: string, { selectedServer = "" } = {}) {
  if (!url) return undefined;
  if (isAbsoluteUrl(url)) return url;

  const baseUrl = buildBaseUrl(selectedServer, specUrl);
  if (!isAbsoluteUrl(baseUrl)) {
    return new URL(url, window.location.href).href;
  }
  return new URL(url, baseUrl).href;
}

/**
 * Safe version of buildUrl function. `selectedServer` can contain server variables
 * which can fail the URL resolution.
 */
export function safeBuildUrl(url: string, specUrl: string, { selectedServer = "" } = {}) {
  try {
    return buildUrl(url, specUrl, { selectedServer });
  } catch {
    return undefined;
  }
}

export const createDeepLinkPath = (str: any) => (typeof str == "string" || str instanceof String ? str.trim().replace(/\s/g, "%20") : "");
export const escapeDeepLinkPath = (str: string) => cssEscape(createDeepLinkPath(str).replace(/%20/g, "_"));

export function sanitizeUrl(url: any) {
  if (typeof url !== "string" || url === "") {
    return "";
  }

  return braintreeSanitizeUrl(url);
}
