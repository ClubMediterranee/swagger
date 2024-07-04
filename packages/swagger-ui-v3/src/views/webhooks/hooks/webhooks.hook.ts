import { useFetch } from "@clubmed/ui/hooks/useFetch";
import { useEffect, useMemo } from "react";

import * as webhooks from "../../../../docs/webhooks.md";

export interface WebhookEvent {
  event: "string";
  description: "string";
  notes: "string";
}

export function useWebhooks() {
  const hooks = useFetch<WebhookEvent[]>({ url: "https://www.dataviz.clubmed/rest/api-webhooks/events?env=production" });

  const toc = useMemo(() => {
    return [
      ...webhooks.toc,
      { level: "2", content: "Events" },
      ...((hooks.data || []).map((event: WebhookEvent) => {
        return { level: "3", content: event.event };
      }) || []),
      { level: "2", content: "Routes" }
    ];
  }, [hooks.data]);

  useEffect(() => {
    hooks.fetchData();
  }, []);

  return {
    ...webhooks,
    ...hooks,
    toc
  };
}
