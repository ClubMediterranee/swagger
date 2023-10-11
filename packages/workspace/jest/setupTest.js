/* eslint-disable */
// polyfill request animation frames
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import registerRequireContextHook from "babel-plugin-require-context-hook/register";
import "jest-localstorage-mock";
import { flatten } from "lodash";
import * as util from "util";

registerRequireContextHook();

if (typeof window !== "undefined") {
  window.matchMedia = () => ({ matches: false });
  window.scrollTo = jest.fn();
}

// ref: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// ref: https://github.com/jsdom/jsdom/issues/2524
Object.defineProperty(window, 'TextEncoder', {
  writable: true,
  value: util.TextEncoder
})
Object.defineProperty(window, 'TextDecoder', {
  writable: true,
  value: util.TextDecoder
})

// polyfill flat
if (!Array.prototype.flat) {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Array.prototype, "flat", {
    value() {
      return flatten(this);
    }
  });
}
