import { useFetch } from "@clubmed/ui/hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router";

import type { MigrationNote } from "../interfaces/migration-note";

export function useMigrationNote() {
  const params = useParams<{ id: string }>();
  const hooks = useFetch<MigrationNote>({ url: `https://www.dataviz.clubmed/rest/migration-notes/${params.id}` });

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
    html: hooks.data?.content || "",
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
