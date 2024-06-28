import { getTitle } from "./get-title";

describe("getTitle", () => {
  it.each([
    {
      env: "integx",
      type: "api",
      doc_url_v3: "https://api0.integ.clubmed.com/doc/v3",
      url: "https://api0.integ.clubmed.com",
      version: "0.3029.1",
      branch: "feat-8380-customer-profile.1",
      state: "OK",
      doc_url: "https://api0.integ.clubmed.com/doc",
      expected: "API - Integration 0"
    },
    {
      env: "production",
      type: "api",
      doc_url_v3: "https://api.clubmed.com/doc/v3",
      url: "https://api.clubmed.com",
      version: "0.3025.1",
      branch: "",
      state: "OK",
      doc_url: "https://api.clubmed.com/doc",
      expected: "API - Production"
    },
    {
      type: "go",
      url: "https://auth.integ.clubmed.com",
      version: "1.137.1",
      branch: "main",
      state: "OK",
      env: "integ",
      doc_url: "https://auth.integ.clubmed.com/doc",
      expected: "OIDC GO - Integration"
    }
  ])(`should return correct title from $type $url`, ({ expected, ...env }) => {
    expect(getTitle(env as never)).toEqual(expected);
  });
});
