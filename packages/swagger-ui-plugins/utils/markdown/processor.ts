import type { TocEntry } from "@stefanprobst/rehype-extract-toc";

import { preprocessor } from "./preprocessor";

export type CachedContent = {
  content: string;
  data: any;
  toc: TocEntry[] | undefined;
};
export type ProcessOpts = {
  content: string;
  filePath?: string;
  frontMatter?: any;
  compilerName?: string;
};

const cache = new Map<string, CachedContent>();

export function isCached(source: string) {
  return cache.has(source);
}

export function getCached(source: string) {
  return cache.get(source);
}

export async function createProcessorFactory() {
  const { unified } = await import("unified");
  const { default: remarkParse } = await import("remark-parse");
  const { default: remarkStringify } = await import("remark-stringify");
  const { default: directive } = await import("remark-directive");
  const { default: stringify } = await import("rehype-stringify");
  const { default: gfm } = await import("remark-gfm");
  const { default: remarkRehype } = await import("remark-rehype");
  const { default: rehypeSlug } = await import("rehype-slug");
  const { default: highlight } = await import("rehype-highlight");
  const { default: admonitions } = await import("./admonitions/index");
  const { default: rehypeToc } = await import("@stefanprobst/rehype-extract-toc");

  const processor = unified()
    .use(remarkParse)
    .use(gfm)
    .use(directive)
    .use(admonitions)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeToc)
    .use(highlight)
    .use(stringify);

  return {
    process: async ({ content }: ProcessOpts) => {
      return processor.process(preprocessor(content)).then((result) => {
        return {
          content: result.toString().replace(/(&#x3C;)/gi, "<"),
          data: result.data,
          toc: result.data.toc
        };
      });
    }
  };
}
