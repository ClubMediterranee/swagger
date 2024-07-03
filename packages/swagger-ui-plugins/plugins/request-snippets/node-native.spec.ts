import { List, Map } from "immutable";
import { describe, expect, it } from "vitest";

import { requestSnippetGenerator_node_native } from "./node-native";

describe("requestSnippetGenerator_node_native", () => {
  it("generates axios request snippet correctly (payload object)", () => {
    const request = Map({
      url: "https://example.com/api/data",
      method: "GET",
      headers: Map({ "Content-Type": "application/json" }),
      body: Map({ key: "value" })
    });

    const snippet = requestSnippetGenerator_node_native(request);
    expect(snippet).toMatchInlineSnapshot(`
      "const http = require("https");
      const options = {
        "method": "GET",
        "hostname": "example.com",
        "port": null,
        "path": "/api/data",
        "headers": {
          "Content-Type": "application/json"
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

      req.write(\`{"key":"value"}\`);
      req.end();"
    `);
  });
  it("generates axios request snippet correctly (payload string)", () => {
    const request = Map({
      url: "https://example.com/api/data",
      method: "GET",
      headers: Map({ "Content-Type": "text/html" }),
      body: "string html"
    });

    const snippet = requestSnippetGenerator_node_native(request);
    expect(snippet).toMatchInlineSnapshot(`
      "const http = require("https");
      const options = {
        "method": "GET",
        "hostname": "example.com",
        "port": null,
        "path": "/api/data",
        "headers": {
          "Content-Type": "text/html"
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

      req.write(\`"string html"\`);
      req.end();"
    `);
  });
  it("generates axios request snippet correctly (payload array)", () => {
    const request = Map({
      url: "https://example.com/api/data",
      method: "GET",
      headers: Map({ "Content-Type": "application/json" }),
      body: List(["key1", "key2"])
    });

    const snippet = requestSnippetGenerator_node_native(request);
    expect(snippet).toMatchInlineSnapshot(`
      "const http = require("https");
      const options = {
        "method": "GET",
        "hostname": "example.com",
        "port": null,
        "path": "/api/data",
        "headers": {
          "Content-Type": "application/json"
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

      req.write(\`["key1","key2"]\`);
      req.end();"
    `);
  });
});
