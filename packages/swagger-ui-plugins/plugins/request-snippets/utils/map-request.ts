import { Map } from "immutable";

const extractKey = (k: string) => {
  const hashIdx = "_**[]";
  if (k.indexOf(hashIdx) < 0) {
    return k;
  }
  return k.split(hashIdx)[0].trim();
};

function isMultipartFormDataRequest(request: Map<string, unknown>) {
  const headers = request.get("headers") as Map<string, string>;

  if (headers && headers.size) {
    return headers!.some((val, key) => {
      return /^content-type$/i.test(key!) && /^multipart\/form-data$/i.test(val!);
    });
  }

  return false;
}

function mapBody(request: Map<string, unknown>): string | undefined | any {
  const method = request.get("method") as string;
  let reqBody = request.get("body") as Map<string, unknown> | string | null;

  if (reqBody) {
    if (isMultipartFormDataRequest(request) && ["POST", "PUT", "PATCH"].includes(method)) {
      return 'throw new Error("Currently unsupported content-type: /^multipart\\/form-data$/i");';
    }

    if (typeof reqBody !== "string") {
      return reqBody.toJS();
    }
    return reqBody;
  }
}

function mapHeaders(request: Map<string, unknown>): Record<string, string> | undefined {
  const headers = request.get("headers") as Map<string, string>;

  if (headers && headers.size) {
    return headers.toJS();
  }
}

export function mapRequest(request: Map<string, unknown>) {
  const url = new URL(request.get("url") as string);

  return {
    url,
    headers: mapHeaders(request),
    body: mapBody(request),
    method: request.get("method") as string,
    protocol: url.protocol === "https:" ? "https" : "http"
  };
}
