import { useMarkdown } from "@clubmed/swagger-ui-plugins/hooks/use-markdown.hook";
import { useFetch } from "@clubmed/ui/hooks/useFetch";
import { TocEntry } from "@stefanprobst/rehype-extract-toc";
import { useEffect, useMemo } from "react";

import * as webhooks from "../../../../../docs/webhooks.md";

export interface WebhookEvent {
  event: "string";
  description: "string";
  notes: "string";
}

export function useWebhooks() {
  const hooks = useFetch<WebhookEvent[]>({ url: "https://www.dataviz.clubmed/rest/api-webhooks/events?env=production" });
  const { content, toc: initialToc } = useMarkdown({ source: webhooks.markdown });

  const toc = useMemo(() => {
    return [
      ...(initialToc || []),
      { depth: 2, id: "events", value: "Events" },
      ...((hooks.data || []).map((event: WebhookEvent) => {
        return { level: "3", content: event.event };
      }) || []),
      { depth: 2, id: "routes", value: "Routes" }
    ];
  }, [hooks.data]);

  useEffect(() => {
    hooks.fetchData();
  }, []);

  return {
    attributes: webhooks.attributes,
    html: content,
    ...hooks,
    toc: toc as TocEntry[]
  };
}
