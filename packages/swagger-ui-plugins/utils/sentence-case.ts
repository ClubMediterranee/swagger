import startCase from "lodash/startCase";
export function sentenceCase(str: string) {
  return startCase(str.toLowerCase());
}
