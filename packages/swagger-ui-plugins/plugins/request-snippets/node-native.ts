import { Map } from "immutable";

import { indent } from "./utils/indent";
import { mapRequest } from "./utils/map-request";

export function requestSnippetGenerator_node_native(request: Map<string, unknown>) {
  const { url, headers, body, protocol, method } = mapRequest(request);

  const stringHeaders = headers ? indent(JSON.stringify(headers, null, 2), "  ") : "";
  const stringBody = body ? "`" + JSON.stringify(body).replace(/\\n/g, "\n").replace(/`/g, "\\`") + "`" : "";

  return `const http = require("${protocol}");
const options = {
  "method": "${method}",
  "hostname": "${url.host}",
  "port": ${url.port || "null"},
  "path": "${url.pathname}"${
    stringHeaders
      ? `,
  "headers": ${stringHeaders}`
      : ""
  }
};
const req = http.request(options, function (res) {
  const chunks = [];
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });
  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});
${stringBody ? `\nreq.write(${stringBody});` : ""}
req.end();`;
}
