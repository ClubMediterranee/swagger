import { useHtml } from "@clubmed/swagger-ui-plugins/hooks/use-html.hook";
import { useFetch } from "@clubmed/ui/hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router";

import type { MigrationNote } from "../interfaces/migration-note";

export function useMigrationNote() {
  const params = useParams<{ id: string }>();
  const hooks = useFetch<MigrationNote>({ url: `https://www.dataviz.clubmed/rest/migration-notes/${params.id}` });
  const { content, toc } = useHtml({ source: hooks.data?.content });

  useEffect(() => {
    if (params.id) {
      hooks.fetchData();
    }
  }, [params.id]);

  return {
    ...hooks,
    attributes: {
      title: hooks.data?.title || "",
      publishedAt: hooks.data?.published_at || ""
    },
    html: content || "",
    toc,
    breadcrumb: [
      {
        label: "Migration notes",
        href: "/migration-notes"
      },
      {
        label: hooks.data?.title || "",
        href: ""
      }
    ]
  };
}
