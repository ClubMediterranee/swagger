import { List, Map } from "immutable";
import { describe, expect, it } from "vitest";

import { requestSnippetGenerator_node_fetch } from "./fetch";

describe("requestSnippetGenerator_node_fetch", () => {
  it("generates fetch request snippet correctly (payload object)", () => {
    const request = Map({
      url: "https://example.com/api/data?query=1",
      method: "GET",
      headers: Map({ "Content-Type": "application/json" }),
      body: Map({ key: "value" })
    });
    const snippet = requestSnippetGenerator_node_fetch(request);
    expect(snippet).toMatchInlineSnapshot(`
      "try {
        const response = await fetch({
          method: 'GET',
          url: 'https://example.com/api/data?query=1',
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            "key": "value"
          }
        })
        const data = await response.json();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
      "
    `);
  });
  it("generates fetch request snippet correctly (payload string)", () => {
    const request = Map({
      url: "https://example.com/api/data",
      method: "GET",
      headers: Map({ "Content-Type": "text/html" }),
      body: "string html"
    });

    const snippet = requestSnippetGenerator_node_fetch(request);
    expect(snippet).toMatchInlineSnapshot(`
      "try {
        const response = await fetch({
          method: 'GET',
          url: 'https://example.com/api/data',
          headers: {
            "Content-Type": "text/html"
          },
          body: "string html"
        })
        const data = await response.json();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
      "
    `);
  });
  it("generates fetch request snippet correctly (payload array)", () => {
    const request = Map({
      url: "https://example.com/api/data",
      method: "GET",
      headers: Map({ "Content-Type": "application/json" }),
      body: List(["key1", "key2"])
    });

    const snippet = requestSnippetGenerator_node_fetch(request);
    expect(snippet).toMatchInlineSnapshot(`
      "try {
        const response = await fetch({
          method: 'GET',
          url: 'https://example.com/api/data',
          headers: {
            "Content-Type": "application/json"
          },
          body: [
            "key1",
            "key2"
          ]
        })
        const data = await response.json();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
      "
    `);
  });
});
