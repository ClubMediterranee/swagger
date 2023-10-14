// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import {ResizeObserver} from "@juggle/resize-observer";
import "@testing-library/jest-dom";

import {Globals} from "@react-spring/web";
import {toHaveNoViolations} from "jest-axe";

expect.extend(toHaveNoViolations);

global.ResizeObserver = ResizeObserver;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

Object.defineProperty(window, "scrollTo", {value: jest.fn(), writable: true});

Globals.assign({
  skipAnimation: true
});


class LocalStorageMock {
  store: any;
  length: number;

  constructor() {
    this.store = {};
    this.length = 0;
  }

  clear() {
    this.store = {};
    this.length = 0;
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  key(key: number) {
    return Object.keys(this.store)[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value.toString();
    this.length = Object.keys(this.store).length;
  }

  removeItem(key: string) {
    delete this.store[key];
    this.length = Object.keys(this.store).length;
  }
}

Object.defineProperty(window, "localStorage", {value: new LocalStorageMock(), writable: true});
