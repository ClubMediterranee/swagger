import { useEffect, useState } from "react";

import { CachedContent, createProcessorFactory, getCached, isCached } from "../utils/html/processor";

export function useHtml({ source }: { source?: string | null | undefined }) {
  const [content, setContent] = useState<CachedContent | null>(() => (source && getCached(source)) || null);

  useEffect(() => {
    if (typeof source === "string" && !isCached(source)) {
      createProcessorFactory()
        .then((processor) => {
          return processor.process({ content: source });
        })
        .then(setContent)
        .catch((err) => {
          console.error(err);
        });
    }
  }, [source]);

  return {
    content: content?.content,
    data: content?.data,
    toc: content?.toc
  };
}
