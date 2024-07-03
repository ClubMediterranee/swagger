import { Map } from "immutable";

import { indent } from "./utils/indent";
import { mapRequest } from "./utils/map-request";

export function requestSnippetGenerator_node_fetch(request: Map<string, unknown>) {
  const { url, headers, body, method } = mapRequest(request);

  const bodyString = body ? JSON.stringify(body, null, 2) : "";
  const headersString = headers ? JSON.stringify(headers, null, 2) : "";

  const opts = indent(
    [`method: '${method}'`, `url: '${url.href}'`, headersString && `headers: ${headersString}`, bodyString && `body: ${bodyString}`]
      .filter(Boolean)
      .join(",\n")
  );

  return `try {
  const response = await fetch({
    ${opts}
  })
  const data = await response.json();

  console.log(data);
} catch (error) {
  console.error(error);
}
`;
}
