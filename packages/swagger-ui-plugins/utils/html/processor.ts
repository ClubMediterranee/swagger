import type { TocEntry } from "@stefanprobst/rehype-extract-toc";

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
  const { default: rehypeParse } = await import("rehype-parse");
  const { default: stringify } = await import("rehype-stringify");
  const { default: rehypeSlug } = await import("rehype-slug");
  const { default: rehypeToc } = await import("@stefanprobst/rehype-extract-toc");

  const processor = unified().use(rehypeParse).use(rehypeSlug).use(rehypeToc).use(stringify);

  return {
    process: async ({ content }: ProcessOpts) => {
      return processor.process(content).then((result) => {
        return {
          content: result.toString(),
          data: result.data,
          toc: result.data.toc
        };
      });
    }
  };
}
