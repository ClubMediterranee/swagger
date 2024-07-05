import admonitionPreprocessor from "./admonitions/admonition.preprocessor";

const PREPROCESSORS: ((content: string) => string)[] = [admonitionPreprocessor];

export function preprocessor(content: string) {
  return PREPROCESSORS.reduce((content, current) => current(content), content);
}
