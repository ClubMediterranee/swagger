import { KEYWORDS } from "./constants";

export default function admonitionPreprocessor(content: string): string {
  // this will also process ":::note Title" inside docs code blocks
  // good enough: we fixed older versions docs to not be affected

  const directiveNameGroup = `(${KEYWORDS.join("|")})`;
  const regexp = new RegExp(`^(?<quote>(> ?)*)(?<indentation>( +|\t+))?(?<directive>:{3,} ?${directiveNameGroup}) +(?<title>.*)$`, "gm");

  return content
    .replaceAll(regexp, (substring, ...args: any[]) => {
      const groups = args.at(-1);

      return `${groups.quote ?? ""}${groups.indentation ?? ""}${groups.directive}[${groups.title}]`;
    })
    .replace("::: ", ":::");
}
