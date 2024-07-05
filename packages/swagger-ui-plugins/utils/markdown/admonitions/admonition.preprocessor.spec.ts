import admonitionPreprocessor from "./admonition.preprocessor";

describe("admonition.preprocessor", () => {
  it("should preprocess content", () => {
    const result = admonitionPreprocessor(`
:::note Title
content
:::
    `);

    expect(result).toMatchInlineSnapshot(`
      "
      :::note[Title]
      content
      :::
          "
    `);
  });

  it("should preprocess content (with space)", () => {
    const result = admonitionPreprocessor(`
::: note Title
content
:::
    `);

    expect(result).toMatchInlineSnapshot(`
      "
      :::note[Title]
      content
      :::
          "
    `);
  });
  it("should preprocess content (with space without title)", () => {
    const result = admonitionPreprocessor(`
::: note
We have two states for breaking changes: \`deprecated\` and \`outdated\`. 

- The \`deprecated\` state means that the route will be removed in the future (6 months). Only critical bug fixes will be applied to the route.
- The \`removed\` state means that the route is consumed by one our consumers. So the route are not removed yet but will be removed when it's possible. In this case the route is not maintained anymore.
:::
    `);

    expect(result).toMatchInlineSnapshot(`
      "
      :::note
      We have two states for breaking changes: \`deprecated\` and \`outdated\`. 

      - The \`deprecated\` state means that the route will be removed in the future (6 months). Only critical bug fixes will be applied to the route.
      - The \`removed\` state means that the route is consumed by one our consumers. So the route are not removed yet but will be removed when it's possible. In this case the route is not maintained anymore.
      :::
          "
    `);
  });
});
