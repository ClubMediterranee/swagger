import { List, Map } from "immutable";
import { describe, expect, it } from "vitest";

import { requestSnippetGenerator_node_axios } from "./node-axios";

describe("requestSnippetGenerator_node_axios", () => {
  it("generates axios request snippet correctly (payload object)", () => {
    const request = Map({
      url: "https://example.com/api/data?query=1",
      method: "GET",
      headers: Map({ "Content-Type": "application/json" }),
      body: Map({ key: "value" })
    });
    const snippet = requestSnippetGenerator_node_axios(request);
    expect(snippet).toMatchInlineSnapshot(`
      "import axios from "axios";
      try {
        const response = await axios({
          method: 'GET',
          url: 'https://example.com/api/data',
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            "key": "value"
          },
          params: {
            "query": "1"
          }
        })

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      "
    `);
  });
  it("generates axios request snippet correctly (payload string)", () => {
    const request = Map({
      url: "https://example.com/api/data",
      method: "GET",
      headers: Map({ "Content-Type": "text/html" }),
      body: "string html"
    });

    const snippet = requestSnippetGenerator_node_axios(request);
    expect(snippet).toMatchInlineSnapshot(`
      "import axios from "axios";
      try {
        const response = await axios({
          method: 'GET',
          url: 'https://example.com/api/data',
          headers: {
            "Content-Type": "text/html"
          },
          data: "string html"
        })

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      "
    `);
  });
  it("generates axios request snippet correctly (payload array)", () => {
    const request = Map({
      url: "https://example.com/api/data",
      method: "GET",
      headers: Map({ "Content-Type": "application/json" }),
      body: List(["key1", "key2"])
    });

    const snippet = requestSnippetGenerator_node_axios(request);
    expect(snippet).toMatchInlineSnapshot(`
      "import axios from "axios";
      try {
        const response = await axios({
          method: 'GET',
          url: 'https://example.com/api/data',
          headers: {
            "Content-Type": "application/json"
          },
          data: [
            "key1",
            "key2"
          ]
        })

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      "
    `);
  });
});
