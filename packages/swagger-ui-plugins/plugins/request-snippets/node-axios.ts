import { Map } from "immutable";

import { indent } from "./utils/indent";
import { mapRequest } from "./utils/map-request";

export function requestSnippetGenerator_node_axios(request: Map<string, unknown>) {
  const { url, headers, body, method } = mapRequest(request);

  const bodyString = body ? JSON.stringify(body, null, 2) : "";
  const headersString = headers ? JSON.stringify(headers, null, 2) : "";
  const paramsString = url.searchParams.size ? JSON.stringify(Object.fromEntries(url.searchParams.entries()), null, 2) : "";

  const opts = indent(
    [
      `method: '${method}'`,
      `url: '${url.href.split("?")[0]}'`,
      headersString && `headers: ${headersString}`,
      bodyString && `data: ${bodyString}`,
      paramsString && `params: ${paramsString}`
    ]
      .filter(Boolean)
      .join(",\n")
  );

  return `import axios from "axios";
try {
  const response = await axios({
    ${opts}
  })

  console.log(response.data);
} catch (error) {
  console.error(error);
}
`;
}
